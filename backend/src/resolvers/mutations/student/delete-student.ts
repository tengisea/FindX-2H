import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

export const deleteStudent = async (_: unknown, { id }: { id: string }) => {
  try {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new GraphQLError("Invalid student ID format");
    }

    const existingStudent = await StudentModel.findById(id);
    if (!existingStudent) {
      throw new GraphQLError("Student does not exist");
    }

    await StudentModel.findByIdAndDelete(id);
    return true;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
