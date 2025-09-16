import { MutationResolvers, GenerateMultipleTasksInput } from "@/types/generated";
import { TaskGeneratorService } from "@/services/taskGenerator.service";
import { GraphQLError } from "graphql";

export const generateMultipleTasks: MutationResolvers["generateMultipleTasks"] = async (
  _: unknown,
  { input }: { input: GenerateMultipleTasksInput }
) => {
  try {
    if (input.piPoints < 1) {
      throw new GraphQLError("PiPoints must be at least 1");
    }

    const taskCount = input.taskCount;
    if (taskCount < 1 || taskCount > 20) {
      throw new GraphQLError("Task count must be between 1 and 20");
    }

    if (input.difficultyDistribution) {
      const { easy = 0, medium = 0, hard = 0 } = input.difficultyDistribution;
      const totalSpecified = easy + medium + hard;
      
      if (totalSpecified > 0 && totalSpecified !== taskCount) {
        throw new GraphQLError("Difficulty distribution total must equal task count");
      }
      
      if (easy < 0 || medium < 0 || hard < 0) {
        throw new GraphQLError("Difficulty counts cannot be negative");
      }
    }

    console.log(`🚀 Generating ${taskCount} tasks for topic: ${input.topic}`);
    if (input.difficultyDistribution) {
      console.log('📊 Difficulty distribution:', input.difficultyDistribution);
    }

    const generatedTasks = await TaskGeneratorService.generateMultipleTasks(input);

    console.log(`✅ Successfully generated ${generatedTasks.length} tasks`);
    return generatedTasks;
  } catch (error) {
    console.error('Error generating multiple tasks:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to generate multiple tasks: ${errorMessage}`);
  }
};
