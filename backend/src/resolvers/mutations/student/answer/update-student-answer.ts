import { StudentAnswerModel, ClassTypeModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const updateStudentAnswer = async (
  _: unknown,
  { id, input }: { id: string; input: any }
) => {
  try {
    const { studentId, classTypeId, mandatNumber, answers, totalScoreofOlympiad, image } =
      input;

    // If classTypeId is being updated, validate that the student is a participant
    if (classTypeId) {
      const classType = await ClassTypeModel.findById(classTypeId);
      if (!classType) throw new GraphQLError("ClassType does not exist");

      if (studentId && !classType.participants.includes(studentId as any)) {
        throw new GraphQLError("Student is not registered for this ClassType");
      }
    }

    // Calculate total score if answers are provided
    let calculatedTotalScore = totalScoreofOlympiad;
    if (answers && Array.isArray(answers)) {
      calculatedTotalScore = answers.reduce(
        (sum: number, a: any) => sum + (a?.score ?? 0),
        0
      );
    }

    const updateData: any = {};
    if (studentId !== undefined) updateData.studentId = studentId;
    if (classTypeId !== undefined) updateData.classTypeId = classTypeId;
    if (mandatNumber !== undefined) updateData.mandatNumber = mandatNumber;
    if (answers !== undefined) updateData.answers = answers;
    if (calculatedTotalScore !== undefined)
      updateData.totalScoreofOlympiad = calculatedTotalScore;
    if (image !== undefined) updateData.image = image;

    const updatedStudentAnswer = await StudentAnswerModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedStudentAnswer) {
      throw new GraphQLError("Student answer not found");
    }

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
    throw new GraphQLError(error.message);
  }
};
