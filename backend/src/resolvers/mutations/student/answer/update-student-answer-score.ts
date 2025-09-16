import { GraphQLError } from "graphql";
import { StudentAnswerModel } from "../../../../models";

export const updateStudentAnswerScore = async (
  _: unknown,
  {
    studentAnswerId,
    questionId,
    score,
  }: { studentAnswerId: string; questionId: string; score: number }
) => {
  try {
    const existing = await StudentAnswerModel.findById(studentAnswerId);
    if (!existing) throw new GraphQLError("Student answer not found");

    const answers = existing.answers || [];
    const idx = answers.findIndex(
      (a: any) => String(a.questionId) === String(questionId)
    );
    if (idx === -1) {
      answers.push({ questionId: questionId as any, score });
    } else {
      answers[idx].score = score;
    }

    const totalScoreofOlympiad = answers.reduce(
      (sum: number, a: any) => sum + (a?.score ?? 0),
      0
    );

    const updated = await StudentAnswerModel.findByIdAndUpdate(
      studentAnswerId,
      { answers, totalScoreofOlympiad },
      { new: true }
    ).lean();

    if (!updated) throw new GraphQLError("Failed to update score");
    const { _id, ...rest } = updated as any;
    return { id: String(_id), ...rest } as any;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
