import { ChallengeRoomModel } from "@/models/ChallengeRoom.model";
import { MutationResolvers, ChallengeRoomInput } from "@/types/generated";
import { GraphQLError } from "graphql";

export const createChallengeRoom: MutationResolvers["createChallengeRoom"] =
  async (_: unknown, { input }: { input: ChallengeRoomInput }) => {
    try {
      const challengeRoom = await ChallengeRoomModel.create(input);
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
      throw new GraphQLError("Failed to create challenge room");
    }
  };
