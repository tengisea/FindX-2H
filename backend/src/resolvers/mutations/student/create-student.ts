import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { CreateStudentInput } from "@/types/generated";
import {
  validateStudentInput,
  validateObjectId,
} from "@/utils/validationHelper";

export const createStudent = async (
  _: unknown,
  { input }: { input: CreateStudentInput }
) => {
  try {
    // Validate input
    validateStudentInput(input);

    const {
      name,
      email,
      province,
      region,
      school,
      class: classYear,
      profilePicture,
    } = input;

    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      throw new GraphQLError("Student with this email already exists");
    }

    const student = new StudentModel({
      name,
      email,
      province,
      region,
      school,
      class: classYear,
      profilePicture,
    });

    await student.save();

    const created = student.toObject();
    const { _id, ...rest } = created as Record<string, unknown>;
    return {
      id: String(_id),
      class: rest.class,
      ...rest,
      participatedOlympiads:
        (rest.participatedOlympiads as string[])?.map((id: string) =>
          String(id)
        ) || [],
      gold: (rest.gold as string[])?.map((id: string) => String(id)) || [],
      silver: (rest.silver as string[])?.map((id: string) => String(id)) || [],
      bronze: (rest.bronze as string[])?.map((id: string) => String(id)) || [],
      top10: (rest.top10 as string[])?.map((id: string) => String(id)) || [],
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new GraphQLError(errorMessage);
  }
};
