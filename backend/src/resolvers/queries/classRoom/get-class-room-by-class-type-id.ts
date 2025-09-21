import { ClassRoomModel, ClassTypeModel } from "@/models";
import { GraphQLError } from "graphql";

export const getClassRoomByClassTypeId = async (
  _: unknown,
  { classTypeId }: { classTypeId: string }
) => {
  try {
    // Get the ClassType to find its rooms
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new GraphQLError("ClassType not found");
    }

    if (!classType.rooms || classType.rooms.length === 0) {
      return [];
    }

    // Get all ClassRoom documents for this ClassType
    const classRooms = await ClassRoomModel.find({
      _id: { $in: classType.rooms },
    });

    return classRooms.map((classRoom) => ({
      id: classRoom._id.toString(),
      roomNumber: classRoom.roomNumber,
      maxStudents: classRoom.maxStudents,
      mandatNumber: classRoom.mandatNumber.map((id) => id.toString()),
    }));
  } catch (error: any) {
    console.error("❌ Get class rooms by class type ID error:", error);
    throw new GraphQLError(
      error.message || "Failed to get class rooms by class type ID"
    );
  }
};
