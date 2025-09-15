import { GraphQLError } from "graphql";
import { ChallengeRoomModel } from "@/models";
import { QueryResolvers, ChallengeRoom } from "@/types/generated";

export const listChallengeRoomsByStudent: QueryResolvers["listChallengeRoomsByStudent"] =
  async (_: unknown, { studentId }: { studentId: string }) => {
    try {
      const challengeRooms = await ChallengeRoomModel.find({
        $or: [{ challengerId: studentId }, { opponentId: studentId }],
      });

      return challengeRooms.map((challengeRoom) => ({
        id: challengeRoom._id.toString(),
        challengeId: challengeRoom.challengeId.toString(),
        challengerId: challengeRoom.challengerId.toString(),
        opponentId: challengeRoom.opponentId.toString(),
        status: challengeRoom.status as any,
        winnerId: challengeRoom.winnerId?.toString(),
        challengerScore: challengeRoom.challengerScore,
        opponentScore: challengeRoom.opponentScore,
        createdAt: (challengeRoom as any).createdAt,
        updatedAt: (challengeRoom as any).updatedAt,
      })) as ChallengeRoom[];
    } catch (error) {
      throw new GraphQLError("Failed to get list challenge room by student");
    }
  };
