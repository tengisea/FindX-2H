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

export const finishOlympiad = async (_: unknown, { id }: { id: string }) => {
  return await handleAsyncError(async () => {
    console.log(`🔍 Finishing Olympiad and generating medal preview: ${id}`);

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
        "Olympiad must be CLOSED before finishing",
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

        // Assign medals based on position (students can have multiple medal types)
        if (index < goldCount) {
          gold.push(studentInfo);
        }
        if (index >= goldCount && index < goldCount + silverCount) {
          silver.push(studentInfo);
        }
        if (index >= goldCount + silverCount && index < goldCount + silverCount + bronzeCount) {
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

      // Auto-apply the initial medal assignments to the classType
      const goldStudentIds = gold.map((g) => g.studentId);
      const silverStudentIds = silver.map((s) => s.studentId);
      const bronzeStudentIds = bronze.map((b) => b.studentId);
      const top10StudentIds = top10.map((t) => t.studentId);

      await ClassTypeModel.findByIdAndUpdate(populatedClassType._id, {
        gold: goldStudentIds,
        silver: silverStudentIds,
        bronze: bronzeStudentIds,
        top10: top10StudentIds,
      });

      console.log(
        `✅ Auto-applied initial medals for ClassType ${populatedClassType._id}: Gold(${goldStudentIds.length}), Silver(${silverStudentIds.length}), Bronze(${bronzeStudentIds.length}), Top10(${top10StudentIds.length})`
      );
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

    console.log(
      `✅ Medal preview generated for Olympiad: ${updatedOlympiad.name}`
    );

    return {
      success: true,
      message:
        "Olympiad finished successfully. Medal preview generated. You can now review and edit medal assignments before finalizing.",
      olympiad: transformed,
      medalPreviews,
    };
  }, "Failed to finish olympiad and generate medal preview");
};
