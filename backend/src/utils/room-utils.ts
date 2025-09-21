import { ClassTypeModel, StudentAnswerModel, ClassRoomModel } from "../models";

/**
 * Get room capacity information
 * @param classTypeId - The classType ID
 * @param roomNumber - The room number
 * @returns Room capacity information
 */
export const getRoomCapacityInfo = async (
  classTypeId: string,
  roomNumber: number
) => {
  try {
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new Error("ClassType not found");
    }

    // Find the ClassRoom document with matching roomNumber
    const room = await ClassRoomModel.findOne({
      _id: { $in: classType.rooms || [] },
      roomNumber: roomNumber.toString(),
    });

    if (!room) {
      throw new Error(`Room number ${roomNumber} not found in this ClassType`);
    }

    const currentStudents = await StudentAnswerModel.find({
      classTypeId,
      roomNumber,
    });

    return {
      roomNumber,
      maxStudents: room.maxStudents,
      currentStudents: currentStudents.length,
      availableSlots: room.maxStudents - currentStudents.length,
      isFull: currentStudents.length >= room.maxStudents,
      mandatNumbers: room.mandatNumber.map((id) => id.toString()),
    };
  } catch (error) {
    console.error("Error getting room capacity info:", error);
    throw error;
  }
};

/**
 * Check if room has available capacity
 * @param classTypeId - The classType ID
 * @param roomNumber - The room number
 * @returns Boolean indicating if room has capacity
 */
export const hasRoomCapacity = async (
  classTypeId: string,
  roomNumber: number
): Promise<boolean> => {
  try {
    const capacityInfo = await getRoomCapacityInfo(classTypeId, roomNumber);
    return !capacityInfo.isFull;
  } catch (error) {
    console.error("Error checking room capacity:", error);
    return false;
  }
};

/**
 * Get all rooms for a ClassType with capacity information
 * @param classTypeId - The classType ID
 * @returns Array of rooms with capacity info
 */
export const getAllRoomsWithCapacity = async (classTypeId: string) => {
  try {
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType || !classType.rooms) {
      return [];
    }

    // Get all ClassRoom documents for this ClassType
    const roomDocuments = await ClassRoomModel.find({
      _id: { $in: classType.rooms },
    });

    const roomsWithCapacity = await Promise.all(
      roomDocuments.map(async (room) => {
        const currentStudents = await StudentAnswerModel.find({
          classTypeId,
          roomNumber: parseInt(room.roomNumber),
        });

        return {
          roomNumber: parseInt(room.roomNumber),
          maxStudents: room.maxStudents,
          currentStudents: currentStudents.length,
          availableSlots: room.maxStudents - currentStudents.length,
          isFull: currentStudents.length >= room.maxStudents,
          mandatNumbers: room.mandatNumber.map((id) => id.toString()),
        };
      })
    );

    return roomsWithCapacity;
  } catch (error) {
    console.error("Error getting all rooms with capacity:", error);
    throw error;
  }
};

/**
 * Validate room number format
 * @param roomNumber - The room number to validate
 * @returns Boolean indicating if room number is valid
 */
export const isValidRoomNumber = (roomNumber: string): boolean => {
  const num = parseInt(roomNumber);
  return !isNaN(num) && num > 0;
};

/**
 * Check if room number exists in ClassType
 * @param classTypeId - The classType ID
 * @param roomNumber - The room number to check
 * @returns Boolean indicating if room exists
 */
export const roomExistsInClassType = async (
  classTypeId: string,
  roomNumber: number
): Promise<boolean> => {
  try {
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType || !classType.rooms) {
      return false;
    }

    // Check if any ClassRoom document with this roomNumber exists in this ClassType
    const room = await ClassRoomModel.findOne({
      _id: { $in: classType.rooms },
      roomNumber: roomNumber.toString(),
    });

    return !!room;
  } catch (error) {
    console.error("Error checking if room exists:", error);
    return false;
  }
};
