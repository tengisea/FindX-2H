import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

export const updateMedals = async (
  _: unknown,
  { id, olympiadId, medal }: { id: string; olympiadId: string; medal: string }
) => {
  try {
    // Validate ObjectId formats
    if (!Types.ObjectId.isValid(id)) {
      throw new GraphQLError("Invalid student ID format");
    }
    if (!Types.ObjectId.isValid(olympiadId)) {
      throw new GraphQLError("Invalid olympiad ID format");
    }

    const existingStudent = await StudentModel.findById(id);
    if (!existingStudent) {
      throw new GraphQLError("Student does not exist");
    }

    // Update the appropriate medal array based on medal type
    let updateField = {};
    switch (medal) {
      case "GOLD":
        updateField = { $addToSet: { gold: olympiadId } };
        break;
      case "SILVER":
        updateField = { $addToSet: { silver: olympiadId } };
        break;
      case "BRONZE":
        updateField = { $addToSet: { bronze: olympiadId } };
        break;
      case "TOP10":
        updateField = { $addToSet: { top10: olympiadId } };
        break;
      default:
        throw new GraphQLError(
          "Invalid medal type. Must be GOLD, SILVER, BRONZE, or TOP10"
        );
    }

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      id,
      updateField,
      { new: true }
    ).lean();

    if (!updatedStudent) {
      throw new GraphQLError("Failed to update student medals");
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
          olympiadId: String(entry.olympiadId),
        })) || [],
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
