import { GraphQLError } from "graphql";
import { ChallengeModel } from "@/models";
export const getChallenge = async (_, { id }) => {
    var _a;
    try {
        const challenge = await ChallengeModel.findById(id).populate('tasks');
        if (!challenge) {
            throw new GraphQLError("Challenge not found");
        }
        return {
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
        };
    }
    catch (error) {
        throw new GraphQLError("Failed to get challenge");
    }
};
