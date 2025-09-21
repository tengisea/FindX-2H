import { ClassRoomModel } from "@/models";
import { GraphQLError } from "graphql";

export const classRoom = async (_: unknown, { id }: { id: string }) => {
  try {
    const classRoom = await ClassRoomModel.findById(id).populate(
      "mandatNumber"
    );

    if (!classRoom) {
      throw new GraphQLError("Class room not found");
    }

    return {
      id: classRoom._id.toString(),
      roomNumber: classRoom.roomNumber,
      maxStudents: classRoom.maxStudents,
      mandatNumber: classRoom.mandatNumber.map((id: any) => id.toString()),
    };
  } catch (error: any) {
    console.error("❌ Get class room error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(error.message || "Failed to get class room");
  }
};
