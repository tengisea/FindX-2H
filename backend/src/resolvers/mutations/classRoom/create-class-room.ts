import { ClassRoomModel } from "@/models";
import { GraphQLError } from "graphql";

export const createClassRoom = async (
  _: unknown,
  { input }: { input: { roomNumber: string } }
) => {
  const { roomNumber } = input;

  try {
    // Check if room number already exists
    const existingRoom = await ClassRoomModel.findOne({ roomNumber });
    if (existingRoom) {
      throw new GraphQLError("Room number already exists");
    }

    const classRoom = new ClassRoomModel({
      roomNumber,
      mandatNumber: [],
    });

    const savedClassRoom = await classRoom.save();

    console.log(`✅ Class room created: ${roomNumber}`);

    return {
      id: savedClassRoom._id.toString(),
      roomNumber: savedClassRoom.roomNumber,
      mandatNumber: savedClassRoom.mandatNumber.map((id) => id.toString()),
    };
  } catch (error: any) {
    console.error("❌ Create class room error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw new GraphQLError(
      error.message || "Failed to create class room"
    );
  }
};
