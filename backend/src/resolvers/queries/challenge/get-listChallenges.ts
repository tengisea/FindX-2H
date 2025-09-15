import { QueryResolvers, Challenge } from "@/types/generated";
import { ChallengeModel } from "@/models";
import { GraphQLError } from "graphql";

export const listChallenges: QueryResolvers["listChallenges"] = async (
  _: unknown,
  { studentId }: { studentId: string }
) => {
  try {
    const challenges = await ChallengeModel.find({
      participants: studentId,
    });

    return challenges.map((challenge) => ({
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
    })) as Challenge[];
  } catch (error) {
    throw new GraphQLError("Failed to get list of challenges");
  }
};
