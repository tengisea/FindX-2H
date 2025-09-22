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
import {
  createGraphQLError,
  ErrorCodes,
  handleAsyncError,
} from "@/utils/errorHandler";

export const updateMedalAssignments = async (
  _: unknown,
  {
    olympiadId,
    assignments,
  }: {
    olympiadId: string;
    assignments: Array<{
      classTypeId: string;
      gold: string[];
      silver: string[];
      bronze: string[];
    }>;
  }
) => {
  return await handleAsyncError(async () => {
    console.log(`🔍 Updating medal assignments for Olympiad: ${olympiadId}`);

    // Verify olympiad exists and is in MEDALS_PREVIEW status
    const olympiad = await OlympiadModel.findById(olympiadId);
    if (!olympiad) {
      throw createGraphQLError("Olympiad not found", ErrorCodes.NOT_FOUND);
    }

    if (olympiad.status !== "MEDALS_PREVIEW") {
      throw createGraphQLError(
        "Olympiad must be in MEDALS_PREVIEW status to update medal assignments",
        ErrorCodes.BAD_REQUEST
      );
    }

    // Update medal assignments for each class type
    for (const assignment of assignments) {
      const { classTypeId, gold, silver, bronze } = assignment;

      // Verify class type belongs to this olympiad
      const classType = await ClassTypeModel.findById(classTypeId);
      if (!classType || classType.olympiadId.toString() !== olympiadId) {
        throw createGraphQLError(
          `ClassType ${classTypeId} not found or doesn't belong to this olympiad`,
          ErrorCodes.NOT_FOUND
        );
      }

      // Validate that all student IDs exist and have submitted answers
      const allStudentIds = [...gold, ...silver, ...bronze];
      const studentAnswers = await StudentAnswerModel.find({
        classTypeId,
        studentId: { $in: allStudentIds },
      });

      if (studentAnswers.length !== allStudentIds.length) {
        throw createGraphQLError(
          "Some student IDs are invalid or haven't submitted answers",
          ErrorCodes.BAD_REQUEST
        );
      }

      // Update the class type with new medal assignments
      await ClassTypeModel.findByIdAndUpdate(classTypeId, {
        gold,
        silver,
        bronze,
      });

      console.log(
        `✅ Updated medals for ClassType ${classTypeId}: Gold(${gold.length}), Silver(${silver.length}), Bronze(${bronze.length})`
      );
    }

    // Get updated olympiad with populated data
    const updatedOlympiad = await OlympiadModel.findById(olympiadId)
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

    // Generate updated medal previews
    const medalPreviews = [];

    for (const classType of updatedOlympiad.classtypes) {
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

      // Get the updated medal assignments
      const goldStudentIds = populatedClassType.gold || [];
      const silverStudentIds = populatedClassType.silver || [];
      const bronzeStudentIds = populatedClassType.bronze || [];

      // Create student info objects for each medal category
      const createStudentInfo = (studentId: string, rank: number) => {
        const answer = studentAnswers.find(
          (a) =>
            ((a.studentId as any)?._id || a.studentId).toString() === studentId
        );
        if (!answer) return null;

        const studentName = (answer.studentId as any)?.name || "Unknown";
        const score = answer.totalScoreofOlympiad || 0;

        return {
          studentId,
          studentName,
          score,
          rank,
        };
      };

      const gold = goldStudentIds
        .map((id: any, index: number) =>
          createStudentInfo(id.toString(), index + 1)
        )
        .filter(Boolean);
      const silver = silverStudentIds
        .map((id: any, index: number) =>
          createStudentInfo(id.toString(), gold.length + index + 1)
        )
        .filter(Boolean);
      const bronze = bronzeStudentIds
        .map((id: any, index: number) =>
          createStudentInfo(
            id.toString(),
            gold.length + silver.length + index + 1
          )
        )
        .filter(Boolean);

      // Create top10 list (first 10 students by score)
      const top10 = studentAnswers.slice(0, 10).map((answer, index) => {
        const studentId = (
          (answer.studentId as any)?._id || answer.studentId
        ).toString();
        const studentName = (answer.studentId as any)?.name || "Unknown";
        const score = answer.totalScoreofOlympiad || 0;

        return {
          studentId,
          studentName,
          score,
          rank: index + 1,
        };
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
      `✅ Medal assignments updated for Olympiad: ${updatedOlympiad.name}`
    );

    return {
      success: true,
      message:
        "Medal assignments updated successfully. You can continue editing or finalize the medals.",
      olympiad: transformed,
      medalPreviews,
    };
  }, "Failed to update medal assignments");
};
