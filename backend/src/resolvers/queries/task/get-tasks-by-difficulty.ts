import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";

export const tasksByDifficulty: any = async (_: any, { difficulty }: { difficulty: string }) => {
  try {
    console.log(`🔍 Looking for tasks with difficulty: ${difficulty}`);
    // The database stores values in uppercase, so use the difficulty as-is
    const tasks = await TaskModel.find({ difficulty: difficulty });
    console.log(`✅ Found ${tasks.length} tasks with difficulty ${difficulty}`);
    // Map _id to id and convert topic to uppercase for GraphQL response
    return tasks.map(task => ({
      ...task.toObject(),
      id: task._id.toString(),
      topic: task.topic?.toUpperCase().replace(/-/g, '_'),
    }));
  } catch (error) {
    console.error('Error fetching tasks by difficulty:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to fetch tasks by difficulty: ${errorMessage}`);
  }
};
