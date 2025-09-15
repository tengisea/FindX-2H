import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType, ClassType as GraphQLClassType } from "@/types/generated";
import { TopicMappings, TopicMapping } from "./ai.types";

export class AIMappers {
  static mapTopicToString(topic: GraphQLTopic): string {
    switch (topic) {
      case GraphQLTopic.Algorithms:
        return 'algorithms';
      case GraphQLTopic.DataStructures:
        return 'data structures';
      case GraphQLTopic.Math:
        return 'mathematics';
      case GraphQLTopic.String:
        return 'string manipulation';
      case GraphQLTopic.Graph:
        return 'graph theory';
      case GraphQLTopic.DynamicProgramming:
        return 'dynamic programming';
      case GraphQLTopic.Greedy:
        return 'greedy algorithms';
      case GraphQLTopic.English:
        return 'English language learning';
      case GraphQLTopic.TextProcessing:
        return 'text processing';
      case GraphQLTopic.Chemistry:
        return 'chemistry';
      case GraphQLTopic.Biology:
        return 'biology';
      case GraphQLTopic.Physics:
        return 'physics';
      case GraphQLTopic.ComputerScience:
        return 'computer science';
      case GraphQLTopic.Astronomy:
        return 'astronomy';
      case GraphQLTopic.EarthScience:
        return 'earth science';
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

  static mapDifficultyToString(difficulty: GraphQLDifficulty): string {
    switch (difficulty) {
      case GraphQLDifficulty.Easy:
        return 'Easy';
      case GraphQLDifficulty.Medium:
        return 'Medium';
      case GraphQLDifficulty.Hard:
        return 'Hard';
      default:
        return 'Easy';
    }
  }

  static mapTaskTypeToString(type: GraphQLTaskType): string {
    switch (type) {
      case GraphQLTaskType.Challenge:
        return 'Challenge';
      case GraphQLTaskType.Tournament:
        return 'Tournament';
      default:
        return 'Challenge';
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

  static getGradeRange(gradeNumber: number): string {
    if (gradeNumber <= 3) return '1-3';
    if (gradeNumber <= 5) return '4-5';
    if (gradeNumber <= 8) return '6-8';
    return '9-12';
  }

  static getTopicMappings(): TopicMappings {
    return {
      [GraphQLTopic.Biology]: {
        '1-3': 'basic animal and plant concepts, colors, shapes, simple nature observations',
        '4-5': 'simple living things, basic plant and animal features, nature basics',
        '6-8': 'basic biology concepts, simple life processes, basic classification',
        '9-12': 'full biology topics: cells, genetics, ecosystems, evolution'
      },
      [GraphQLTopic.Chemistry]: {
        '1-3': 'basic materials, colors, simple properties, mixing colors',
        '4-5': 'simple materials and properties, basic experiments',
        '6-8': 'basic chemistry concepts, simple reactions, elements',
        '9-12': 'full chemistry: atoms, molecules, reactions, periodic table'
      },
      [GraphQLTopic.Physics]: {
        '1-3': 'basic movement, simple machines, light and dark',
        '4-5': 'simple forces, basic energy concepts, simple experiments',
        '6-8': 'basic physics: motion, forces, energy, simple mechanics',
        '9-12': 'advanced physics: calculus-based mechanics, thermodynamics, quantum'
      },
      [GraphQLTopic.Math]: {
        '1-3': 'counting, basic addition/subtraction, shapes, patterns',
        '4-5': 'multiplication, division, fractions, basic geometry',
        '6-8': 'algebra basics, ratios, proportions, coordinate geometry',
        '9-12': 'advanced algebra, trigonometry, calculus, statistics'
      },
      [GraphQLTopic.English]: {
        '1-3': 'basic reading, simple words, letter recognition, simple stories',
        '4-5': 'reading comprehension, basic grammar, simple writing',
        '6-8': 'literature analysis, grammar rules, essay writing',
        '9-12': 'advanced literature, complex grammar, advanced writing'
      },
      [GraphQLTopic.Algorithms]: {
        '1-3': 'simple sorting, basic patterns, simple sequences',
        '4-5': 'basic sorting concepts, simple problem solving, basic logic',
        '6-8': 'fundamental algorithms, basic data structures, simple complexity',
        '9-12': 'advanced algorithms, complex data structures, optimization techniques'
      },
      [GraphQLTopic.DataStructures]: {
        '1-3': 'simple lists, basic collections, simple organization',
        '4-5': 'basic arrays, simple lists, basic organization concepts',
        '6-8': 'arrays, linked lists, basic trees, simple graphs',
        '9-12': 'advanced data structures, complex trees, advanced graphs, heaps'
      },
      [GraphQLTopic.String]: {
        '1-3': 'basic letter recognition, simple word patterns, basic reading',
        '4-5': 'word matching, simple string operations, basic text processing',
        '6-8': 'string manipulation, basic pattern matching, simple parsing',
        '9-12': 'advanced string algorithms, pattern matching, text processing'
      },
      [GraphQLTopic.Graph]: {
        '1-3': 'simple connections, basic relationships, simple networks',
        '4-5': 'basic connections, simple relationships, basic networks',
        '6-8': 'basic graph concepts, simple paths, basic traversal',
        '9-12': 'advanced graph theory, complex algorithms, optimization'
      },
      [GraphQLTopic.DynamicProgramming]: {
        '1-3': 'simple counting, basic patterns, simple sequences',
        '4-5': 'basic counting problems, simple optimization, basic patterns',
        '6-8': 'basic dynamic programming, simple optimization problems',
        '9-12': 'advanced dynamic programming, complex optimization, memoization'
      },
      [GraphQLTopic.Greedy]: {
        '1-3': 'simple choices, basic decision making, simple optimization',
        '4-5': 'basic greedy concepts, simple choices, basic optimization',
        '6-8': 'greedy algorithms, basic optimization strategies',
        '9-12': 'advanced greedy algorithms, complex optimization problems'
      },
      [GraphQLTopic.TextProcessing]: {
        '1-3': 'basic reading, simple word recognition, basic text understanding',
        '4-5': 'basic text analysis, simple word processing, basic comprehension',
        '6-8': 'text analysis, basic natural language processing, simple parsing',
        '9-12': 'advanced text processing, natural language processing, complex parsing'
      },
      [GraphQLTopic.ComputerScience]: {
        '1-3': 'basic computer concepts, simple technology, basic digital literacy',
        '4-5': 'basic computer science concepts, simple programming basics',
        '6-8': 'computer science fundamentals, programming concepts, basic systems',
        '9-12': 'advanced computer science, complex programming, systems design'
      },
      [GraphQLTopic.Astronomy]: {
        '1-3': 'basic space concepts, simple planets, basic stars',
        '4-5': 'simple astronomy, basic solar system, simple space concepts',
        '6-8': 'basic astronomy, solar system, basic space science',
        '9-12': 'advanced astronomy, astrophysics, complex space science'
      },
      [GraphQLTopic.EarthScience]: {
        '1-3': 'basic earth concepts, simple weather, basic nature',
        '4-5': 'basic earth science, simple geology, basic environmental concepts',
        '6-8': 'earth science fundamentals, basic geology, environmental science',
        '9-12': 'advanced earth science, geology, environmental systems'
      },
      [GraphQLTopic.Linguistics]: {
        '1-3': 'basic language concepts, simple word patterns, basic communication',
        '4-5': 'basic linguistics, simple language analysis, basic communication',
        '6-8': 'linguistics basics, language analysis, basic communication theory',
        '9-12': 'advanced linguistics, language theory, complex communication systems'
      },
      [GraphQLTopic.Philosophy]: {
        '1-3': 'basic thinking concepts, simple reasoning, basic questions',
        '4-5': 'basic philosophy, simple ethical concepts, basic reasoning',
        '6-8': 'philosophy basics, ethical reasoning, basic logical thinking',
        '9-12': 'advanced philosophy, ethical theory, complex logical reasoning'
      },
      [GraphQLTopic.History]: {
        '1-3': 'basic historical concepts, simple timelines, basic stories',
        '4-5': 'basic history, simple historical events, basic timelines',
        '6-8': 'history fundamentals, historical analysis, basic research',
        '9-12': 'advanced history, historical analysis, complex research methods'
      },
      [GraphQLTopic.Geography]: {
        '1-3': 'basic geography, simple maps, basic locations',
        '4-5': 'basic geography, simple map reading, basic location concepts',
        '6-8': 'geography fundamentals, map reading, basic geographic analysis',
        '9-12': 'advanced geography, geographic analysis, complex spatial concepts'
      },
      [GraphQLTopic.Economics]: {
        '1-3': 'basic economic concepts, simple money concepts, basic trade',
        '4-5': 'basic economics, simple financial concepts, basic market ideas',
        '6-8': 'economics basics, financial literacy, basic market concepts',
        '9-12': 'advanced economics, financial systems, complex market analysis'
      }
    };
  }

  static validateTopicForGrade(topic: GraphQLTopic, classType: GraphQLClassType): boolean {
    const gradeNumber = this.getGradeNumber(classType);
    
    // Define allowed topics for each grade range
    const allowedTopicsByGrade: Record<string, GraphQLTopic[]> = {
      '1-3': [GraphQLTopic.Math, GraphQLTopic.English, GraphQLTopic.Geography],
      '4-5': [GraphQLTopic.Math, GraphQLTopic.English, GraphQLTopic.Geography, GraphQLTopic.History, GraphQLTopic.EarthScience],
      '6-8': [GraphQLTopic.Math, GraphQLTopic.English, GraphQLTopic.Geography, GraphQLTopic.History, GraphQLTopic.EarthScience, GraphQLTopic.Physics, GraphQLTopic.Chemistry, GraphQLTopic.Biology, GraphQLTopic.ComputerScience, GraphQLTopic.Algorithms, GraphQLTopic.DataStructures],
      '9-12': Object.values(GraphQLTopic) // All topics allowed for high school
    };
    
    const gradeRange = this.getGradeRange(gradeNumber);
    const allowedTopics = allowedTopicsByGrade[gradeRange];
    
    return allowedTopics.includes(topic);
  }

  static getFallbackTopic(classType: GraphQLClassType): GraphQLTopic {
    const gradeNumber = this.getGradeNumber(classType);
    const gradeRange = this.getGradeRange(gradeNumber);
    
    // Return most appropriate fallback topic for each grade range
    switch (gradeRange) {
      case '1-3':
        return GraphQLTopic.Math; // Math is always appropriate for young kids
      case '4-5':
        return GraphQLTopic.Geography; // Geography is engaging and appropriate
      case '6-8':
        return GraphQLTopic.ComputerScience; // Intro to computer science
      case '9-12':
        return GraphQLTopic.Algorithms; // Default to algorithms for high school
      default:
        return GraphQLTopic.Math;
    }
  }

  static getValidatedTopic(topic: GraphQLTopic, classType: GraphQLClassType): GraphQLTopic {
    // Check if the requested topic is appropriate for the grade level
    if (this.validateTopicForGrade(topic, classType)) {
      return topic; // Topic is appropriate, use as-is
    }
    
    // Topic is not appropriate, get a fallback topic
    const fallbackTopic = this.getFallbackTopic(classType);
    console.log(`⚠️ Topic ${topic} not appropriate for Grade ${this.getGradeNumber(classType)}, using fallback: ${fallbackTopic}`);
    
    return fallbackTopic;
  }

  static getAgeAppropriateTopic(topic: GraphQLTopic, classType: GraphQLClassType): string {
    const gradeNumber = this.getGradeNumber(classType);
    const topicMappings = this.getTopicMappings();
    const gradeRange = this.getGradeRange(gradeNumber);
    
    // Use validated topic (might be fallback)
    const validatedTopic = this.getValidatedTopic(topic, classType);
    const mapping = topicMappings[validatedTopic]?.[gradeRange];
    
    return mapping || `${this.mapTopicToString(validatedTopic)} (adapted for Grade ${gradeNumber})`;
  }
}
