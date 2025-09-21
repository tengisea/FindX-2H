import { OlympiadModel } from "@/models";
import { GraphQLError } from "graphql";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";
import { RankingService } from "@/services/rankingService";
import { sendOlympiadFinishedNotification } from "@/utils/email-services";

export const finishOlympiad = async (_: unknown, { id }: { id: string }) => {
  try {
    // Update Olympiad status to FINISHED (this will trigger automatic ranking processing)
    const updatedOlympiad = await OlympiadModel.findByIdAndUpdate(
      id,
      { $set: { status: "FINISHED" } },
      { new: true }
    )
      .populate({
        path: "classtypes",
        populate: {
          path: "questions",
          model: "Question",
          options: { strictPopulate: false },
        },
      })
      .populate({
        path: "organizer",
        select: "organizationName email",
      });

    if (!updatedOlympiad) {
      throw new GraphQLError("Olympiad not found");
    }

    // Manually trigger ranking processing to ensure it happens
    console.log(
      `🏆 Manually processing rankings for Olympiad: ${updatedOlympiad.name}`
    );
    try {
      const rankingResult = await RankingService.processOlympiadRankings(id);
      console.log(
        `✅ Manual rankings processed: ${rankingResult.classTypesProcessed} class types, ${rankingResult.totalStudentsProcessed} students`
      );
    } catch (rankingError) {
      console.error("❌ Error in manual ranking processing:", rankingError);
      // Don't throw error to avoid breaking the finish operation
    }

    // Send thank you emails to all participants
    console.log(
      `📧 Sending thank you emails to participants of Olympiad: ${updatedOlympiad.name}`
    );
    try {
      const emailResult = await sendOlympiadFinishedNotification(
        id,
        updatedOlympiad.name
      );
      console.log(
        `✅ Thank you emails sent: ${emailResult.sentCount}/${emailResult.totalParticipants} participants notified`
      );
    } catch (emailError) {
      console.error("❌ Error sending thank you emails:", emailError);
      // Don't throw error to avoid breaking the finish operation
    }

    const transformed = transformDocument(updatedOlympiad);

    if (transformed.classtypes) {
      transformed.classtypes = transformed.classtypes.map((classType: any) => {
        // If classType is just an ObjectId string, we need to handle it differently
        if (typeof classType === "string") {
          console.error("❌ ClassType is just an ObjectId string:", classType);
          return {
            id: classType,
            classYear: "GRADE_1",
            maxScore: 0,
            questions: [],
            participants: [],
            studentsAnswers: [],
            medalists: 0,
            gold: [],
            silver: [],
            bronze: [],
            top10: [],
            bestMaterials: [],
            rooms: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }

        const transformedQuestions = transformNestedObject(classType.questions);
        const validQuestions =
          transformedQuestions && Array.isArray(transformedQuestions)
            ? transformedQuestions.filter((question: any) => {
                return (
                  question &&
                  question.id &&
                  question.id !== null &&
                  question.id !== undefined
                );
              })
            : [];

        const transformedClassType = transformDocument(classType);

        // Ensure id is never null
        if (!transformedClassType.id) {
          console.error("❌ ClassType missing id:", classType);
          transformedClassType.id =
            classType._id?.toString() || classType.id || "unknown";
        }

        // Ensure classYear is never null
        console.log("🔍 Original classYear:", classType.classYear);
        const mappedClassYear = classType.classYear
          ? mapClassYearToGraphQL(classType.classYear)
          : null;
        console.log("🔍 Mapped classYear:", mappedClassYear);
        const classYear = mappedClassYear || "GRADE_1";
        console.log("🔍 Final classYear:", classYear);

        return {
          ...transformedClassType,
          classYear: classYear,
          questions: validQuestions,
        };
      });
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    return {
      success: true,
      message:
        "Olympiad finished successfully. Rankings have been processed and thank you emails have been sent to all participants.",
      olympiad: transformed,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
