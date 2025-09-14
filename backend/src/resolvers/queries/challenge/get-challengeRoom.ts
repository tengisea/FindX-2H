import { GraphQLError } from "graphql";
import { ChallengeRoomModel } from "@/models";
import { QueryResolvers, ChallengeRoom } from "@/types/generated";

export const getChallengeRoom: QueryResolvers["getChallengeRoom"] = async (
  _: unknown,
  { id }: { id: string }
) => {
  try {
    const challengeRoom = await ChallengeRoomModel.findById(id);
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
    } as ChallengeRoom;
  } catch (error) {
    throw new GraphQLError("Failed to get challenge room");
  }
};
