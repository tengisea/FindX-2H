import { StudentAnswerModel, ClassTypeModel, ClassRoomModel } from "../models";

/**
 * Randomly assigns students to a room in a ClassType
 * @param classTypeId - The classType ID
 * @param roomNumber - The room number to assign students to
 * @returns Array of assigned student IDs
 */
export const assignStudentsToRoom = async (
  classTypeId: string,
  roomNumber: number
): Promise<string[]> => {
  try {
    // Get the classType to get participants and room info
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new Error("ClassType not found");
    }

    // Check if ClassType has rooms
    if (!classType.rooms || classType.rooms.length === 0) {
      throw new Error("No rooms found in this ClassType");
    }

    // Find the ClassRoom document with matching roomNumber
    const room = await ClassRoomModel.findOne({
      _id: { $in: classType.rooms },
      roomNumber: roomNumber.toString(),
    });

    if (!room) {
      throw new Error(`Room number ${roomNumber} not found in this ClassType`);
    }

    // Get all student answers for this classType that don't have a room assigned
    const unassignedStudentAnswers = await StudentAnswerModel.find({
      classTypeId,
      $or: [{ roomNumber: { $exists: false } }, { roomNumber: null }],
    });

    if (unassignedStudentAnswers.length === 0) {
      console.log("No unassigned students found for classType:", classTypeId);
      return [];
    }

    // Shuffle the array randomly
    const shuffledStudents = shuffleArray([...unassignedStudentAnswers]);

    // Take only the number of students that fit in the room
    const studentsToAssign = shuffledStudents.slice(0, room.maxStudents);

    // Update student answers with room number
    const studentIds = studentsToAssign.map((student) =>
      student._id.toString()
    );

    await StudentAnswerModel.updateMany(
      { _id: { $in: studentIds } },
      { roomNumber }
    );

    // Add mandat numbers to the ClassRoom document
    const mandatNumbers = studentsToAssign
      .map((student) => student.mandatNumber)
      .filter((mandatNumber): mandatNumber is string => !!mandatNumber);

    // Update the ClassRoom document's mandatNumber array
    const studentAnswerIds = studentsToAssign.map(
      (student) => student._id as any
    );
    room.mandatNumber.push(...studentAnswerIds);
    await room.save();

    console.log(
      `Assigned ${studentsToAssign.length} students to room ${roomNumber}`
    );

    return studentIds;
  } catch (error) {
    console.error("Error assigning students to room:", error);
    throw error;
  }
};

/**
 * Assigns students to multiple rooms in a ClassType
 * @param roomNumbers - Array of room numbers
 * @param classTypeId - The classType ID
 * @returns Object with room assignments
 */
export const assignStudentsToMultipleRooms = async (
  roomNumbers: number[],
  classTypeId: string
): Promise<{ [roomNumber: string]: string[] }> => {
  try {
    const assignments: { [roomNumber: string]: string[] } = {};

    // Get the classType
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new Error("ClassType not found");
    }

    // Get all unassigned students for this classType
    const unassignedStudentAnswers = await StudentAnswerModel.find({
      classTypeId,
      $or: [{ roomNumber: { $exists: false } }, { roomNumber: null }],
    });

    if (unassignedStudentAnswers.length === 0) {
      console.log("No unassigned students found for classType:", classTypeId);
      return assignments;
    }

    // Shuffle students randomly
    const shuffledStudents = shuffleArray([...unassignedStudentAnswers]);

    let studentIndex = 0;

    // Assign students to each room
    for (const roomNumber of roomNumbers) {
      // Find the ClassRoom document with matching roomNumber
      const room = await ClassRoomModel.findOne({
        _id: { $in: classType.rooms || [] },
        roomNumber: roomNumber.toString(),
      });

      if (!room) continue;

      const studentsForThisRoom = shuffledStudents.slice(
        studentIndex,
        studentIndex + room.maxStudents
      );

      if (studentsForThisRoom.length > 0) {
        const studentIds = studentsForThisRoom.map((student) =>
          student._id.toString()
        );

        // Update student answers
        await StudentAnswerModel.updateMany(
          { _id: { $in: studentIds } },
          { roomNumber }
        );

        // Add student answer IDs to room
        const studentAnswerIds = studentsForThisRoom.map(
          (student) => student._id as any
        );
        room.mandatNumber.push(...studentAnswerIds);
        await room.save();

        assignments[roomNumber.toString()] = studentIds;
        studentIndex += studentsForThisRoom.length;

        console.log(
          `Assigned ${studentsForThisRoom.length} students to room ${roomNumber}`
        );
      }
    }

    // No need to save classType since we're updating individual ClassRoom documents

    return assignments;
  } catch (error) {
    console.error("Error assigning students to multiple rooms:", error);
    throw error;
  }
};

/**
 * Gets unassigned students for a classType
 * @param classTypeId - The classType ID
 * @returns Array of unassigned student answers
 */
export const getUnassignedStudents = async (classTypeId: string) => {
  try {
    return await StudentAnswerModel.find({
      classTypeId,
      $or: [{ roomNumber: { $exists: false } }, { roomNumber: null }],
    }).populate("studentId", "name email class");
  } catch (error) {
    console.error("Error getting unassigned students:", error);
    return [];
  }
};

/**
 * Gets students assigned to a specific room
 * @param classTypeId - The classType ID
 * @param roomNumber - The room number
 * @returns Array of student answers in the room
 */
export const getStudentsInRoom = async (
  classTypeId: string,
  roomNumber: number
) => {
  try {
    return await StudentAnswerModel.find({
      classTypeId,
      roomNumber,
    }).populate("studentId", "name email class");
  } catch (error) {
    console.error("Error getting students in room:", error);
    return [];
  }
};

/**
 * Fisher-Yates shuffle algorithm to randomize array
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
