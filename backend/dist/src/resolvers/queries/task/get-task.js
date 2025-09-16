import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";
export const task = async (_, { id }) => {
    var _a, _b, _c;
    try {
        const task = await TaskModel.findById(id);
        if (task) {
            return Object.assign(Object.assign({}, task.toObject()), { id: task._id.toString(), topic: (_a = task.topic) === null || _a === void 0 ? void 0 : _a.toUpperCase(), difficulty: (_b = task.difficulty) === null || _b === void 0 ? void 0 : _b.toUpperCase(), type: (_c = task.type) === null || _c === void 0 ? void 0 : _c.toUpperCase() });
        }
        return task;
    }
    catch (error) {
        console.error('Error fetching task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new GraphQLError(`Failed to fetch task: ${errorMessage}`);
    }
};
