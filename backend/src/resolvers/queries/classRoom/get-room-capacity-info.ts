import { GraphQLError } from "graphql";
import { getRoomCapacityInfo } from "@/utils/room-utils";

export const getRoomCapacityInfoQuery = async (
  _: unknown,
  { classTypeId, roomNumber }: { classTypeId: string; roomNumber: number }
) => {
  try {
    const capacityInfo = await getRoomCapacityInfo(classTypeId, roomNumber);
    return capacityInfo;
  } catch (error: any) {
    console.error("❌ Get room capacity info error:", error);
    throw new GraphQLError(
      error.message || "Failed to get room capacity information"
    );
  }
};
