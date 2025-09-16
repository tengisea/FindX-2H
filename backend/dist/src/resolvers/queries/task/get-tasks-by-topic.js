import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";
export const tasksByTopic = async (_, { topic }) => {
    try {
        console.log(`🔍 Looking for tasks with topic: ${topic}`);
        // Convert GraphQL enum to database format (lowercase with hyphens)
        const dbTopic = topic.toLowerCase().replace(/_/g, '-');
        const tasks = await TaskModel.find({ topic: dbTopic });
        console.log(`✅ Found ${tasks.length} tasks with topic ${topic}`);
        // Map _id to id and convert topic to uppercase for GraphQL response
        return tasks.map(task => {
            var _a;
            return (Object.assign(Object.assign({}, task.toObject()), { id: task._id.toString(), topic: (_a = task.topic) === null || _a === void 0 ? void 0 : _a.toUpperCase().replace(/-/g, '_') }));
        });
    }
    catch (error) {
        console.error('Error fetching tasks by topic:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new GraphQLError(`Failed to fetch tasks by topic: ${errorMessage}`);
    }
};
