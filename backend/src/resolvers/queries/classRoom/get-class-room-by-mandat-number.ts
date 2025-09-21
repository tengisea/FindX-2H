import { ClassRoomModel, StudentAnswerModel } from "@/models";
import { GraphQLError } from "graphql";

export const getClassRoomByMandatNumber = async (
  _: unknown,
  { mandatNumber }: { mandatNumber: string }
) => {
  try {
    // Find the StudentAnswer with this mandat number
    const studentAnswer = await StudentAnswerModel.findOne({
      mandatNumber: mandatNumber,
    });

    if (!studentAnswer) {
      throw new GraphQLError(
        "Student answer with this mandat number not found"
      );
    }

    if (!studentAnswer.roomNumber) {
      throw new GraphQLError("Student is not assigned to any room");
    }

    // Find the ClassRoom that contains this StudentAnswer
    const classRoom = await ClassRoomModel.findOne({
      mandatNumber: studentAnswer._id,
    });

    if (!classRoom) {
      throw new GraphQLError("Class room not found for this mandat number");
    }

    return {
      id: classRoom._id.toString(),
      roomNumber: classRoom.roomNumber,
      maxStudents: classRoom.maxStudents,
      mandatNumber: classRoom.mandatNumber.map((id) => id.toString()),
    };
  } catch (error: any) {
    console.error("❌ Get class room by mandat number error:", error);
    throw new GraphQLError(
      error.message || "Failed to get class room by mandat number"
    );
  }
};
