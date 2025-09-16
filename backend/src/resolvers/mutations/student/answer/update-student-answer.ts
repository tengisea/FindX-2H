import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { UpdateStudentAnswerInput } from "@/types/generated";

export const updateStudentAnswer = async (
  _: unknown,
  { input }: { input: UpdateStudentAnswerInput }
) => {
  try {
    const { id, answers, studentId, classTypeId } = input;

    const existingStudentAnswer = await StudentAnswerModel.findById(id);
    if (!existingStudentAnswer) {
      throw new GraphQLError("Student answer does not exist");
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
    throw new GraphQLError(error.message);
  }
};
