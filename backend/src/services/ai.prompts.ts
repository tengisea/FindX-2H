import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType, ClassType as GraphQLClassType } from "@/types/generated";
import { AIGenerationRequest, TaskData, DifficultySpec, ClassSpec } from "./ai.types";
import { AIMappers } from "./ai.mappers";

export class AIPrompts {
  static buildTaskPrompt(request: AIGenerationRequest): string {
    const difficultySpecs = this.getDifficultySpecs();
    const classSpecs = this.getClassSpecs();
    
    const spec = difficultySpecs[request.difficulty];
    const classSpec = classSpecs[request.classType];

    // Validate topic and get appropriate one for the grade level
    const validatedTopic = AIMappers.getValidatedTopic(request.topic, request.classType);
    const topicString = AIMappers.mapTopicToString(validatedTopic);
    const difficultyString = AIMappers.mapDifficultyToString(request.difficulty);
    const typeString = AIMappers.mapTaskTypeToString(request.type);
    const classString = AIMappers.mapClassTypeToString(request.classType);

    // Get age-appropriate topic description
    const ageAppropriateTopic = AIMappers.getAgeAppropriateTopic(validatedTopic, request.classType);
    
    // Determine problem format based on topic and grade
    const problemFormat = this.getProblemFormat(validatedTopic, request.classType);
    
    return `
Create a ${problemFormat} problem for a ${typeString.toLowerCase()} worth ${request.piPoints} PiPoints.

Topic: ${topicString} (adjusted for ${classString}: ${ageAppropriateTopic})
Difficulty: ${difficultyString}
Grade Level: ${classString}
Problem Format: ${problemFormat}
Concepts to test: ${spec.concepts}
Grade-specific concepts: ${classSpec.concepts}
Expected complexity: ${spec.complexity}
Language level: ${classSpec.language}
Suggested constraints: ${spec.constraints}

IMPORTANT: Make sure the topic is age-appropriate for ${classString} students:
- Grades 1-3: Focus on basic concepts like counting, simple math, basic reading, shapes, colors
- Grades 4-5: Simple science concepts, basic geometry, word problems
- Grades 6-8: Introduction to formal subjects like biology, chemistry, algebra
- Grades 9-12: Advanced topics like calculus, advanced sciences, complex algorithms

Problem Format Guidelines:
${this.getFormatGuidelines(problemFormat, classString)}

Requirements:
1. Clear, engaging problem statement appropriate for ${classString} students
2. Use ${classSpec.language} in the problem description
3. Focus on ${classSpec.concepts} that are age-appropriate
4. Follow the ${problemFormat} format guidelines
5. Make it educational and fun for ${classString} level
6. If the topic seems too advanced for the grade, adapt it to simpler concepts

IMPORTANT: Return ONLY valid JSON in this exact format (no additional text, no markdown, no code blocks):
{
  "title": "Concise problem title",
  "description": "One-sentence problem summary",
  "problemStatement": "${this.getProblemStatementTemplate(problemFormat, classString)}"
}
    `;
  }

  static buildAnswerPrompt(taskData: TaskData): string {
    return `
You are an expert competitive programming problem solver. Generate a complete solution for the following problem:

Title: ${taskData.title}
Description: ${taskData.description}
Topic: ${taskData.topic}
Difficulty: ${taskData.difficulty}
Type: ${taskData.type}

Problem Statement:
${taskData.problemStatement}

Requirements:
1. Provide the correct answer/result
2. Include a detailed step-by-step solution explaining the approach
3. Provide 3-5 test cases with input, expected output, and explanations
4. Consider the difficulty level when providing the solution complexity

IMPORTANT: Return ONLY valid JSON in this exact format (no additional text, no markdown, no code blocks):
{
  "answer": "The final answer or result",
  "solution": "Detailed step-by-step solution explaining the approach, algorithm, and reasoning",
  "testCases": [
    {
      "input": "test input 1",
      "expectedOutput": "expected output 1",
      "explanation": "explanation of why this output is correct"
    },
    {
      "input": "test input 2", 
      "expectedOutput": "expected output 2",
      "explanation": "explanation of why this output is correct"
    },
    {
      "input": "test input 3",
      "expectedOutput": "expected output 3", 
      "explanation": "explanation of why this output is correct"
    }
  ]
}
    `;
  }

