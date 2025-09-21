import { GraphQLError } from "graphql";
import { getAllRoomsWithCapacity } from "@/utils/room-utils";

export const getAllRoomsWithCapacityQuery = async (
  _: unknown,
  { classTypeId }: { classTypeId: string }
) => {
  try {
    const roomsWithCapacity = await getAllRoomsWithCapacity(classTypeId);
    return roomsWithCapacity;
  } catch (error: any) {
    console.error("❌ Get all rooms with capacity error:", error);
    throw new GraphQLError(
      error.message || "Failed to get rooms with capacity information"
    );
  }
};
