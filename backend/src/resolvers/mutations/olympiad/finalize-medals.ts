import {
  OlympiadModel,
  ClassTypeModel,
  StudentAnswerModel,
  StudentModel,
} from "@/models";
import { GraphQLError } from "graphql";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";
import { sendOlympiadFinishedNotification } from "@/utils/email-services";
import {
  createGraphQLError,
  ErrorCodes,
  handleAsyncError,
} from "@/utils/errorHandler";

export const finalizeMedals = async (_: unknown, { id }: { id: string }) => {
  return await handleAsyncError(async () => {
    console.log(`🏆 Finalizing medals for Olympiad: ${id}`);

    // Get the olympiad
    const olympiad = await OlympiadModel.findById(id);
    if (!olympiad) {
      throw createGraphQLError("Olympiad not found", ErrorCodes.NOT_FOUND);
    }

    if (olympiad.status !== "MEDALS_PREVIEW") {
      throw createGraphQLError(
        "Olympiad must be in MEDALS_PREVIEW status to finalize medals",
        ErrorCodes.BAD_REQUEST
      );
    }

    // Update status to FINISHED
    const updatedOlympiad = await OlympiadModel.findByIdAndUpdate(
      id,
      { $set: { status: "FINISHED" } },
      { new: true }
    )
      .populate({
        path: "classtypes",
        populate: [
          {
            path: "questions",
            model: "Question",
          },
          {
            path: "rooms",
            model: "ClassRoom",
          },
        ],
      })
      .populate({
        path: "organizer",
        select: "organizationName email logo",
      });

    if (!updatedOlympiad) {
      throw createGraphQLError(
        "Failed to update olympiad status",
        ErrorCodes.INTERNAL_ERROR
      );
    }

    // Update student rankings based on final medal assignments
    let totalEmailsSent = 0;

    for (const classType of updatedOlympiad.classtypes) {
      if (!classType) continue;

      // Type assertion for populated classType
      const populatedClassType = classType as any;

      // Get all student answers for this class type
      const studentAnswers = await StudentAnswerModel.find({
        classTypeId: populatedClassType._id.toString(),
      }).populate("studentId", "name email");

      // Update student rankings based on medal assignments
      const goldStudentIds = populatedClassType.gold || [];
      const silverStudentIds = populatedClassType.silver || [];
      const bronzeStudentIds = populatedClassType.bronze || [];
      const top10StudentIds = populatedClassType.top10 || [];

      // Update medal assignments for each student
      for (const answer of studentAnswers) {
        const studentId = (
          (answer.studentId as any)?._id || answer.studentId
        ).toString();

        // Update student's medal arrays based on their performance
        // Students can have multiple medal types (e.g., gold medalist is also in top10)
        const medalUpdates: any = {};
        
        if (goldStudentIds.some((id: any) => id.toString() === studentId)) {
          medalUpdates.gold = id;
          console.log(
            `✅ Added gold medal for student ${studentId} in olympiad ${id}`
          );
        }
        
        if (silverStudentIds.some((id: any) => id.toString() === studentId)) {
          medalUpdates.silver = id;
          console.log(
            `✅ Added silver medal for student ${studentId} in olympiad ${id}`
          );
        }
        
        if (bronzeStudentIds.some((id: any) => id.toString() === studentId)) {
          medalUpdates.bronze = id;
          console.log(
            `✅ Added bronze medal for student ${studentId} in olympiad ${id}`
          );
        }
        
        if (top10StudentIds.some((id: any) => id.toString() === studentId)) {
          medalUpdates.top10 = id;
          console.log(
            `✅ Added top10 for student ${studentId} in olympiad ${id}`
          );
        }

        // Apply all medal updates at once
        if (Object.keys(medalUpdates).length > 0) {
          await StudentModel.findByIdAndUpdate(studentId, {
            $addToSet: medalUpdates,
          });
        }

        // Always add to participatedOlympiads
        await StudentModel.findByIdAndUpdate(studentId, {
          $addToSet: { participatedOlympiads: id },
        });
      }
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
      totalEmailsSent = emailResult.sentCount;
      console.log(
        `✅ Thank you emails sent: ${emailResult.sentCount}/${emailResult.totalParticipants} participants notified`
      );
    } catch (emailError) {
      console.error("❌ Error sending thank you emails:", emailError);
      // Don't throw error to avoid breaking the finalization
    }

    // Transform the olympiad data
    const transformed = transformDocument(updatedOlympiad);

    // Handle ClassTypes manually since transformDocument is not working properly for populated objects
    if (updatedOlympiad.classtypes) {
      transformed.classtypes = updatedOlympiad.classtypes.map(
        (classType: any) => {
          const classTypeId = classType._id?.toString() || classType.id;
          return {
            id: classTypeId,
            classYear: mapClassYearToGraphQL(classType.classYear),
            maxScore: classType.maxScore,
            occurringTime: classType.occurringTime,
            rooms: transformNestedObject(classType.rooms),
            questions: classType.questions
              ? classType.questions.map((question: any) => {
                  const questionId = question._id?.toString() || question.id;
                  return {
                    id: questionId,
                    classTypeId: classTypeId,
                    questionName: question.questionName,
                    maxScore: question.maxScore,
                  };
                })
              : [],
            medalists: classType.medalists,
            participants: classType.participants || [],
            studentsAnswers: classType.studentsAnswers || [],
            olympiadId:
              classType.olympiadId?.toString() || classType.olympiadId,
            bestMaterials: classType.bestMaterials || [],
            gold: classType.gold || [],
            silver: classType.silver || [],
            bronze: classType.bronze || [],
            top10: classType.top10 || [],
          };
        }
      );
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    console.log(`✅ Medals finalized for Olympiad: ${updatedOlympiad.name}`);

    return {
      success: true,
      message:
        "Medals have been finalized successfully. Thank you emails have been sent to all participants.",
      olympiad: transformed,
      emailsSent: totalEmailsSent,
    };
  }, "Failed to finalize medals");
};
