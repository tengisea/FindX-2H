import { ClassRoomModel } from "@/models";
import { ClassTypeModel } from "@/models";
import { GraphQLError } from "graphql";

export const deleteClassRoom = async (_: unknown, { id }: { id: string }) => {
  try {
    // Get the room first to check its roomNumber
    const roomToDelete = await ClassRoomModel.findById(id);
    if (!roomToDelete) {
      throw new GraphQLError("Class room not found");
    }

    // Check if any class types are using this room
    const classTypesUsingRoom = await ClassTypeModel.find({ classRoom: id });
    if (classTypesUsingRoom.length > 0) {
      throw new GraphQLError(
        "Cannot delete class room that is being used by class types"
      );
    }

    // Check if any class types have this room in their rooms array
    const classTypesWithRoom = await ClassTypeModel.find({
      "rooms.roomNumber": parseInt(roomToDelete.roomNumber),
    });
    if (classTypesWithRoom.length > 0) {
      throw new GraphQLError(
        "Cannot delete class room that is being used in class types rooms array"
      );
    }

    const deletedClassRoom = await ClassRoomModel.findByIdAndDelete(id);

    if (!deletedClassRoom) {
      throw new GraphQLError("Class room not found");
    }

    console.log(`✅ Class room deleted: ${id}`);

    return true;
  } catch (error: any) {
    console.error("❌ Delete class room error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(error.message || "Failed to delete class room");
  }
};
