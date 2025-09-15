import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, ClassType as GraphQLClassType } from "@/types/generated";

export class AIMappers {
  static mapTopicToString(topic: GraphQLTopic): string {
    switch (topic) {
      case GraphQLTopic.Math:
        return 'mathematics';
      case GraphQLTopic.English:
        return 'English language learning';
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
        return 'mathematics';
    }
  }

  static mapDifficultyToString(difficulty: GraphQLDifficulty): string {
    switch (difficulty) {
      case GraphQLDifficulty.Easy:
        return 'easy';
      case GraphQLDifficulty.Medium:
        return 'medium';
      case GraphQLDifficulty.Hard:
        return 'hard';
      default:
        return 'easy';
    }
  }

  static mapClassTypeToString(classType: GraphQLClassType): string {
    switch (classType) {
      case GraphQLClassType.Grade_1:
        return 'Grade 1';
      case GraphQLClassType.Grade_2:
        return 'Grade 2';
      case GraphQLClassType.Grade_3:
        return 'Grade 3';
      case GraphQLClassType.Grade_4:
        return 'Grade 4';
      case GraphQLClassType.Grade_5:
        return 'Grade 5';
      case GraphQLClassType.Grade_6:
        return 'Grade 6';
      case GraphQLClassType.Grade_7:
        return 'Grade 7';
      case GraphQLClassType.Grade_8:
        return 'Grade 8';
      case GraphQLClassType.Grade_9:
        return 'Grade 9';
      case GraphQLClassType.Grade_10:
        return 'Grade 10';
      case GraphQLClassType.Grade_11:
        return 'Grade 11';
      case GraphQLClassType.Grade_12:
        return 'Grade 12';
      default:
        return 'Grade 5';
    }
  }

  /**
   * Get topic-specific content descriptions for different grade levels
   */
  static getTopicContentByGrade(topic: GraphQLTopic, gradeRange: string): string {
    const topicContentMap: Record<GraphQLTopic, Record<string, string>> = {
      [GraphQLTopic.Math]: {
        '1-3': 'basic counting, simple addition, basic subtraction, number recognition',
        '4-5': 'multiplication, division, fractions, basic geometry',
        '6-8': 'algebra basics, geometry, statistics, basic problem solving',
        '9-12': 'advanced algebra, calculus, trigonometry, complex problem solving'
      },
      [GraphQLTopic.English]: {
        '1-3': 'letter recognition, basic reading, simple sentences, vocabulary',
        '4-5': 'grammar basics, reading comprehension, creative writing, spelling',
        '6-8': 'literature analysis, essay writing, advanced grammar, poetry',
        '9-12': 'advanced literature, critical analysis, advanced writing, rhetoric'
      },
      [GraphQLTopic.History]: {
        '1-3': 'basic historical events, famous people, simple timelines',
        '4-5': 'historical periods, important events, basic historical concepts',
        '6-8': 'historical analysis, cause and effect, historical research',
        '9-12': 'advanced history, historical methodology, complex historical analysis'
      },
      [GraphQLTopic.Biology]: {
        '1-3': 'basic life concepts, simple plants, basic animals',
        '4-5': 'basic biology, simple ecosystems, basic life processes',
        '6-8': 'cell biology, genetics, evolution, ecosystems',
        '9-12': 'advanced biology, molecular biology, ecology, biotechnology'
      },
      [GraphQLTopic.Physics]: {
        '1-3': 'basic motion, simple forces, basic energy concepts',
        '4-5': 'basic physics, simple machines, basic energy',
        '6-8': 'mechanics, electricity, magnetism, basic thermodynamics',
        '9-12': 'advanced physics, quantum mechanics, relativity, modern physics'
      },
      [GraphQLTopic.Chemistry]: {
        '1-3': 'basic materials, simple properties, basic changes',
        '4-5': 'basic chemistry, simple reactions, basic elements',
        '6-8': 'atomic structure, chemical reactions, periodic table',
        '9-12': 'advanced chemistry, organic chemistry, physical chemistry'
      },
      [GraphQLTopic.Linguistics]: {
        '1-3': 'basic language concepts, simple word patterns, basic communication',
        '4-5': 'basic linguistics, simple language analysis, basic communication',
        '6-8': 'linguistics basics, language analysis, basic communication theory',
        '9-12': 'advanced linguistics, language theory, complex communication systems'
      }
    };

    return topicContentMap[topic]?.[gradeRange] || 'basic concepts appropriate for the grade level';
  }

