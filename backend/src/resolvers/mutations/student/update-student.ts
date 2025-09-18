import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

export const updateStudent = async (
  _: unknown,
  { id, input }: { id: string; input: any }
) => {
  try {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new GraphQLError("Invalid student ID format");
    }

    const existingStudent = await StudentModel.findById(id);
    if (!existingStudent) {
      throw new GraphQLError("Student does not exist");
    }

    const updatedStudent = await StudentModel.findByIdAndUpdate(id, input, {
      new: true,
    }).lean();

    if (!updatedStudent) {
      throw new GraphQLError("Failed to update student");
    }

    const { _id, ...rest } = updatedStudent as any;
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
      rankingHistory:
        rest.rankingHistory?.map((entry: any) => ({
          ...entry,
          changedBy: String(entry.changedBy),
          olympiadId: entry.olympiadId ? String(entry.olympiadId) : null,
        })) || [],
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
