import { MutationResolvers, GenerateTaskInput } from "@/types/generated";
import { TaskGeneratorService } from "@/services/taskGenerator.service";
import { GraphQLError } from "graphql";

export const generateTask: MutationResolvers["generateTask"] = async (
  _: unknown,
  { input }: { input: GenerateTaskInput }
) => {
  try {
    if (input.piPoints < 1) {
      throw new GraphQLError("PiPoints must be at least 1");
    }

    const generatedTask = await TaskGeneratorService.generateTask({
      topic: input.topic,
      difficulty: input.difficulty,
      type: input.type,
      piPoints: input.piPoints
    });

    return generatedTask;
  } catch (error) {
    console.error('Error generating task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to generate task: ${errorMessage}`);
  }
};