  private static getDifficultySpecs(): Record<GraphQLDifficulty, DifficultySpec> {
    return {
      [GraphQLDifficulty.Easy]: {
        concepts: 'basic loops, conditionals, simple math, arrays',
        complexity: 'O(n) or O(n²) solutions acceptable',
        constraints: '1 ≤ n ≤ 100'
      },
      [GraphQLDifficulty.Medium]: {
        concepts: 'sorting, searching, basic data structures, string manipulation',
        complexity: 'O(n log n) solutions expected',
        constraints: '1 ≤ n ≤ 1000'
      },
      [GraphQLDifficulty.Hard]: {
        concepts: 'advanced algorithms, dynamic programming, graph theory, complex data structures',
        complexity: 'optimal solutions required, may need O(n log n) or better',
        constraints: '1 ≤ n ≤ 10000'
      }
    };
  }

  private static getClassSpecs(): Record<GraphQLClassType, ClassSpec> {
    return {
      [GraphQLClassType.Grade_1]: {
        concepts: 'basic counting, simple addition, basic reading, shapes',
        complexity: 'very simple, single-step problems',
        language: 'simple vocabulary, short sentences, basic instructions'
      },
      [GraphQLClassType.Grade_2]: {
        concepts: 'addition/subtraction, basic multiplication, simple reading comprehension',
        complexity: '1-2 step problems, basic logic',
        language: 'clear instructions, simple vocabulary'
      },
      [GraphQLClassType.Grade_3]: {
        concepts: 'multiplication tables, basic division, reading comprehension, simple word problems',
        complexity: '2-step problems, basic reasoning',
        language: 'clear instructions, age-appropriate vocabulary'
      },
      [GraphQLClassType.Grade_4]: {
        concepts: 'long division, fractions, geometry basics, reading comprehension',
        complexity: '2-3 step problems, basic analytical thinking',
        language: 'clear instructions, moderate vocabulary'
      },
      [GraphQLClassType.Grade_5]: {
        concepts: 'decimals, fractions, basic algebra, geometry, reading comprehension',
        complexity: '3-step problems, logical reasoning',
        language: 'clear instructions, moderate vocabulary'
      },
      [GraphQLClassType.Grade_6]: {
        concepts: 'algebra basics, ratios, proportions, geometry, reading comprehension',
        complexity: 'multi-step problems, analytical thinking',
        language: 'clear instructions, appropriate vocabulary'
      },
      [GraphQLClassType.Grade_7]: {
        concepts: 'linear equations, geometry, statistics, reading comprehension',
        complexity: 'multi-step problems, critical thinking',
        language: 'formal instructions, academic vocabulary'
      },
      [GraphQLClassType.Grade_8]: {
        concepts: 'quadratic equations, advanced geometry, probability, reading comprehension',
        complexity: 'complex multi-step problems, critical analysis',
        language: 'formal instructions, academic vocabulary'
      },
      [GraphQLClassType.Grade_9]: {
        concepts: 'algebra, geometry, trigonometry basics, reading comprehension',
        complexity: 'complex problems, advanced reasoning',
        language: 'formal academic language, technical vocabulary'
      },
      [GraphQLClassType.Grade_10]: {
        concepts: 'advanced algebra, trigonometry, calculus basics, reading comprehension',
        complexity: 'advanced multi-step problems, complex reasoning',
        language: 'formal academic language, technical vocabulary'
      },
      [GraphQLClassType.Grade_11]: {
        concepts: 'calculus, advanced algebra, statistics, reading comprehension',
        complexity: 'advanced problems, sophisticated reasoning',
        language: 'formal academic language, technical vocabulary'
      },
      [GraphQLClassType.Grade_12]: {
        concepts: 'advanced calculus, linear algebra, statistics, reading comprehension',
        complexity: 'university-level problems, sophisticated analysis',
        language: 'formal academic language, technical vocabulary'
      }
    };
  }

  private static getProblemFormat(topic: GraphQLTopic, classType: GraphQLClassType): string {
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
      return "competitive programming (LeetCode-style)";
    }

