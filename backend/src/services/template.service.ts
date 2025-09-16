import { getRandomTemplate } from "./taskstemplates";
import { getGradeAppropriateTemplate } from "./taskstemplates/grade-appropriate-templates";
import { GeneratedTaskResponse } from "./ai.service.new";
import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskClassType as GraphQLClassType } from "@/types/generated";

export interface TemplateGenerationRequest {
  topic: GraphQLTopic;
  difficulty: GraphQLDifficulty;
  classType?: GraphQLClassType;
}

export class TemplateService {
  static generateFromTemplate(request: TemplateGenerationRequest): GeneratedTaskResponse {
    console.log('📚 Using template system for topic:', request.topic, 'difficulty:', request.difficulty, 'grade:', request.classType);
    
    // Use grade-appropriate templates for all allowed topics
    if (request.classType && this.isAllowedTopic(request.topic)) {
      const topicString = this.mapTopicToString(request.topic);
      const template = getGradeAppropriateTemplate(topicString, this.mapDifficultyToString(request.difficulty), request.classType);
      console.log('🎯 Selected grade-appropriate template:', template.title);
      return template;
    }
    
    // Fallback to original template system for other topics
    const topicString = this.mapTopicToString(request.topic);
    const difficultyString = this.mapDifficultyToString(request.difficulty);
    
    const template = getRandomTemplate(topicString, difficultyString);
    console.log('🎯 Selected template:', template.title);
    
    return template;
  }

  static generateUniqueTemplate(request: TemplateGenerationRequest, usedTemplates: Set<string>): GeneratedTaskResponse {
    console.log('📚 Using unique template system for topic:', request.topic, 'difficulty:', request.difficulty, 'grade:', request.classType);
    
    // Use grade-appropriate templates for all allowed topics
    if (request.classType && this.isAllowedTopic(request.topic)) {
      const topicString = this.mapTopicToString(request.topic);
      let attempts = 0;
      const maxAttempts = 20;
      
      while (attempts < maxAttempts) {
        const template = getGradeAppropriateTemplate(topicString, this.mapDifficultyToString(request.difficulty), request.classType);
        const templateKey = `${template.title}-${template.description}`;
        
        if (!usedTemplates.has(templateKey)) {
          usedTemplates.add(templateKey);
          console.log('🎯 Selected unique grade-appropriate template:', template.title);
          return template;
        }
        
        attempts++;
      }
      
      console.log('⚠️ Could not find unique grade-appropriate template, returning any available template');
      const template = getGradeAppropriateTemplate(topicString, this.mapDifficultyToString(request.difficulty), request.classType);
      console.log('🎯 Selected fallback grade-appropriate template:', template.title);
      return template;
    }
    
    // Fallback to original template system for other topics
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

  private static isAllowedTopic(topic: GraphQLTopic): boolean {
    const allowedTopics = [
      GraphQLTopic.Math,
      GraphQLTopic.English,
      GraphQLTopic.History,
      GraphQLTopic.Biology,
      GraphQLTopic.Physics,
      GraphQLTopic.Chemistry,
      GraphQLTopic.Linguistics
    ];
    return allowedTopics.includes(topic);
  }

  private static mapTopicToString(topic: GraphQLTopic): string {
    switch (topic) {
      case GraphQLTopic.Math:
        return 'math';
      case GraphQLTopic.English:
        return 'english';
      case GraphQLTopic.History:
        return 'history';
      case GraphQLTopic.Biology:
        return 'biology';
      case GraphQLTopic.Physics:
        return 'physics';
      case GraphQLTopic.Chemistry:
        return 'chemistry';
      case GraphQLTopic.Linguistics:
        return 'linguistics';
      default:
        return 'math';
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
