import { QuestionModel, ClassTypeModel } from "@/models";
import { GraphQLError } from "graphql";

export const deleteQuestion = async (_: unknown, { id }: { id: string }) => {
  try {
    const questionToDelete = await QuestionModel.findById(id);
    if (!questionToDelete) {
      throw new GraphQLError("Question not found");
    }

    // Remove question from any ClassTypes that reference it
    await ClassTypeModel.updateMany(
      { questions: id },
      { $pull: { questions: id } }
    );

    const deletedQuestion = await QuestionModel.findByIdAndDelete(id);

    if (!deletedQuestion) {
      throw new GraphQLError("Failed to delete question");
    }

    console.log(`✅ Question deleted: ${id}`);
    return true;
  } catch (error: any) {
    console.error("❌ Delete question error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(error.message || "Failed to delete question");
  }
};
