import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";

export const tasks: any = async () => {
  try {
    const tasks = await TaskModel.find();
    // Convert lowercase database values to uppercase for GraphQL and map _id to id
    return tasks.map(task => ({
      ...task.toObject(),
      id: task._id.toString(),
      topic: task.topic?.toUpperCase(),
      difficulty: task.difficulty?.toUpperCase(),
      type: task.type?.toUpperCase(),
    }));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to fetch tasks: ${errorMessage}`);
  }
};
