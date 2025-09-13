import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";

export const tasksByDifficulty: any = async (_: any, { difficulty }: { difficulty: string }) => {
  try {
    // Convert uppercase GraphQL input to lowercase for database query
    const tasks = await TaskModel.find({ difficulty: difficulty.toLowerCase() });
    // Convert lowercase database values to uppercase for GraphQL response and map _id to id
    return tasks.map(task => ({
      ...task.toObject(),
      id: task._id.toString(),
      topic: task.topic?.toUpperCase(),
      difficulty: task.difficulty?.toUpperCase(),
      type: task.type?.toUpperCase(),
    }));
  } catch (error) {
    console.error('Error fetching tasks by difficulty:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to fetch tasks by difficulty: ${errorMessage}`);
  }
};
