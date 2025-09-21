import { StudentAnswerModel } from "@/models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const addStudentResult = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      studentAnswerId: string;
      answers: Array<{
        questionId: string;
        score: number;
        description: string;
      }>;
      image: string[];
    };
  }
) => {
  const { studentAnswerId, answers, image } = input;

  try {
    // Find the student answer
    const studentAnswer = await StudentAnswerModel.findById(studentAnswerId);
    if (!studentAnswer) {
      throw new GraphQLError("Student answer not found");
    }

    // Calculate total score
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);

    // Update the student answer with results
    const updatedStudentAnswer = await StudentAnswerModel.findByIdAndUpdate(
      studentAnswerId,
      {
        answers,
        image,
        totalScoreofOlympiad: totalScore,
      },
      { new: true }
    );

    if (!updatedStudentAnswer) {
      throw new GraphQLError("Failed to update student result");
    }

    console.log(
      `✅ Student result added: ${studentAnswerId}, Total Score: ${totalScore}`
    );

    const transformed = transformDocument(updatedStudentAnswer);

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
    console.error("❌ Add student result error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to add student result"
    );
  }
};
