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
import { MedalCalculator } from "@/utils/medalCalculator";
import { RankingError, RANKING_ERROR_CODES } from "@/types/ranking.types";
import {
  createGraphQLError,
  ErrorCodes,
  handleAsyncError,
} from "@/utils/errorHandler";

export const previewMedals = async (_: unknown, { id }: { id: string }) => {
  return await handleAsyncError(async () => {
    console.log(`🔍 Previewing medals for Olympiad: ${id}`);

    // Get the olympiad with populated data
    const olympiad = await OlympiadModel.findById(id)
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

    if (!olympiad) {
      throw createGraphQLError("Olympiad not found", ErrorCodes.NOT_FOUND);
    }

    if (olympiad.status !== "CLOSED") {
      throw createGraphQLError(
        "Olympiad must be CLOSED before previewing medals",
        ErrorCodes.BAD_REQUEST
      );
    }

    // Update status to MEDALS_PREVIEW
    await OlympiadModel.findByIdAndUpdate(id, {
      $set: { status: "MEDALS_PREVIEW" },
    });

    // Process rankings for each class type to get medal assignments
    const medalPreviews = [];

    for (const classType of olympiad.classtypes) {
      if (!classType) continue;

      // Type assertion for populated classType
      const populatedClassType = classType as any;

      // Get student answers sorted by score
      const studentAnswers = await StudentAnswerModel.find({
        classTypeId: populatedClassType._id.toString(),
      })
        .populate("studentId", "name email")
        .sort({ totalScoreofOlympiad: -1 });

      if (studentAnswers.length === 0) {
        medalPreviews.push({
          classTypeId: populatedClassType._id.toString(),
          classYear: mapClassYearToGraphQL(populatedClassType.classYear),
          gold: [],
          silver: [],
          bronze: [],
          top10: [],
          totalParticipants: 0,
          medalists: populatedClassType.medalists,
        });
        continue;
      }

      // Calculate medal distribution using the centralized MedalCalculator
      const medalDistribution = MedalCalculator.calculateMedalDistribution(
        studentAnswers.length,
        populatedClassType.medalists
      );

      const { goldCount, silverCount, bronzeCount, top10Count } =
        medalDistribution;

      // Create medal preview data
      const gold: any[] = [];
      const silver: any[] = [];
      const bronze: any[] = [];
      const top10: any[] = [];

      studentAnswers.forEach((answer, index) => {
        const studentId = (answer.studentId as any)?._id || answer.studentId;
        const studentName = (answer.studentId as any)?.name || "Unknown";
        const score = answer.totalScoreofOlympiad || 0;

        const studentInfo = {
          studentId: studentId.toString(),
          studentName,
          score,
          rank: index + 1,
        };

        // Add to top10 if applicable
        if (index < top10Count) {
          top10.push(studentInfo);
        }

        // Assign medals based on position
        if (index < goldCount) {
          gold.push(studentInfo);
        } else if (index < goldCount + silverCount) {
          silver.push(studentInfo);
        } else if (index < goldCount + silverCount + bronzeCount) {
          bronze.push(studentInfo);
        }
      });

      medalPreviews.push({
        classTypeId: populatedClassType._id.toString(),
        classYear: mapClassYearToGraphQL(populatedClassType.classYear),
        gold,
        silver,
        bronze,
        top10,
        totalParticipants: studentAnswers.length,
        medalists: populatedClassType.medalists,
      });
    }

    // Get the updated olympiad with MEDALS_PREVIEW status
    const updatedOlympiad = await OlympiadModel.findById(id)
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
        "Failed to retrieve updated olympiad",
        ErrorCodes.INTERNAL_ERROR
      );
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

    console.log(`✅ Medal preview generated for Olympiad: ${olympiad.name}`);

    return {
      success: true,
      message:
        "Medal preview generated successfully. You can now review and edit medal assignments before finalizing.",
      olympiad: transformed,
      medalPreviews,
    };
  }, "Failed to preview medals");
};
