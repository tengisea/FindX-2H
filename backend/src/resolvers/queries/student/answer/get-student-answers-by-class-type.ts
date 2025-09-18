import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const studentAnswersByClassType = async (
  _: any,
  { classTypeId }: any
) => {
  try {
    const studentAnswers = await StudentAnswerModel.find({
      classTypeId,
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
