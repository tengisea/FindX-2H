import { ChallengeModel } from "@/models";
import { GraphQLError } from "graphql";
export const listChallenges = async (_, { studentId }) => {
    try {
        const challenges = await ChallengeModel.find({
            participants: studentId,
        }).populate('tasks');
        return challenges.map((challenge) => {
            var _a;
            return ({
                id: challenge._id.toString(),
                topic: challenge.topic,
                difficulty: challenge.difficulty,
                challenger: challenge.challenger.toString(),
                opponent: challenge.opponent.toString(),
                participants: challenge.participants.map((p) => p.toString()),
                winner: (_a = challenge.winner) === null || _a === void 0 ? void 0 : _a.toString(),
                piPoints: challenge.piPoints,
                status: challenge.status,
                tasks: challenge.tasks.map(task => ({
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
                createdAt: challenge.createdAt,
                updatedAt: challenge.updatedAt,
            });
        });
    }
    catch (error) {
        throw new GraphQLError("Failed to get list of challenges");
    }
};
