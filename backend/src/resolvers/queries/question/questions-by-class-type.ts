import { QuestionModel } from "@/models";
import { GraphQLError } from "graphql";

export const questionsByClassType = async (
  _: unknown,
  { classTypeId }: { classTypeId: string }
) => {
  try {
    const questions = await QuestionModel.find({ classTypeId });

    return questions.map((question) => ({
      id: question._id.toString(),
      questionName: question.questionName,
      maxScore: question.maxScore,
      classTypeId: question.classTypeId?.toString() || null,
    }));
  } catch (error: any) {
    console.error("❌ Get questions by class type error:", error);
    throw new GraphQLError(
      error.message || "Failed to get questions by class type"
    );
  }
};
