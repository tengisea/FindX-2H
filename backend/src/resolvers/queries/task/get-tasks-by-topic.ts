import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";

export const tasksByTopic: any = async (_: any, { topic }: { topic: string }) => {
  try {
    // Convert uppercase GraphQL input to lowercase for database query
    const tasks = await TaskModel.find({ topic: topic.toLowerCase() });
    // Convert lowercase database values to uppercase for GraphQL response and map _id to id
    return tasks.map(task => ({
      ...task.toObject(),
      id: task._id.toString(),
      topic: task.topic?.toUpperCase(),
      difficulty: task.difficulty?.toUpperCase(),
      type: task.type?.toUpperCase(),
    }));
  } catch (error) {
    console.error('Error fetching tasks by topic:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to fetch tasks by topic: ${errorMessage}`);
  }
};
