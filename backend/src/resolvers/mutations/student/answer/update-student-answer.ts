import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { UpdateStudentAnswerInput } from "@/types/generated";
import { Types } from "mongoose";

export const updateStudentAnswer = async (
  _: unknown,
  { id, input }: { id: string; input: UpdateStudentAnswerInput }
) => {
  try {
    console.log("🔧 updateStudentAnswer called with:", { id, input });
    console.log("🔧 Input details:", {
      id,
      input,
      answers: input.answers,
      studentId: input.studentId,
      classTypeId: input.classTypeId,
      answersType: typeof input.answers,
      answersIsArray: Array.isArray(input.answers),
    });
    const { answers, studentId, classTypeId } = input;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new GraphQLError("Invalid student answer ID format");
    }

    const existingStudentAnswer = await StudentAnswerModel.findById(id);
    if (!existingStudentAnswer) {
      throw new GraphQLError("Student answer does not exist");
    }

    // Validate other ObjectIds if provided
    if (studentId && !Types.ObjectId.isValid(studentId)) {
      throw new GraphQLError("Invalid student ID format");
    }
    if (classTypeId && !Types.ObjectId.isValid(classTypeId)) {
      throw new GraphQLError("Invalid class type ID format");
    }

    // Validate answers array
    if (answers && !Array.isArray(answers)) {
      throw new GraphQLError("Answers must be an array");
    }

    // Validate each answer item
    if (answers) {
      for (const answer of answers) {
        if (!answer.questionId || typeof answer.questionId !== "string") {
          throw new GraphQLError(
            "Each answer must have a valid questionId string"
          );
        }
        if (typeof answer.score !== "number") {
          throw new GraphQLError("Each answer must have a valid score number");
        }
        if (!Types.ObjectId.isValid(answer.questionId)) {
          throw new GraphQLError("Invalid question ID format in answers");
        }
      }
    }

    const totalScoreofOlympiad = Array.isArray(answers)
      ? answers.reduce((sum: number, a: any) => sum + (a?.score ?? 0), 0)
      : existingStudentAnswer.totalScoreofOlympiad ?? 0;

    const updatedStudentAnswer = await StudentAnswerModel.findByIdAndUpdate(
      id,
      { answers, studentId, classTypeId, totalScoreofOlympiad },
      { new: true }
    ).lean();

    if (!updatedStudentAnswer) {
      throw new GraphQLError("Failed to update student answer");
    }

    const { _id, ...rest } = updatedStudentAnswer as any;
    return { id: String(_id), ...rest } as any;
  } catch (error: any) {
    console.error("❌ Error in updateStudentAnswer:", error);
    console.error("❌ Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw new GraphQLError(error.message);
  }
};
