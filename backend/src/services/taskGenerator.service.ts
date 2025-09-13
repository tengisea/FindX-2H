import { Task, Difficulty as GraphQLDifficulty } from "@/types/generated";
import { AIService, AIGenerationRequest, GeneratedTaskResponse } from "./ai.service";
import { TemplateService, TemplateGenerationRequest } from "./template.service";
import { TaskUtilsService, TaskGenerationRequest, MultipleTaskGenerationRequest } from "./task-utils.service";

export class TaskGeneratorService {
  static async generateMultipleTasks(request: MultipleTaskGenerationRequest): Promise<Task[]> {
    console.log('🎯 Starting multiple task generation...', { 
      taskCount: request.taskCount, 
      difficultyDistribution: request.difficultyDistribution 
    });
    
    const taskCount = Math.min(Math.max(request.taskCount, 1), 20); // Increased limit to 20
    console.log(`📊 Generating ${taskCount} tasks for topic: ${request.topic}`);
    
    const difficultyDistribution = TaskUtilsService.calculateDifficultyDistribution(
      taskCount, 
      request.difficultyDistribution
    );
    
    console.log('📈 Difficulty distribution:', difficultyDistribution);
    
    const tasks: Task[] = [];
    const usedTemplates = new Set<string>();
    
    // Generate tasks for each difficulty level
    for (const { difficulty, count } of difficultyDistribution) {
      if (count === 0) continue;
      
      console.log(`🔄 Generating ${count} ${difficulty} tasks...`);
      
      for (let i = 0; i < count; i++) {
        try {
          const aiRequest: AIGenerationRequest = {
            topic: request.topic,
            difficulty: difficulty,
            type: request.type,
            piPoints: request.piPoints
          };
          
          const generatedContent = await AIService.generateTask(aiRequest);
          
          const taskDoc = await TaskUtilsService.createTaskInDatabase(
            generatedContent,
            { ...request, difficulty },
            true
          );

          console.log('💾 Task saved to database with AI generation');
          const task = TaskUtilsService.transformToGraphQLTask(taskDoc, difficulty, request.topic);
          tasks.push(task);
          
          if (i < count - 1) {
            console.log('⏳ Waiting 5 seconds to avoid rate limiting...');
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
          
        } catch (error) {
          console.error('❌ AI generation failed for task, falling back to templates:', error);
          
          if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
            console.log('⏳ Rate limit exceeded, waiting 5 seconds before trying again...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            try {
              const aiRequest: AIGenerationRequest = {
                topic: request.topic,
                difficulty: difficulty,
                type: request.type,
                piPoints: request.piPoints
              };
              
              const generatedContent = await AIService.generateTask(aiRequest);
              const taskDoc = await TaskUtilsService.createTaskInDatabase(
                generatedContent,
                { ...request, difficulty },
                true
              );
              const task = TaskUtilsService.transformToGraphQLTask(taskDoc, difficulty, request.topic);
              tasks.push(task);
              continue;
            } catch (retryError) {
              console.error('❌ AI generation failed again after retry, using templates');
            }
          }
          
          const templateRequest: TemplateGenerationRequest = {
            topic: request.topic,
            difficulty: difficulty
          };
          
          const fallbackContent = TemplateService.generateUniqueTemplate(templateRequest, usedTemplates);
          const fallbackTask = await this.createFallbackTask({ ...request, difficulty }, fallbackContent);
          tasks.push(fallbackTask);
        }
      }
    }
    
    console.log(`🎉 Successfully generated ${tasks.length} tasks`);
    return tasks;
  }

  static async generateTask(request: TaskGenerationRequest): Promise<Task> {
    try {
      console.log('🤖 Starting AI task generation...');
      
      const aiRequest: AIGenerationRequest = {
        topic: request.topic,
        difficulty: request.difficulty,
        type: request.type,
        piPoints: request.piPoints
      };
      
      const generatedContent = await AIService.generateTask(aiRequest);
      
      const taskDoc = await TaskUtilsService.createTaskInDatabase(
        generatedContent,
        request,
        true
      );

      console.log('💾 Task saved to database with AI generation');
      return TaskUtilsService.transformToGraphQLTask(taskDoc, request.difficulty, request.topic);
    } catch (error) {
      console.error('❌ AI generation failed, falling back to templates:', error);
      const templateRequest: TemplateGenerationRequest = {
        topic: request.topic,
        difficulty: request.difficulty
      };
      
      const fallbackContent = TemplateService.generateFromTemplate(templateRequest);
      return this.createFallbackTask(request, fallbackContent);
    }
  }

  private static async createFallbackTask(request: TaskGenerationRequest, content: GeneratedTaskResponse): Promise<Task> {
    const taskDoc = await TaskUtilsService.createTaskInDatabase(
      content,
      request,
      false
    );

    return TaskUtilsService.transformToGraphQLTask(taskDoc, request.difficulty, request.topic);
  }
}