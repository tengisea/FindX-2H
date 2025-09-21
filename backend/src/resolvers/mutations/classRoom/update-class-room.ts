import { ClassRoomModel } from "@/models";
import { GraphQLError } from "graphql";

export const updateClassRoom = async (
  _: unknown,
  {
    id,
    input,
  }: {
    id: string;
    input: { roomNumber?: string };
  }
) => {
  const { roomNumber } = input;

  try {
    // Check if room number already exists (excluding current room)
    if (roomNumber) {
      const existingRoom = await ClassRoomModel.findOne({
        roomNumber,
        _id: { $ne: id },
      });
      if (existingRoom) {
        throw new GraphQLError("Room number already exists");
      }
    }

    const updatedClassRoom = await ClassRoomModel.findByIdAndUpdate(
      id,
      { roomNumber },
      { new: true }
    );

    if (!updatedClassRoom) {
      throw new GraphQLError("Class room not found");
    }

    console.log(`✅ Class room updated: ${id}`);

    return {
      id: updatedClassRoom._id.toString(),
      roomNumber: updatedClassRoom.roomNumber,
      mandatNumber: updatedClassRoom.mandatNumber.map((id) => id.toString()),
    };
  } catch (error: any) {
    console.error("❌ Update class room error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to update class room"
    );
  }
};
