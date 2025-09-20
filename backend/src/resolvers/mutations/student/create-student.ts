import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { CreateStudentInput } from "@/types/generated";
import { getRegionByProvince } from "../../../utils/province-region-mapper";

export const createStudent = async (
  _: unknown,
  { input }: { input: CreateStudentInput }
) => {
  try {
    const {
      name,
      email,
      province,
      district,
      school,
      class: classYear,
      profilePicture,
    } = input;

    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      throw new GraphQLError("Student with this email already exists");
    }

    // Automatically determine region based on province
    const region = getRegionByProvince(province);

    const student = new StudentModel({
      name,
      email,
      province,
      region,
      district,
      school,
      class: classYear,
      profilePicture,
    });

    await student.save();

    const created = student.toObject();
    const { _id, ...rest } = created as any;
    return {
      id: String(_id),
      class: rest.class,
      ...rest,
      participatedOlympiads:
        rest.participatedOlympiads?.map((id: any) => String(id)) || [],
      gold: rest.gold?.map((id: any) => String(id)) || [],
      silver: rest.silver?.map((id: any) => String(id)) || [],
      bronze: rest.bronze?.map((id: any) => String(id)) || [],
      top10: rest.top10?.map((id: any) => String(id)) || [],
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
