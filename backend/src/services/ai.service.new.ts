import { AIGenerationRequest, GeneratedTaskResponse, GeneratedAnswerResponse, TaskData } from "./ai.types";
import { AIPrompts } from "./ai.prompts";
import { AIClient } from "./ai.client";
import { AIParser } from "./ai.parser";

export type { AIGenerationRequest, GeneratedTaskResponse, GeneratedAnswerResponse } from "./ai.types";

export class AIService {
  static async generateTask(request: AIGenerationRequest): Promise<GeneratedTaskResponse> {
    try {
      console.log('🤖 Starting AI task generation...');
      
      const prompt = AIPrompts.buildTaskPrompt(request);
      console.log('📝 Generated prompt for AI service');
      
      const response = await AIClient.callOpenAI(prompt);
      console.log('✅ AI service responded successfully');
      
      const generatedContent = AIParser.parseTaskResponse(response);
      console.log('📋 Parsed AI response:', { title: generatedContent.title });
      
      return generatedContent;
    } catch (error) {
      console.error('❌ AI generation failed:', error);
      throw error;
    }
  }

  static async generateTaskAnswer(taskData: TaskData): Promise<GeneratedAnswerResponse> {
    try {
      console.log('🤖 Starting AI answer generation...');
      
      const prompt = AIPrompts.buildAnswerPrompt(taskData);
      console.log('📝 Generated answer prompt for AI service');
      
      const response = await AIClient.callOpenAIForAnswer(prompt);
      console.log('✅ AI service responded successfully');
      
      const generatedContent = AIParser.parseAnswerResponse(response);
      console.log('📋 Parsed AI answer response');
      
      return generatedContent;
    } catch (error) {
      console.error('❌ AI answer generation failed:', error);
      throw error;
    }
  }

  static async generateAnswer(prompt: string): Promise<string> {
    try {
      console.log('🤖 Starting AI answer generation...');
      
      const response = await AIClient.callOpenAIForAnswer(prompt);
      console.log('✅ AI service responded successfully');
      
      return response;
    } catch (error) {
      console.error('❌ AI answer generation failed:', error);
      throw error;
    }
  }
}
