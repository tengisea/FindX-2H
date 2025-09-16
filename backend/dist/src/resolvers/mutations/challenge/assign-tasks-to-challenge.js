import { GraphQLError } from "graphql";
import { ChallengeModel } from "@/models";
import { TaskModel } from "@/models";
export const assignTasksToChallenge = async (_, { input }) => {
    var _a;
    try {
        // Verify challenge exists
        const challenge = await ChallengeModel.findById(input.challengeId);
        if (!challenge) {
            throw new GraphQLError("Challenge not found");
        }
        // Verify all tasks exist
        const tasks = await TaskModel.find({ _id: { $in: input.taskIds } });
        if (tasks.length !== input.taskIds.length) {
            throw new GraphQLError("One or more tasks not found");
        }
        // Verify tasks match challenge topic and difficulty
        const invalidTasks = tasks.filter(task => task.topic !== challenge.topic || task.difficulty !== challenge.difficulty);
        if (invalidTasks.length > 0) {
            throw new GraphQLError("Some tasks don't match the challenge topic or difficulty");
        }
        // Update challenge with tasks
        const updatedChallenge = await ChallengeModel.findByIdAndUpdate(input.challengeId, { tasks: input.taskIds }, { new: true }).populate('tasks');
        if (!updatedChallenge) {
            throw new GraphQLError("Failed to update challenge");
        }
        return {
            id: updatedChallenge._id.toString(),
            topic: updatedChallenge.topic,
            difficulty: updatedChallenge.difficulty,
            challenger: updatedChallenge.challenger.toString(),
            opponent: updatedChallenge.opponent.toString(),
            participants: updatedChallenge.participants.map((p) => p.toString()),
            winner: (_a = updatedChallenge.winner) === null || _a === void 0 ? void 0 : _a.toString(),
            piPoints: updatedChallenge.piPoints,
            status: updatedChallenge.status,
            tasks: updatedChallenge.tasks.map(task => ({
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
            classType: updatedChallenge.classType,
            createdAt: updatedChallenge.createdAt,
            updatedAt: updatedChallenge.updatedAt,
        };
    }
    catch (error) {
        throw new GraphQLError(`Failed to assign tasks to challenge: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
