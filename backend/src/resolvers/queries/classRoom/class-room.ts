import { ClassRoomModel } from "@/models";
import { GraphQLError } from "graphql";

export const classRoom = async (_: unknown, { id }: { id: string }) => {
  try {
    const classRoom = await ClassRoomModel.findById(id).populate("mandatNumber");

    if (!classRoom) {
      throw new GraphQLError("Class room not found");
    }

    return {
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
    };
  } catch (error: any) {
    console.error("❌ Get class room error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to get class room"
    );
  }
};
