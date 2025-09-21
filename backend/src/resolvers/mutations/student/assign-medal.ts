import { StudentAnswerModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { StudentModel } from "@/models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const assignMedal = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      studentAnswerId: string;
      medalType: string; // "gold", "silver", "bronze", "top10"
    };
  }
) => {
  const { studentAnswerId, medalType } = input;

  try {
    // Find the student answer
    const studentAnswer = await StudentAnswerModel.findById(studentAnswerId);
    if (!studentAnswer) {
      throw new GraphQLError("Student answer not found");
    }

    // Find the class type
    const classType = await ClassTypeModel.findById(studentAnswer.classTypeId);
    if (!classType) {
      throw new GraphQLError("Class type not found");
    }

    const studentId = studentAnswer.studentId;

    // Remove student from all medal arrays first
    await ClassTypeModel.findByIdAndUpdate(
      studentAnswer.classTypeId,
      {
        $pull: {
          gold: studentId,
          silver: studentId,
          bronze: studentId,
          top10: studentId,
        },
      }
    );

    // Add student to the appropriate medal array
    let updateField: any = {};
    switch (medalType.toLowerCase()) {
      case "gold":
        updateField = { $addToSet: { gold: studentId } };
        break;
      case "silver":
        updateField = { $addToSet: { silver: studentId } };
        break;
      case "bronze":
        updateField = { $addToSet: { bronze: studentId } };
        break;
      case "top10":
        updateField = { $addToSet: { top10: studentId } };
        break;
      default:
        throw new GraphQLError("Invalid medal type. Must be: gold, silver, bronze, or top10");
    }

    await ClassTypeModel.findByIdAndUpdate(
      studentAnswer.classTypeId,
      updateField
    );

    // Also update the student's medal arrays
    await StudentModel.findByIdAndUpdate(
      studentId,
      {
        $pull: {
          gold: studentAnswer.classTypeId,
          silver: studentAnswer.classTypeId,
          bronze: studentAnswer.classTypeId,
          top10: studentAnswer.classTypeId,
        },
      }
    );

    // Add to appropriate medal array in student
    let studentUpdateField: any = {};
    switch (medalType.toLowerCase()) {
      case "gold":
        studentUpdateField = { $addToSet: { gold: studentAnswer.classTypeId } };
        break;
      case "silver":
        studentUpdateField = { $addToSet: { silver: studentAnswer.classTypeId } };
        break;
      case "bronze":
        studentUpdateField = { $addToSet: { bronze: studentAnswer.classTypeId } };
        break;
      case "top10":
        studentUpdateField = { $addToSet: { top10: studentAnswer.classTypeId } };
        break;
    }

    await StudentModel.findByIdAndUpdate(studentId, studentUpdateField);

    console.log(
      `✅ Medal assigned: Student ${studentId} received ${medalType} medal for class type ${studentAnswer.classTypeId}`
    );

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
  } catch (error: any) {
    console.error("❌ Assign medal error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to assign medal"
    );
  }
};
