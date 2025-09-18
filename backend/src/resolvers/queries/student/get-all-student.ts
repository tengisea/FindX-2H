import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";

export const getAllStudent = async () => {
  try {
    const students = await StudentModel.find().lean();
    return students.map((student: any) => {
      const { _id, ...rest } = student;
      return {
        id: String(_id),
        ...rest,
        participatedOlympiads:
          rest.participatedOlympiads?.map((id: any) => String(id)) || [],
        gold: rest.gold?.map((id: any) => String(id)) || [],
        silver: rest.silver?.map((id: any) => String(id)) || [],
        bronze: rest.bronze?.map((id: any) => String(id)) || [],
        top10: rest.top10?.map((id: any) => String(id)) || [],
      };
    });
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
