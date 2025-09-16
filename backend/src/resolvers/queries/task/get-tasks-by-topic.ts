import { TaskModel } from "@/models";
import { GraphQLError } from "graphql";

export const tasksByTopic: any = async (_: any, { topic }: { topic: string }) => {
  try {
    console.log(`🔍 Looking for tasks with topic: ${topic}`);
    // Convert GraphQL enum to database format (lowercase with hyphens)
    const dbTopic = topic.toLowerCase().replace(/_/g, '-');
    const tasks = await TaskModel.find({ topic: dbTopic });
    console.log(`✅ Found ${tasks.length} tasks with topic ${topic}`);
    // Map _id to id and convert topic to uppercase for GraphQL response
    return tasks.map(task => ({
      ...task.toObject(),
      id: task._id.toString(),
      topic: task.topic?.toUpperCase().replace(/-/g, '_'),
    }));
  } catch (error) {
    console.error('Error fetching tasks by topic:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to fetch tasks by topic: ${errorMessage}`);
  }
};
