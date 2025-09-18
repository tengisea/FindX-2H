import { StudentAnswerModel, ClassTypeModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

export const deleteStudentAnswer = async (
  _: unknown,
  { id }: { id: string }
) => {
  try {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new GraphQLError("Invalid student answer ID format");
    }

    const existingStudentAnswer = await StudentAnswerModel.findById(id);
    if (!existingStudentAnswer) {
      throw new GraphQLError("Student answer does not exist");
    }

    // Remove the student answer from the ClassType's studentsAnswers array
    await ClassTypeModel.findByIdAndUpdate(
      existingStudentAnswer.classTypeId,
      { $pull: { studentsAnswers: id } },
      { new: true }
    );

    await StudentAnswerModel.findByIdAndDelete(id);
    return true;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
