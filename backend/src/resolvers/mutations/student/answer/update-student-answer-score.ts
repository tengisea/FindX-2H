import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";
import { Schema } from "mongoose";

export const updateStudentAnswerScore = async (
  _: unknown,
  {
    studentAnswerId,
    questionId,
    score,
  }: { studentAnswerId: string; questionId: string; score: number }
) => {
  try {
    console.log("🚀 MUTATION CALLED - updateStudentAnswerScore");
    console.log("🎯 Updating score for:", { studentAnswerId, questionId, score });
    
    const studentAnswer = await StudentAnswerModel.findById(studentAnswerId);

    if (!studentAnswer) {
      throw new GraphQLError("Student answer not found");
    }

    console.log("📝 Student answer found:", studentAnswer.mandatNumber);
    console.log("📋 Current answers:", studentAnswer.answers);

    // Find and update the specific answer
    let answerIndex = studentAnswer.answers.findIndex(
      (answer: any) => answer.questionId.toString() === questionId
    );

    // If answer doesn't exist, create it
    if (answerIndex === -1) {
      console.log("➕ Creating new answer for questionId:", questionId);
      studentAnswer.answers.push({
        questionId: questionId as any, // Let mongoose handle the ObjectId conversion
        score: score,
        description: "Scored by host"
      });
      answerIndex = studentAnswer.answers.length - 1;
    } else {
      console.log("✏️ Updating existing answer at index:", answerIndex);
      // Update the existing score
      studentAnswer.answers[answerIndex].score = score;
    }

    // Recalculate total score
    studentAnswer.totalScoreofOlympiad = studentAnswer.answers.reduce(
      (sum: number, answer: any) => sum + answer.score,
      0
    );

    await studentAnswer.save();

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
    throw new GraphQLError(error.message);
  }
};
