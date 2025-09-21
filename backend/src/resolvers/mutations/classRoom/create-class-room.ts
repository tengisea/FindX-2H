import { ClassRoomModel, ClassTypeModel, StudentAnswerModel } from "@/models";
import { GraphQLError } from "graphql";
import { assignStudentsToRoom } from "@/utils/room-assignment";

export const createClassRoom = async (
  _: unknown,
  {
    input,
  }: { input: { roomNumber: string; classTypeId: string; maxStudents: number } }
) => {
  const { roomNumber, classTypeId, maxStudents } = input;

  try {
    // Input validation
    if (maxStudents <= 0) {
      throw new GraphQLError("maxStudents must be greater than 0");
    }

    if (!roomNumber || roomNumber.trim() === "") {
      throw new GraphQLError("roomNumber is required");
    }

    // Validate classType exists
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new GraphQLError("ClassType not found");
    }

    // Check if room number already exists in this classType
    const roomNumberInt = parseInt(roomNumber);
    if (isNaN(roomNumberInt)) {
      throw new GraphQLError("roomNumber must be a valid number");
    }

    // Check if a room with this number already exists in this ClassType
    const existingRoomInClassType = await ClassRoomModel.findOne({
      _id: { $in: classType.rooms || [] },
      roomNumber: roomNumber,
    });

    if (existingRoomInClassType) {
      throw new GraphQLError(
        `Room number ${roomNumber} already exists in this ClassType`
      );
    }

    // Create the ClassRoom document
    const classRoom = new ClassRoomModel({
      roomNumber,
      maxStudents,
      mandatNumber: [],
    });

    const savedClassRoom = await classRoom.save();

    // Add the room to the ClassType's rooms array
    if (!classType.rooms) {
      classType.rooms = [];
    }
    classType.rooms.push(savedClassRoom._id as any);
    await classType.save();

    // Automatically assign students to this room
    try {
      const assignedStudentIds = await assignStudentsToRoom(
        classTypeId,
        roomNumberInt
      );
      console.log(
        `✅ Automatically assigned ${assignedStudentIds.length} students to room ${roomNumber} (ClassType: ${classTypeId})`
      );
    } catch (assignmentError) {
      console.warn(
        `⚠️ Failed to auto-assign students to room ${roomNumber} (ClassType: ${classTypeId}):`,
        assignmentError instanceof Error
          ? assignmentError.message
          : assignmentError
      );
      // Don't throw error here, room creation should still succeed
    }

    console.log(`✅ Class room created: ${roomNumber}`);

    return {
      id: savedClassRoom._id.toString(),
      roomNumber: savedClassRoom.roomNumber,
      maxStudents: savedClassRoom.maxStudents,
      mandatNumber: savedClassRoom.mandatNumber.map((id) => id.toString()),
    };
  } catch (error: any) {
    console.error("❌ Create class room error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(error.message || "Failed to create class room");
  }
};
