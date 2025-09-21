import { QuestionModel, ClassTypeModel } from "@/models";
import { GraphQLError } from "graphql";

export const createQuestion = async (
  _: unknown,
  {
    input,
  }: { input: { questionName: string; maxScore: number; classTypeId?: string } }
) => {
  const { questionName, maxScore, classTypeId } = input;

  try {
    // Input validation
    if (!questionName || questionName.trim() === "") {
      throw new GraphQLError("Question name is required");
    }
    if (maxScore <= 0) {
      throw new GraphQLError("Max score must be greater than 0");
    }

    // If classTypeId is provided, verify it exists
    if (classTypeId) {
      const classType = await ClassTypeModel.findById(classTypeId);
      if (!classType) {
        throw new GraphQLError("ClassType not found");
      }
    }

    const question = new QuestionModel({
      questionName,
      maxScore,
      classTypeId: classTypeId || null,
    });

    const savedQuestion = await question.save();

    // If classTypeId is provided, add question to ClassType
    if (classTypeId) {
      await ClassTypeModel.findByIdAndUpdate(
        classTypeId,
        { $addToSet: { questions: savedQuestion._id } },
        { new: true }
      );
    }

    console.log(`✅ Question created: ${questionName}`);
    return {
      id: savedQuestion._id.toString(),
      questionName: savedQuestion.questionName,
      maxScore: savedQuestion.maxScore,
      classTypeId: savedQuestion.classTypeId?.toString() || null,
    };
  } catch (error: any) {
    console.error("❌ Create question error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(error.message || "Failed to create question");
  }
};
