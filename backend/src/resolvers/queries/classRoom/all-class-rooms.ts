import { ClassRoomModel } from "@/models";
import { GraphQLError } from "graphql";

export const allClassRooms = async () => {
  try {
    const classRooms = await ClassRoomModel.find().populate("mandatNumber");

    return classRooms.map((classRoom) => ({
      id: classRoom._id.toString(),
      roomNumber: classRoom.roomNumber,
      maxStudents: classRoom.maxStudents,
      mandatNumber: classRoom.mandatNumber.map((id: any) => id.toString()),
    }));
  } catch (error: any) {
    console.error("❌ Get all class rooms error:", error);
    throw new GraphQLError(error.message || "Failed to get all class rooms");
  }
};
