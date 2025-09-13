import { TaskModel } from "@/models/Task.model";
import { AnswerModel } from "@/models/Answer.model";
import { AIService } from "@/services/ai.service";
import { GraphQLError } from "graphql";

export const generateTaskAnswer = async (
  _: unknown,
  { taskId }: { taskId: string }
) => {
  try {
    console.log(`🔍 Looking for task with ID: ${taskId}`);
    
    // Find the task by ID
    const task = await TaskModel.findById(taskId);
    
    if (!task) {
      throw new GraphQLError(`Task with ID ${taskId} not found`);
    }

    console.log(`✅ Found task: ${task.title}`);

    // Check if task already has an answer
    const existingAnswer = await AnswerModel.findOne({ taskId });
    if (existingAnswer) {
      console.log(`⚠️ Task ${taskId} already has an answer`);
      return {
        id: existingAnswer._id.toString(),
        taskId: existingAnswer.taskId,
        answer: existingAnswer.answer,
        solution: existingAnswer.solution,
        testCases: existingAnswer.testCases.map(tc => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          explanation: tc.explanation || undefined
        })),
        aiGenerated: existingAnswer.aiGenerated,
        generatedAt: existingAnswer.generatedAt,
        createdAt: existingAnswer.createdAt,
        updatedAt: existingAnswer.updatedAt
      };
    }

    // Generate answer using AI service
    console.log('🤖 Generating answer using AI service...');
    
    const answerData = await AIService.generateTaskAnswer({
      title: task.title,
      description: task.description,
      problemStatement: task.problemStatement || '',
      topic: task.topic,
      difficulty: task.difficulty,
      type: task.type
    });

    console.log('✅ AI service generated answer successfully');

    // Create a new answer document
    const newAnswer = new AnswerModel({
      taskId,
      answer: answerData.answer,
      solution: answerData.solution,
      testCases: answerData.testCases,
      aiGenerated: true,
      generatedAt: new Date()
    });

    const savedAnswer = await newAnswer.save();

    console.log(`🎉 Successfully generated answer for task: ${task.title}`);
    
    // Convert Mongoose document to GraphQL type
    return {
      id: savedAnswer._id.toString(),
      taskId: savedAnswer.taskId,
      answer: savedAnswer.answer,
      solution: savedAnswer.solution,
      testCases: savedAnswer.testCases.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        explanation: tc.explanation || undefined
      })),
      aiGenerated: savedAnswer.aiGenerated,
      generatedAt: savedAnswer.generatedAt,
      createdAt: savedAnswer.createdAt,
      updatedAt: savedAnswer.updatedAt
    };
  } catch (error) {
    console.error('Error generating task answer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to generate task answer: ${errorMessage}`);
  }
};
