import { QuestionModel } from "@/models";
import { GraphQLError } from "graphql";

export const updateQuestion = async (
  _: unknown,
  {
    id,
    input,
  }: {
    id: string;
    input: { questionName: string; maxScore: number };
  }
) => {
  const { questionName, maxScore } = input;

  try {
    // Input validation
    if (!questionName || questionName.trim() === "") {
      throw new GraphQLError("Question name is required");
    }
    if (maxScore <= 0) {
      throw new GraphQLError("Max score must be greater than 0");
    }

    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      id,
      { questionName, maxScore },
      { new: true }
    );

    if (!updatedQuestion) {
      throw new GraphQLError("Question not found");
    }

    console.log(`✅ Question updated: ${id}`);
    return {
      id: updatedQuestion._id.toString(),
      questionName: updatedQuestion.questionName,
      maxScore: updatedQuestion.maxScore,
      classTypeId: updatedQuestion.classTypeId?.toString() || null,
    };
  } catch (error: any) {
    console.error("❌ Update question error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(error.message || "Failed to update question");
  }
};
