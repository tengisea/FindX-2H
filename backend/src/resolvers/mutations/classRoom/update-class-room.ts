import { ClassRoomModel } from "@/models";
import { GraphQLError } from "graphql";

export const updateClassRoom = async (
  _: unknown,
  {
    id,
    input,
  }: {
    id: string;
    input: {
      roomNumber?: string;
      maxStudents?: number;
      mandatNumber?: string[];
    };
  }
) => {
  const { roomNumber, maxStudents, mandatNumber } = input;

  try {
    // Input validation
    if (maxStudents !== undefined && maxStudents <= 0) {
      throw new GraphQLError("maxStudents must be greater than 0");
    }

    if (roomNumber !== undefined && (!roomNumber || roomNumber.trim() === "")) {
      throw new GraphQLError("roomNumber cannot be empty");
    }

    // Check if room number already exists (excluding current room)
    if (roomNumber) {
      const existingRoom = await ClassRoomModel.findOne({
        roomNumber,
        _id: { $ne: id },
      });
      if (existingRoom) {
        throw new GraphQLError(`Room number ${roomNumber} already exists`);
      }
    }

    // Prepare update object
    const updateData: any = {};
    if (roomNumber !== undefined) updateData.roomNumber = roomNumber;
    if (maxStudents !== undefined) updateData.maxStudents = maxStudents;
    if (mandatNumber !== undefined) {
      // Convert string IDs to ObjectIds
      updateData.mandatNumber = mandatNumber.map((id) => id as any);
    }

    const updatedClassRoom = await ClassRoomModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedClassRoom) {
      throw new GraphQLError("Class room not found");
    }

    console.log(`✅ Class room updated: ${id}`);

    return {
      id: updatedClassRoom._id.toString(),
      roomNumber: updatedClassRoom.roomNumber,
      maxStudents: updatedClassRoom.maxStudents,
      mandatNumber: updatedClassRoom.mandatNumber.map((id) => id.toString()),
    };
  } catch (error: any) {
    console.error("❌ Update class room error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(error.message || "Failed to update class room");
  }
};
