import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";
export const tasks = async () => {
    try {
        const tasks = await TaskModel.find();
        // Convert lowercase database values to uppercase for GraphQL and map _id to id
        return tasks.map(task => {
            var _a, _b, _c;
            return (Object.assign(Object.assign({}, task.toObject()), { id: task._id.toString(), topic: (_a = task.topic) === null || _a === void 0 ? void 0 : _a.toUpperCase(), difficulty: (_b = task.difficulty) === null || _b === void 0 ? void 0 : _b.toUpperCase(), type: (_c = task.type) === null || _c === void 0 ? void 0 : _c.toUpperCase() }));
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new GraphQLError(`Failed to fetch tasks: ${errorMessage}`);
    }
};
