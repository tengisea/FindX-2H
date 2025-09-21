import { ClassRoomModel } from "@/models";
import { GraphQLError } from "graphql";

export const allClassRooms = async () => {
  try {
    const classRooms = await ClassRoomModel.find().populate("mandatNumber");

    return classRooms.map((classRoom) => ({
      id: classRoom._id.toString(),
      roomNumber: classRoom.roomNumber,
      mandatNumber: classRoom.mandatNumber.map((studentAnswer: any) => ({
        id: studentAnswer._id.toString(),
        studentId: studentAnswer.studentId.toString(),
        classTypeId: studentAnswer.classTypeId.toString(),
        mandatNumber: studentAnswer.mandatNumber,
        answers: studentAnswer.answers,
        totalScoreofOlympiad: studentAnswer.totalScoreofOlympiad,
        image: studentAnswer.image,
        createdAt: studentAnswer.createdAt.toISOString(),
        updatedAt: studentAnswer.updatedAt.toISOString(),
      })),
    }));
  } catch (error: any) {
    console.error("❌ Get all class rooms error:", error);
    throw new GraphQLError(
      error.message || "Failed to get all class rooms"
    );
  }
};