    // Grade-appropriate formats for other topics
    if (gradeNumber <= 3) {
      // Grades 1-3: Simple formats
      if (topic === GraphQLTopic.Math) return "simple math problem";
      if (topic === GraphQLTopic.English) return "word recognition problem";
      return "multiple choice question";
    } else if (gradeNumber <= 6) {
      // Grades 4-6: Moderate formats
      if (topic === GraphQLTopic.Math) return "math word problem";
      if (topic === GraphQLTopic.English) return "short text response question";
      if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
        return "multiple choice science question";
      }
      return "short answer question";
    } else if (gradeNumber <= 9) {
      // Grades 7-9: More complex formats
      if (topic === GraphQLTopic.Math) return "algebraic problem";
      if (topic === GraphQLTopic.English) return "essay question";
      if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
        return "short answer science question";
      }
      return "short answer question";
    } else {
      // Grades 10-12: Advanced formats
      if (topic === GraphQLTopic.Math) return "advanced math problem";
      if (topic === GraphQLTopic.English) return "analytical essay question";
      if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
        return "detailed explanation question";
      }
      return "detailed analysis question";
    }
  }

  private static getFormatGuidelines(format: string, classString: string): string {
    if (format.includes("competitive programming")) {
      return `- Use standard competitive programming format with input/output specifications
- Include example test cases with explanations
- Provide clear constraints
- Use algorithmic problem-solving approach`;
    } else if (format.includes("multiple choice")) {
      return `- Present 4 clear options (A, B, C, D)
- Make distractors plausible but clearly wrong
- Use simple, clear language appropriate for ${classString}
- Focus on basic concepts and recognition`;
    } else if (format.includes("math")) {
      return `- Present clear mathematical problem
- Use age-appropriate numbers and operations
- Include visual elements if helpful (shapes, objects)
- Focus on single-step or simple multi-step problems`;
    } else if (format.includes("word") || format.includes("text")) {
      return `- Use simple, clear language
- Focus on vocabulary, reading comprehension, or basic writing
- Provide clear instructions for response
- Make questions engaging and relevant`;
    } else if (format.includes("science")) {
      return `- Use age-appropriate scientific concepts
- Include simple observations or basic facts
- Avoid complex terminology
- Make connections to everyday life`;
    } else {
      return `- Use clear, engaging language appropriate for ${classString}
- Focus on age-appropriate concepts
- Provide clear instructions
- Make the problem educational and fun`;
    }
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

  private static getProblemStatementTemplate(format: string, classString: string): string {
    if (format.includes("competitive programming")) {
      return `Complete competitive programming problem statement with:\\n- Clear problem description\\n- Input format specification\\n- Output format specification\\n- 2-3 example test cases with explanations\\n- Constraints (1 ≤ n ≤ 1000)\\n- All in proper competitive programming format`;
    } else if (format.includes("multiple choice")) {
      return `Create a multiple choice question with:\\n- Clear question statement\\n- 4 options (A, B, C, D)\\n- One correct answer\\n- Simple, age-appropriate language\\n- Focus on basic concepts and recognition`;
    } else if (format.includes("math")) {
      return `Create a math problem with:\\n- Clear mathematical question\\n- Age-appropriate numbers and operations\\n- Visual elements if helpful (shapes, objects)\\n- Single-step or simple multi-step problems\\n- Engaging context (animals, toys, games)`;
    } else if (format.includes("word") || format.includes("text")) {
      return `Create a text-based question with:\\n- Clear question or prompt\\n- Simple, engaging language\\n- Focus on vocabulary, reading comprehension, or basic writing\\n- Clear instructions for response\\n- Relevant and interesting content`;
    } else if (format.includes("science")) {
      return `Create a science question with:\\n- Age-appropriate scientific concepts\\n- Simple observations or basic facts\\n- Avoid complex terminology\\n- Make connections to everyday life\\n- Clear, engaging question format`;
    } else {
      return `Create an engaging question with:\\n- Clear, age-appropriate language\\n- Focus on relevant concepts\\n- Simple instructions\\n- Educational and fun content\\n- Appropriate complexity for ${classString} students`;
    }
  }
}
