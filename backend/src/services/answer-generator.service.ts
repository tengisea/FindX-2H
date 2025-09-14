import { Topic as GraphQLTopic, ClassType as GraphQLClassType } from "@/types/generated";
import { AnswerFormat } from "@/models/Answer.model";
import { ClassType as ModelClassType } from "@/models/Task.model";

export interface AnswerGenerationRequest {
  topic: GraphQLTopic;
  classType: GraphQLClassType;
  title: string;
  description: string;
  problemStatement: string;
}

export interface AnswerGenerationResponse {
  answer: string;
  solution: string;
  answerValidation: {
    format: AnswerFormat;
    correctAnswers: string[];
    multipleChoiceOptions?: Array<{
      letter: string;
      text: string;
      isCorrect: boolean;
    }>;
    partialCreditAnswers?: string[];
    validationRules?: string;
  };
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    explanation?: string;
  }>;
}

export class AnswerGeneratorService {
  /**
   * Converts model types to GraphQL types
   */
  static mapModelToGraphQLTypes(modelTopic: string, modelClassType: ModelClassType): { topic: GraphQLTopic; classType: GraphQLClassType } {
    // Map topic string to GraphQL enum
    const topicMap: Record<string, GraphQLTopic> = {
      'ALGORITHMS': GraphQLTopic.Algorithms,
      'DATA_STRUCTURES': GraphQLTopic.DataStructures,
      'MATH': GraphQLTopic.Math,
      'STRING': GraphQLTopic.String,
      'GRAPH': GraphQLTopic.Graph,
      'DYNAMIC_PROGRAMMING': GraphQLTopic.DynamicProgramming,
      'GREEDY': GraphQLTopic.Greedy,
      'ENGLISH': GraphQLTopic.English,
      'TEXT_PROCESSING': GraphQLTopic.TextProcessing,
      'CHEMISTRY': GraphQLTopic.Chemistry,
      'BIOLOGY': GraphQLTopic.Biology,
      'PHYSICS': GraphQLTopic.Physics,
      'COMPUTER_SCIENCE': GraphQLTopic.ComputerScience,
      'ASTRONOMY': GraphQLTopic.Astronomy,
      'EARTH_SCIENCE': GraphQLTopic.EarthScience,
      'LINGUISTICS': GraphQLTopic.Linguistics,
      'PHILOSOPHY': GraphQLTopic.Philosophy,
      'HISTORY': GraphQLTopic.History,
      'GEOGRAPHY': GraphQLTopic.Geography,
      'ECONOMICS': GraphQLTopic.Economics,
    };

    // Map class type
    const classTypeMap: Record<ModelClassType, GraphQLClassType> = {
      [ModelClassType.GRADE_1]: GraphQLClassType.Grade_1,
      [ModelClassType.GRADE_2]: GraphQLClassType.Grade_2,
      [ModelClassType.GRADE_3]: GraphQLClassType.Grade_3,
      [ModelClassType.GRADE_4]: GraphQLClassType.Grade_4,
      [ModelClassType.GRADE_5]: GraphQLClassType.Grade_5,
      [ModelClassType.GRADE_6]: GraphQLClassType.Grade_6,
      [ModelClassType.GRADE_7]: GraphQLClassType.Grade_7,
      [ModelClassType.GRADE_8]: GraphQLClassType.Grade_8,
      [ModelClassType.GRADE_9]: GraphQLClassType.Grade_9,
      [ModelClassType.GRADE_10]: GraphQLClassType.Grade_10,
      [ModelClassType.GRADE_11]: GraphQLClassType.Grade_11,
      [ModelClassType.GRADE_12]: GraphQLClassType.Grade_12,
    };

    return {
      topic: topicMap[modelTopic] || GraphQLTopic.Math, // Default fallback
      classType: classTypeMap[modelClassType]
    };
  }
  /**
   * Determines the appropriate answer format based on topic and grade level
   */
  static getAnswerFormat(topic: GraphQLTopic, classType: GraphQLClassType): AnswerFormat {
    const gradeNumber = this.getGradeNumber(classType);
    
    // Computer Science topics get LeetCode-style format only for higher grades
    const isComputerScienceTopic = [
      GraphQLTopic.ComputerScience,
      GraphQLTopic.Algorithms,
      GraphQLTopic.DataStructures,
      GraphQLTopic.DynamicProgramming,
      GraphQLTopic.Greedy,
      GraphQLTopic.Graph,
      GraphQLTopic.String,
      GraphQLTopic.TextProcessing
    ].includes(topic);

    // LeetCode format only for Computer Science topics in Grade 7+
    if (isComputerScienceTopic && gradeNumber >= 7) {
      return AnswerFormat.CODE_SOLUTION;
    }

    // Grade-appropriate formats for other topics
    if (gradeNumber <= 3) {
      // Grades 1-3: Simple formats
      if (topic === GraphQLTopic.Math) return AnswerFormat.SINGLE_NUMBER;
      if (topic === GraphQLTopic.English) return AnswerFormat.SINGLE_WORD;
      return AnswerFormat.MULTIPLE_CHOICE;
    } else if (gradeNumber <= 6) {
      // Grades 4-6: Moderate formats
      if (topic === GraphQLTopic.Math) return AnswerFormat.SINGLE_NUMBER;
      if (topic === GraphQLTopic.English) return AnswerFormat.SHORT_TEXT;
      if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
        return AnswerFormat.MULTIPLE_CHOICE;
      }
      return AnswerFormat.SHORT_TEXT;
    } else if (gradeNumber <= 9) {
      // Grades 7-9: More complex formats
      if (topic === GraphQLTopic.Math) return AnswerFormat.SINGLE_NUMBER;
      if (topic === GraphQLTopic.English) return AnswerFormat.SHORT_TEXT;
      if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
        return AnswerFormat.SHORT_TEXT;
      }
      return AnswerFormat.SHORT_TEXT;
    } else {
      // Grades 10-12: Advanced formats
      if (topic === GraphQLTopic.Math) return AnswerFormat.SINGLE_NUMBER;
      if (topic === GraphQLTopic.English) return AnswerFormat.LONG_TEXT;
      if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
        return AnswerFormat.LONG_TEXT;
      }
      return AnswerFormat.LONG_TEXT;
    }
  }

  /**
   * Generates appropriate answer format based on topic and grade
   */
  static generateAnswerFormat(request: AnswerGenerationRequest): AnswerGenerationResponse {
    const format = this.getAnswerFormat(request.topic, request.classType);
    const gradeNumber = this.getGradeNumber(request.classType);

    switch (format) {
      case AnswerFormat.SINGLE_NUMBER:
        return this.generateSingleNumberAnswer(request, gradeNumber);
      
      case AnswerFormat.SINGLE_WORD:
        return this.generateSingleWordAnswer(request, gradeNumber);
      
      case AnswerFormat.MULTIPLE_CHOICE:
        return this.generateMultipleChoiceAnswer(request, gradeNumber);
      
      case AnswerFormat.SHORT_TEXT:
        return this.generateShortTextAnswer(request, gradeNumber);
      
      case AnswerFormat.LONG_TEXT:
        return this.generateLongTextAnswer(request, gradeNumber);
      
      case AnswerFormat.CODE_SOLUTION:
        return this.generateCodeSolutionAnswer(request, gradeNumber);
      
      case AnswerFormat.TRUE_FALSE:
        return this.generateTrueFalseAnswer(request, gradeNumber);
      
      default:
        return this.generateShortTextAnswer(request, gradeNumber);
    }
  }

  private static generateSingleNumberAnswer(request: AnswerGenerationRequest, gradeNumber: number): AnswerGenerationResponse {
    // For math problems, generate a simple numeric answer
    const answer = this.generateMathAnswer(request, gradeNumber);
    
    return {
      answer,
      solution: `The answer is ${answer}. This is a simple math problem appropriate for Grade ${gradeNumber} students.`,
      answerValidation: {
        format: AnswerFormat.SINGLE_NUMBER,
        correctAnswers: [answer],
        partialCreditAnswers: [answer.replace(/\.0$/, ''), answer.replace(/^0+/, '')],
        validationRules: "Exact numeric match required, with tolerance for formatting differences"
      }
    };
  }

  private static generateSingleWordAnswer(request: AnswerGenerationRequest, gradeNumber: number): AnswerGenerationResponse {
    // For English/word problems, generate a simple word answer
    const answer = this.generateWordAnswer(request, gradeNumber);
    
    return {
      answer,
      solution: `The correct answer is "${answer}". This is a simple word problem appropriate for Grade ${gradeNumber} students.`,
      answerValidation: {
        format: AnswerFormat.SINGLE_WORD,
        correctAnswers: [answer.toLowerCase()],
        partialCreditAnswers: [answer.toLowerCase(), answer.toUpperCase()],
        validationRules: "Case-insensitive word match"
      }
    };
  }

  private static generateMultipleChoiceAnswer(request: AnswerGenerationRequest, gradeNumber: number): AnswerGenerationResponse {
    // Generate multiple choice options
    const correctAnswer = this.generateCorrectAnswer(request, gradeNumber);
    const options = this.generateMultipleChoiceOptions(request, gradeNumber, correctAnswer);
    
    return {
      answer: correctAnswer.letter,
      solution: `The correct answer is ${correctAnswer.letter}: ${correctAnswer.text}. This is a multiple choice question appropriate for Grade ${gradeNumber} students.`,
      answerValidation: {
        format: AnswerFormat.MULTIPLE_CHOICE,
        correctAnswers: [correctAnswer.letter],
        multipleChoiceOptions: options,
        validationRules: "Single letter selection (A, B, C, D)"
      }
    };
  }

  private static generateShortTextAnswer(request: AnswerGenerationRequest, gradeNumber: number): AnswerGenerationResponse {
    const answer = this.generateTextAnswer(request, gradeNumber, 'short');
    
    return {
      answer,
      solution: `The correct answer is: ${answer}. This is a short text response appropriate for Grade ${gradeNumber} students.`,
      answerValidation: {
        format: AnswerFormat.SHORT_TEXT,
        correctAnswers: [answer.toLowerCase()],
        partialCreditAnswers: [answer.toLowerCase(), answer.toUpperCase()],
        validationRules: "Case-insensitive text match, partial credit for similar answers"
      }
    };
  }

  private static generateLongTextAnswer(request: AnswerGenerationRequest, gradeNumber: number): AnswerGenerationResponse {
    const answer = this.generateTextAnswer(request, gradeNumber, 'long');
    
    return {
      answer,
      solution: `The correct answer is: ${answer}. This is a detailed text response appropriate for Grade ${gradeNumber} students.`,
      answerValidation: {
        format: AnswerFormat.LONG_TEXT,
        correctAnswers: [answer.toLowerCase()],
        partialCreditAnswers: [answer.toLowerCase(), answer.toUpperCase()],
        validationRules: "Case-insensitive text match with keyword analysis for partial credit"
      }
    };
  }

  private static generateCodeSolutionAnswer(request: AnswerGenerationRequest, gradeNumber: number): AnswerGenerationResponse {
    // This is the LeetCode-style format for Computer Science topics
    const testCases = this.generateTestCases(request, gradeNumber);
    const answer = this.generateCodeAnswer(request, gradeNumber);
    
    return {
      answer,
      solution: `This is a competitive programming problem appropriate for Grade ${gradeNumber} students. The solution involves algorithmic thinking and coding skills.`,
      answerValidation: {
        format: AnswerFormat.CODE_SOLUTION,
        correctAnswers: [answer],
        validationRules: "Code solution that passes all test cases"
      },
      testCases
    };
  }

  private static generateTrueFalseAnswer(request: AnswerGenerationRequest, gradeNumber: number): AnswerGenerationResponse {
    const isTrue = Math.random() > 0.5;
    const answer = isTrue ? "True" : "False";
    
    return {
      answer,
      solution: `The correct answer is ${answer}. This is a true/false question appropriate for Grade ${gradeNumber} students.`,
      answerValidation: {
        format: AnswerFormat.TRUE_FALSE,
        correctAnswers: [answer],
        validationRules: "Exact match: 'True' or 'False'"
      }
    };
  }

  // Helper methods for generating specific types of answers
  private static generateMathAnswer(request: AnswerGenerationRequest, gradeNumber: number): string {
    // Generate appropriate math answers based on grade level
    if (gradeNumber <= 3) {
      return Math.floor(Math.random() * 20 + 1).toString(); // 1-20
    } else if (gradeNumber <= 6) {
      return Math.floor(Math.random() * 100 + 1).toString(); // 1-100
    } else {
      return Math.floor(Math.random() * 1000 + 1).toString(); // 1-1000
    }
  }

  private static generateWordAnswer(request: AnswerGenerationRequest, gradeNumber: number): string {
    const simpleWords = ['cat', 'dog', 'bird', 'fish', 'tree', 'house', 'car', 'book'];
    const mediumWords = ['animal', 'plant', 'machine', 'building', 'vehicle', 'instrument'];
    const complexWords = ['organism', 'mechanism', 'architecture', 'transportation', 'apparatus'];

    if (gradeNumber <= 3) {
      return simpleWords[Math.floor(Math.random() * simpleWords.length)];
    } else if (gradeNumber <= 6) {
      return mediumWords[Math.floor(Math.random() * mediumWords.length)];
    } else {
      return complexWords[Math.floor(Math.random() * complexWords.length)];
    }
  }

  private static generateCorrectAnswer(request: AnswerGenerationRequest, gradeNumber: number): { letter: string; text: string } {
    const letters = ['A', 'B', 'C', 'D'];
    const correctLetter = letters[Math.floor(Math.random() * letters.length)];
    
    let correctText = '';
    if (request.topic === GraphQLTopic.Math) {
      correctText = this.generateMathAnswer(request, gradeNumber);
    } else if (request.topic === GraphQLTopic.English) {
      correctText = this.generateWordAnswer(request, gradeNumber);
    } else {
      correctText = 'Correct option';
    }

    return { letter: correctLetter, text: correctText };
  }

  private static generateMultipleChoiceOptions(request: AnswerGenerationRequest, gradeNumber: number, correct: { letter: string; text: string }): Array<{ letter: string; text: string; isCorrect: boolean }> {
    const letters = ['A', 'B', 'C', 'D'];
    const options = [];

    for (const letter of letters) {
      if (letter === correct.letter) {
        options.push({ letter, text: correct.text, isCorrect: true });
      } else {
        options.push({ 
          letter, 
          text: `Option ${letter}`, 
          isCorrect: false 
        });
      }
    }

    return options;
  }

  private static generateTextAnswer(request: AnswerGenerationRequest, gradeNumber: number, length: 'short' | 'long'): string {
    if (length === 'short') {
      return `Short answer for Grade ${gradeNumber}`;
    } else {
      return `Detailed answer for Grade ${gradeNumber} students that explains the concept thoroughly.`;
    }
  }

  private static generateCodeAnswer(request: AnswerGenerationRequest, gradeNumber: number): string {
    return `def solution(input_data):
    # Solution for Grade ${gradeNumber} students
    return result`;
  }

  private static generateTestCases(request: AnswerGenerationRequest, gradeNumber: number): Array<{ input: string; expectedOutput: string; explanation?: string }> {
    return [
      {
        input: "sample input 1",
        expectedOutput: "expected output 1",
        explanation: "Test case 1 explanation"
      },
      {
        input: "sample input 2",
        expectedOutput: "expected output 2",
        explanation: "Test case 2 explanation"
      }
    ];
  }

  private static getGradeNumber(classType: GraphQLClassType): number {
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
}
