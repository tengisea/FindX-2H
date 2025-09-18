import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const updateStudentAnswerScore = async (
  _: unknown,
  {
    studentAnswerId,
    questionId,
    score,
  }: { studentAnswerId: string; questionId: string; score: number }
) => {
  try {
    const studentAnswer = await StudentAnswerModel.findById(studentAnswerId);

    if (!studentAnswer) {
      throw new GraphQLError("Student answer not found");
    }

    // Find and update the specific answer
    const answerIndex = studentAnswer.answers.findIndex(
      (answer: any) => answer.questionId.toString() === questionId
    );

    if (answerIndex === -1) {
      throw new GraphQLError("Question answer not found");
    }

    // Update the score
    studentAnswer.answers[answerIndex].score = score;

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
