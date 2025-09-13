import { getRandomTemplate } from "./taskstemplates";
import { GeneratedTaskResponse } from "./ai.service";
import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty } from "@/types/generated";

export interface TemplateGenerationRequest {
  topic: GraphQLTopic;
  difficulty: GraphQLDifficulty;
}

export class TemplateService {
  static generateFromTemplate(request: TemplateGenerationRequest): GeneratedTaskResponse {
    console.log('📚 Using template system for topic:', request.topic, 'difficulty:', request.difficulty);
    
    const topicString = this.mapTopicToString(request.topic);
    const difficultyString = this.mapDifficultyToString(request.difficulty);
    
    const template = getRandomTemplate(topicString, difficultyString);
    
    console.log('🎯 Selected template:', template.title);
    
    return template;
  }

  static generateUniqueTemplate(request: TemplateGenerationRequest, usedTemplates: Set<string>): GeneratedTaskResponse {
    console.log('📚 Using unique template system for topic:', request.topic, 'difficulty:', request.difficulty);
    
    const topicString = this.mapTopicToString(request.topic);
    const difficultyString = this.mapDifficultyToString(request.difficulty);
    
    let attempts = 0;
    const maxAttempts = 20;
    
    while (attempts < maxAttempts) {
      const template = getRandomTemplate(topicString, difficultyString);
      const templateKey = `${template.title}-${template.description}`;
      
      if (!usedTemplates.has(templateKey)) {
        usedTemplates.add(templateKey);
        console.log('🎯 Selected unique template:', template.title);
        return template;
      }
      
      attempts++;
    }
    
    console.log('⚠️ Could not find unique template, returning any available template');
    const template = getRandomTemplate(topicString, difficultyString);
    console.log('🎯 Selected fallback template:', template.title);
    return template;
  }

  private static mapTopicToString(topic: GraphQLTopic): string {
    switch (topic) {
      case GraphQLTopic.Algorithms:
        return 'algorithms';
      case GraphQLTopic.DataStructures:
        return 'data-structures';
      case GraphQLTopic.Math:
        return 'math';
      case GraphQLTopic.String:
        return 'string';
      case GraphQLTopic.Graph:
        return 'graph';
      case GraphQLTopic.DynamicProgramming:
        return 'dynamic-programming';
      case GraphQLTopic.Greedy:
        return 'greedy';
      case GraphQLTopic.English:
        return 'english';
      case GraphQLTopic.TextProcessing:
        return 'text-processing';
      case GraphQLTopic.Chemistry:
        return 'chemistry';
      case GraphQLTopic.Biology:
        return 'biology';
      case GraphQLTopic.Physics:
        return 'physics';
      case GraphQLTopic.ComputerScience:
        return 'computer-science';
      case GraphQLTopic.Astronomy:
        return 'astronomy';
      case GraphQLTopic.EarthScience:
        return 'earth-science';
      case GraphQLTopic.Linguistics:
        return 'linguistics';
      case GraphQLTopic.Philosophy:
        return 'philosophy';
      case GraphQLTopic.History:
        return 'history';
      case GraphQLTopic.Geography:
        return 'geography';
      case GraphQLTopic.Economics:
        return 'economics';
      default:
        return 'algorithms';
    }
  }

  private static mapDifficultyToString(difficulty: GraphQLDifficulty): string {
    switch (difficulty) {
      case GraphQLDifficulty.Easy:
        return 'EASY';
      case GraphQLDifficulty.Medium:
        return 'MEDIUM';
      case GraphQLDifficulty.Hard:
        return 'HARD';
      default:
        return 'EASY';
    }
  }
}
