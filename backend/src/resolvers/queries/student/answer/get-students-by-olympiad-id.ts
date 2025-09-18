import { ClassTypeModel, StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const getStudentsByOlympiadId = async (_: any, { olympiadId }: any) => {
  try {
    // Find ClassTypes for this olympiad
    const classTypes = await ClassTypeModel.find({ olympiadId });
    const classTypeIds = classTypes.map((ct) => ct._id);

    if (classTypeIds.length === 0) {
      return [];
    }

    // Find StudentAnswers for these ClassTypes
    const studentAnswers = await StudentAnswerModel.find({
      classTypeId: { $in: classTypeIds },
    });

    return studentAnswers.map((studentAnswer) => {
      const transformed = transformDocument(studentAnswer);

      // Transform answers array
      if (transformed.answers) {
        transformed.answers = transformed.answers.map((answer: any) => ({
          questionId: answer.questionId?.toString() || answer.questionId,
          score: answer.score,
          description: answer.description,
        }));
      }

      return transformed;
    });
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
