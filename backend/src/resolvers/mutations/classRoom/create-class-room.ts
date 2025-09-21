import { ClassRoomModel, ClassTypeModel, StudentAnswerModel } from "@/models";
import { assignStudentsToRoom } from "@/utils/room-assignment";
import { withTransaction } from "@/utils/transactionHelper";
import {
  createGraphQLError,
  ErrorCodes,
  handleAsyncError,
} from "@/utils/errorHandler";
import { validateClassRoomInput } from "@/utils/validationHelper";

export const createClassRoom = async (
  _: unknown,
  {
    input,
  }: { input: { roomNumber: string; maxStudents: number; classTypeId: string } }
) => {
  const { roomNumber, maxStudents, classTypeId } = input;

  return await handleAsyncError(async () => {
    // Validate input
    validateClassRoomInput(input);

    return await withTransaction(async (session) => {
      // Validate classType exists
      const classType = await ClassTypeModel.findById(classTypeId).session(
        session
      );
      if (!classType) {
        throw createGraphQLError("ClassType not found", ErrorCodes.NOT_FOUND);
      }

      // Check if room number already exists in this classType
      const roomNumberInt = parseInt(roomNumber);
      if (isNaN(roomNumberInt)) {
        throw createGraphQLError(
          "roomNumber must be a valid number",
          ErrorCodes.VALIDATION_ERROR
        );
      }

      // Check if a room with this number already exists in this ClassType
      const existingRoom = await ClassRoomModel.findOne({
        classTypeId: classTypeId,
        roomNumber: roomNumber,
      }).session(session);

      if (existingRoom) {
        throw createGraphQLError(
          `Room number ${roomNumber} already exists in this ClassType`,
          ErrorCodes.CONFLICT
        );
      }

      // Create the ClassRoom document
      const classRoom = new ClassRoomModel({
        roomNumber,
        maxStudents,
        classTypeId,
        mandatNumber: [],
      });

      const savedClassRoom = await classRoom.save({ session });

      // Add the room to the ClassType's rooms array
      await ClassTypeModel.findByIdAndUpdate(
        classTypeId,
        { $addToSet: { rooms: savedClassRoom._id } },
        { session }
      );

      console.log(`✅ Class room created: ${roomNumber}`);

      return {
        id: savedClassRoom._id.toString(),
        roomNumber: savedClassRoom.roomNumber,
        maxStudents: savedClassRoom.maxStudents,
        mandatNumber: savedClassRoom.mandatNumber.map((id) => id.toString()),
        classTypeId: savedClassRoom.classTypeId.toString(),
      };
    });
  }, "Failed to create class room");
};
