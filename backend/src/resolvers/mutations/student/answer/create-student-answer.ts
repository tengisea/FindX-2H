import {
  StudentAnswerModel,
  StudentModel,
  ClassTypeModel,
} from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";
import { generateMandatNumber } from "@/utils/mandat-number-generator";

export const createStudentAnswer = async (
  _: unknown,
  { input }: { input: any }
) => {
  try {
    const { studentId, classTypeId, answers, image, mandatNumber } = input;

    const existingStudent = await StudentModel.findById(studentId);
    if (!existingStudent) throw new GraphQLError("Student does not exist");

    // Verify that the student is a participant in this ClassType
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) throw new GraphQLError("ClassType does not exist");

    if (!classType.participants?.includes(studentId as any)) {
      throw new GraphQLError("Student is not registered for this ClassType");
    }

    const totalScoreofOlympiad = Array.isArray(answers)
      ? answers.reduce((sum: number, a: any) => sum + (a?.score ?? 0), 0)
      : 0;

    // Generate mandat number if not provided
    let finalMandatNumber = mandatNumber;
    if (!finalMandatNumber) {
      const participantIndex = classType.participants?.length;
      finalMandatNumber = generateMandatNumber(classType.classYear, participantIndex);
    }

    const studentAnswer = new StudentAnswerModel({
      studentId,
      classTypeId,
      mandatNumber: finalMandatNumber,
      answers,
      totalScoreofOlympiad,
      image: image || [],
    });

    await studentAnswer.save();

    // Add the student answer to the ClassType's studentsAnswers array
    await ClassTypeModel.findByIdAndUpdate(
      classTypeId,
      { $addToSet: { studentsAnswers: studentAnswer._id } },
      { new: true }
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
    throw new GraphQLError(error.message);
  }
};
