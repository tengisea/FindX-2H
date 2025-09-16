import { StudentAnswerModel, StudentModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { CreateStudentAnswerInput } from "@/types/generated";

export const createStudentAnswer = async (
  _: unknown,
  { input }: { input: CreateStudentAnswerInput }
) => {
  try {
    const { studentId, classTypeId, answers } = input;

    const existingStudent = await StudentModel.findById(studentId);
    if (!existingStudent) throw new GraphQLError("Student does not exist");

    const totalScoreofOlympiad = Array.isArray(answers)
      ? answers.reduce((sum: number, a: any) => sum + (a?.score ?? 0), 0)
      : 0;

    const studentAnswer = new StudentAnswerModel({
      studentId,
      classTypeId,
      answers,
      totalScoreofOlympiad,
    });

    await studentAnswer.save();

    const created = studentAnswer.toObject();
    return { id: String(created._id), ...created } as any;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
