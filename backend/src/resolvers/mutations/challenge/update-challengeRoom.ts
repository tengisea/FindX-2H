import { MutationResolvers, UpdateChallengeRoomInput } from "@/types/generated";
import { ChallengeRoomModel } from "@/models/ChallengeRoom.model";
import { GraphQLError } from "graphql";

export const updateChallengeRoom: MutationResolvers["updateChallengeRoom"] =
  async (_: unknown, { input }: { input: UpdateChallengeRoomInput }) => {
    try {
      const challengeRoom = await ChallengeRoomModel.findByIdAndUpdate(
        input.roomId,
        input
      );
      if (!challengeRoom) {
        throw new GraphQLError("Challenge room not found");
      }
      return {
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
      };
    } catch (error) {
      throw new GraphQLError("Failed to update challenge room");
    }
  };
