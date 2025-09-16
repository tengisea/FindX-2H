import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { CreateStudentInput } from "@/types/generated";

export const createStudent = async (
  _: unknown,
  { input }: { input: CreateStudentInput }
) => {
  try {
    const {
      name,
      email,
      school,
      class: classYear,
      location,
      profilePicture,
    } = input;

    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      throw new GraphQLError("Student with this email already exists");
    }

    const student = new StudentModel({
      name,
      email,
      school,
      class: classYear,
      location,
      profilePicture,
    });

    await student.save();

    return student;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
