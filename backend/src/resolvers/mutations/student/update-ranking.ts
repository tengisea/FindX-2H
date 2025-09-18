import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

export const updateRanking = async (
  _: unknown,
  {
    id,
    change,
    reason,
    olympiadId,
  }: { id: string; change: number; reason: string; olympiadId?: string }
) => {
  try {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new GraphQLError("Invalid student ID format");
    }

    if (olympiadId && !Types.ObjectId.isValid(olympiadId)) {
      throw new GraphQLError("Invalid olympiad ID format");
    }

    const existingStudent = await StudentModel.findById(id);
    if (!existingStudent) {
      throw new GraphQLError("Student does not exist");
    }

    // Calculate new ranking
    const newRanking = existingStudent.ranking + change;

    // Create ranking history entry
    const rankingHistoryEntry = {
      changedBy: id, // Assuming the student is changing their own ranking
      changedTo: newRanking,
      reason: reason,
      olympiadId: olympiadId || null,
      date: new Date(),
    };

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      id,
      {
        ranking: newRanking,
        $push: { rankingHistory: rankingHistoryEntry },
      },
      { new: true }
    ).lean();

    if (!updatedStudent) {
      throw new GraphQLError("Failed to update student ranking");
    }

    const { _id, ...rest } = updatedStudent as any;
    return {
      id: String(_id),
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
