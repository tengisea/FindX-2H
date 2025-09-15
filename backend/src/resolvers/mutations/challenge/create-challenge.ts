import { GraphQLError } from "graphql";
import { ChallengeModel } from "@/models";
import { TaskGeneratorService } from "@/services/taskGenerator.service";
import { AnswerGeneratorService } from "@/services/answer-generator.service";
import { AnswerModel } from "@/models/Answer.model";
import { AIMappers } from "@/services/ai.mappers";
import { MutationResolvers, ChallengeInput, TaskType, AnswerFormat, AnswerFormatDistribution, ChallengeAnswerFormat } from "@/types/generated";

export const createChallenge: MutationResolvers["createChallenge"] = async (
  _: unknown,
  { input }: { input: ChallengeInput }
) => {
  try {
    console.log(`🚀 Creating challenge with auto-task generation...`);
    console.log(`📊 Challenge params: topic=${input.topic}, difficulty=${input.difficulty}, classType=${input.classType}, taskCount=${input.taskCount}`);

    // Validate task count (limited to 3 for OpenAI API limits)
    if (input.taskCount < 1 || input.taskCount > 3) {
      throw new GraphQLError("Task count must be between 1 and 3 (limited due to OpenAI API constraints)");
    }

    // Validate task difficulty distribution logic
    if (input.taskDifficultyDistribution) {
      const { easy = 0, medium = 0, hard = 0 } = input.taskDifficultyDistribution;
      const totalDistributedTasks = easy + medium + hard;
      
      if (totalDistributedTasks !== input.taskCount) {
        throw new GraphQLError(`Task difficulty distribution mismatch: taskCount is ${input.taskCount} but difficulty distribution adds up to ${totalDistributedTasks}. Please ensure they match.`);
      }
    }

    // Validate ObjectIds
    if (!input.challenger || input.challenger.trim() === "") {
      throw new GraphQLError("Challenger ID is required and must be a valid ObjectId");
    }
    if (!input.opponent || input.opponent.trim() === "") {
      throw new GraphQLError("Opponent ID is required and must be a valid ObjectId");
    }


    // Validate topic is appropriate for the grade level
    if (!AIMappers.validateTopicForGrade(input.topic, input.classType)) {
      const gradeNumber = AIMappers.getGradeNumber(input.classType);
      let allowedTopics: string;
      
      if (gradeNumber <= 3) {
        allowedTopics = "MATH, ENGLISH, GEOGRAPHY";
      } else if (gradeNumber <= 5) {
        allowedTopics = "MATH, ENGLISH, GEOGRAPHY, HISTORY, EARTH_SCIENCE";
      } else if (gradeNumber <= 8) {
        allowedTopics = "MATH, ENGLISH, GEOGRAPHY, HISTORY, EARTH_SCIENCE, PHYSICS, CHEMISTRY, BIOLOGY, COMPUTER_SCIENCE, ALGORITHMS, DATA_STRUCTURES";
      } else {
        allowedTopics = "All topics are allowed";
      }
      
      throw new GraphQLError(`Topic ${input.topic} is not appropriate for Grade ${gradeNumber}. Allowed topics for this grade: ${allowedTopics}`);
    }

    // Generate tasks automatically based on challenge parameters
    const taskCount = input.taskCount;
    const piPointsPerTask = input.piPoints ? Math.floor(input.piPoints / taskCount) : 10; // Distribute pi points across tasks

    console.log(`🤖 Generating ${taskCount} tasks for challenge...`);
    

    // Use the answer format distribution system
    let generatedTasks;
    if (input.answerFormatDistribution) {
      // Map ChallengeAnswerFormat to AnswerFormat for distribution
      const mapChallengeFormatToAnswerFormat = (format: string): AnswerFormat => {
        switch (format) {
          case "MULTIPLE_CHOICE": return AnswerFormat.MultipleChoice;
          case "SHORT_TEXT": return AnswerFormat.ShortText;
          default: return AnswerFormat.MultipleChoice;
        }
      };

      // Map ChallengeAnswerFormat to AnswerFormat for the task generation service
      const mapToAnswerFormatDistribution = (dist: AnswerFormatDistribution): any => ({
        easy: dist.easy ? mapChallengeFormatToAnswerFormat(dist.easy) : undefined,
        medium: dist.medium ? mapChallengeFormatToAnswerFormat(dist.medium) : undefined,
        hard: dist.hard ? mapChallengeFormatToAnswerFormat(dist.hard) : undefined
      });
      
      const answerFormatDistribution = mapToAnswerFormatDistribution(input.answerFormatDistribution);

      generatedTasks = await TaskGeneratorService.generateMultipleTasksWithFormatOptions({
        topic: input.topic,
        type: TaskType.Challenge,
        classType: input.classType,
        piPoints: piPointsPerTask,
        taskCount: taskCount,
        difficultyDistribution: input.taskDifficultyDistribution || {
          // Distribute tasks based on the challenge difficulty
          easy: input.difficulty === "EASY" ? taskCount : Math.floor(taskCount * 0.3),
          medium: input.difficulty === "MEDIUM" ? taskCount : Math.floor(taskCount * 0.5),
          hard: input.difficulty === "HARD" ? taskCount : Math.floor(taskCount * 0.2)
        }
      }, answerFormatDistribution);
    } else {
      // Fallback: Use default MULTIPLE_CHOICE format
      generatedTasks = await TaskGeneratorService.generateMultipleTasks({
        topic: input.topic,
        type: TaskType.Challenge,
        classType: input.classType,
        piPoints: piPointsPerTask,
        taskCount: taskCount,
        answerFormat: AnswerFormat.MultipleChoice,
        difficultyDistribution: {
          // Distribute tasks based on the challenge difficulty
          easy: input.difficulty === "EASY" ? taskCount : Math.floor(taskCount * 0.3),
          medium: input.difficulty === "MEDIUM" ? taskCount : Math.floor(taskCount * 0.5),
          hard: input.difficulty === "HARD" ? taskCount : Math.floor(taskCount * 0.2)
        }
      });
    }

    console.log(`✅ Generated ${generatedTasks.length} tasks successfully`);

    // Generate answers for each task
    console.log(`🤖 Auto-generating answers for ${generatedTasks.length} tasks...`);
    for (const task of generatedTasks) {
      try {
        // Map model types to GraphQL types
        const { topic, classType } = AnswerGeneratorService.mapModelToGraphQLTypes(
          task.topic as string, 
          task.classType as any
        );
        
        const answerData = await AnswerGeneratorService.generateAnswerFormat({
          topic,
          classType,
          title: task.title,
          description: task.description,
          problemStatement: task.problemStatement || ''
        });

        // Save answer to database
        const newAnswer = new AnswerModel({
          taskId: task.id,
          answer: answerData.answer,
          solution: answerData.solution,
          testCases: answerData.testCases,
          answerValidation: answerData.answerValidation,
          aiGenerated: true,
          generatedAt: new Date()
        });

        await newAnswer.save();
        console.log(`✅ Answer generated for task: ${task.title}`);
      } catch (answerError) {
        console.error(`⚠️ Failed to generate answer for task ${task.title}:`, answerError);
        // Continue with other tasks even if one fails
      }
    }

    // Create challenge with generated tasks
    const challenge = await ChallengeModel.create({
      topic: input.topic.toLowerCase(),
      difficulty: input.difficulty,
      challenger: input.challenger,
      opponent: input.opponent,
      participants: [input.challenger, input.opponent],
      tasks: generatedTasks.map(task => task.id), // Use the generated task IDs
      classType: input.classType,
      piPoints: input.piPoints || (piPointsPerTask * taskCount),
      status: "PENDING"
    });

    console.log(`🎉 Challenge created successfully with ID: ${challenge._id} and ${generatedTasks.length} tasks with answers`);

    return challenge._id.toString();
  } catch (error) {
    console.error('❌ Error creating challenge:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to create challenge: ${errorMessage}`);
  }
};
