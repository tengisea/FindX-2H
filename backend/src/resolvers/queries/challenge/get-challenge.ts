import { GraphQLError } from "graphql";
import { ChallengeModel } from "@/models";
import { QueryResolvers, Challenge } from "@/types/generated";

export const getChallenge: QueryResolvers["getChallenge"] = async (
  _: unknown,
  { id }: { id: string }
) => {
  try {
    const challenge = await ChallengeModel.findById(id);
    if (!challenge) {
      throw new GraphQLError("Challenge not found");
    }

    return {
      id: challenge._id.toString(),
      topic: challenge.topic,
      difficulty: challenge.difficulty as any,
      challenger: challenge.challenger.toString(),
      opponent: challenge.opponent.toString(),
      participants: challenge.participants.map((p) => p.toString()),
      winner: challenge.winner?.toString(),
      piPoints: challenge.piPoints,
      status: challenge.status as any,
      createdAt: (challenge as any).createdAt,
      updatedAt: (challenge as any).updatedAt,
    } as Challenge;
  } catch (error) {
    throw new GraphQLError("Failed to get challenge");
  }
};
