import { AnswerModel } from "@/models/Answer.model";
import { GraphQLError } from "graphql";

export const answer = async (
  _: unknown,
  { taskId }: { taskId: string }
) => {
  try {
    console.log(`🔍 Looking for answer with task ID: ${taskId}`);
    
    const answerDoc = await AnswerModel.findOne({ taskId });
    
    if (!answerDoc) {
      console.log(`⚠️ No answer found for task ID: ${taskId}`);
      return null;
    }

    console.log(`✅ Found answer for task ID: ${taskId}`);
    
    // Convert Mongoose document to GraphQL type
    return {
      id: answerDoc._id.toString(),
      taskId: answerDoc.taskId,
      answer: answerDoc.answer,
      solution: answerDoc.solution,
      testCases: answerDoc.testCases.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        explanation: tc.explanation || undefined
      })),
      aiGenerated: answerDoc.aiGenerated,
      generatedAt: answerDoc.generatedAt,
      createdAt: answerDoc.createdAt,
      updatedAt: answerDoc.updatedAt
    };
  } catch (error) {
    console.error('Error fetching answer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new GraphQLError(`Failed to fetch answer: ${errorMessage}`);
  }
};
