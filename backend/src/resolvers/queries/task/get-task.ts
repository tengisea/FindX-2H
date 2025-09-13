import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";

export const task: any = async (_: any, { id }: { id: string }) => {
  try {
    const task = await TaskModel.findById(id);
    if (task) {
      return {
        ...task.toObject(),
        id: task._id.toString(),
        topic: task.topic?.toUpperCase(),
        difficulty: task.difficulty?.toUpperCase(),
        type: task.type?.toUpperCase(),
      };
    }
    return task;
  } catch (error) {
    console.error('Error fetching task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to fetch task: ${errorMessage}`);
  }
};
