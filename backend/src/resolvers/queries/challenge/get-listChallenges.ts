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
    }).populate('tasks');

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
      tasks: (challenge.tasks as any[]).map(task => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        topic: task.topic.toUpperCase(),
        difficulty: task.difficulty.toUpperCase(),
        type: task.type.toUpperCase(),
        classType: task.classType.toUpperCase(),
        piPoints: task.piPoints,
        problemStatement: task.problemStatement,
        aiGenerated: task.aiGenerated,
        generatedAt: task.generatedAt,
        usageCount: task.usageCount,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt
      })),
      classType: challenge.classType,
      createdAt: (challenge as any).createdAt,
      updatedAt: (challenge as any).updatedAt,
    })) as Challenge[];
  } catch (error) {
    throw new GraphQLError("Failed to get list of challenges");
  }
};