  /**
   * Get allowed topics for each grade range
   */
  static getAllowedTopicsByGrade(gradeRange: string): GraphQLTopic[] {
    const allowedTopicsByGrade: Record<string, GraphQLTopic[]> = {
      '1-3': [GraphQLTopic.Math, GraphQLTopic.English],
      '4-5': [GraphQLTopic.Math, GraphQLTopic.English, GraphQLTopic.History],
      '6-8': [GraphQLTopic.Math, GraphQLTopic.English, GraphQLTopic.History, GraphQLTopic.Biology, GraphQLTopic.Physics, GraphQLTopic.Chemistry],
      '9-12': Object.values(GraphQLTopic) // All topics allowed for high school
    };

    return allowedTopicsByGrade[gradeRange] || [];
  }

  /**
   * Get a default appropriate topic for a grade range
   */
  static getDefaultTopicForGrade(gradeRange: string): GraphQLTopic {
    switch (gradeRange) {
      case '1-3':
        return GraphQLTopic.Math; // Math is always appropriate for young kids
      case '4-5':
        return GraphQLTopic.English; // English is engaging and appropriate
      case '6-8':
        return GraphQLTopic.Biology; // Intro to science
      case '9-12':
        return GraphQLTopic.Physics; // Default to physics for high school
      default:
        return GraphQLTopic.Math;
    }
  }

  /**
   * Validate if a topic is appropriate for a grade level
   */
  static validateTopicForGrade(topic: GraphQLTopic, classType: GraphQLClassType): boolean {
    const gradeNumber = this.getGradeNumber(classType);
    const gradeRange = this.getGradeRange(gradeNumber);
    const allowedTopics = this.getAllowedTopicsByGrade(gradeRange);
    
    return allowedTopics.includes(topic);
  }

  /**
   * Get grade number from class type
   */
  static getGradeNumber(classType: GraphQLClassType): number {
    switch (classType) {
      case GraphQLClassType.Grade_1: return 1;
      case GraphQLClassType.Grade_2: return 2;
      case GraphQLClassType.Grade_3: return 3;
      case GraphQLClassType.Grade_4: return 4;
      case GraphQLClassType.Grade_5: return 5;
      case GraphQLClassType.Grade_6: return 6;
      case GraphQLClassType.Grade_7: return 7;
      case GraphQLClassType.Grade_8: return 8;
      case GraphQLClassType.Grade_9: return 9;
      case GraphQLClassType.Grade_10: return 10;
      case GraphQLClassType.Grade_11: return 11;
      case GraphQLClassType.Grade_12: return 12;
      default: return 5;
    }
  }

  /**
   * Get grade range from grade number
   */
  static getGradeRange(gradeNumber: number): string {
    if (gradeNumber <= 3) return '1-3';
    if (gradeNumber <= 5) return '4-5';
    if (gradeNumber <= 8) return '6-8';
    return '9-12';
  }

  /**
   * Validate topic for grade and return appropriate topic
   */
  static getValidatedTopic(topic: GraphQLTopic, classType: GraphQLClassType): GraphQLTopic {
    if (this.validateTopicForGrade(topic, classType)) {
      return topic;
    }
    // Return a default appropriate topic for the grade
    const gradeNumber = this.getGradeNumber(classType);
    const gradeRange = this.getGradeRange(gradeNumber);
    return this.getDefaultTopicForGrade(gradeRange);
  }

  /**
   * Map task type to string
   */
  static mapTaskTypeToString(type: any): string {
    switch (type) {
      case 'CHALLENGE':
        return 'Challenge';
      case 'TOURNAMENT':
        return 'Tournament';
      default:
        return 'Challenge';
    }
  }

  /**
   * Get age-appropriate topic description
   */
  static getAgeAppropriateTopic(topic: GraphQLTopic, classType: GraphQLClassType): string {
    const gradeNumber = this.getGradeNumber(classType);
    const gradeRange = this.getGradeRange(gradeNumber);
    return this.getTopicContentByGrade(topic, gradeRange);
  }
}