import { QuestionModel } from "@/models";
import { GraphQLError } from "graphql";

export const question = async (_: unknown, { id }: { id: string }) => {
  try {
    const question = await QuestionModel.findById(id);
    if (!question) {
      throw new GraphQLError("Question not found");
    }

    return {
      id: question._id.toString(),
      questionName: question.questionName,
      maxScore: question.maxScore,
      classTypeId: question.classTypeId?.toString() || null,
    };
  } catch (error: any) {
    console.error("❌ Get question error:", error);
    throw new GraphQLError(error.message || "Failed to get question");
  }
};
