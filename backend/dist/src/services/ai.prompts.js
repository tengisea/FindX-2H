import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskClassType as GraphQLClassType } from "@/types/generated";
import { AIMappers } from "./ai.mappers";
export class AIPrompts {
    static buildTaskPrompt(request) {
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
        // Use specified answer format or determine based on topic and grade
        let problemFormat;
        if (request.answerFormat) {
            problemFormat = this.getProblemFormatFromAnswerFormat(request.answerFormat);
        }
        else {
            problemFormat = this.getProblemFormat(validatedTopic, request.classType);
        }
        return `
Create a UNIQUE ${problemFormat} problem for a ${typeString.toLowerCase()} worth ${request.piPoints} PiPoints.

CRITICAL: The problem MUST be about ${topicString} (${ageAppropriateTopic}) AND in ${problemFormat} format.

UNIQUENESS REQUIREMENT: Make this problem completely different from any other problems you might generate. Use different numbers, different scenarios, different contexts, and different wording. Avoid generic titles like "Counting Apples" - be creative and specific.

VARIATION SEED: ${request.variation || 'Default variation'}

Use this variation seed to create a unique problem that's different from any other task. Think of different themes, contexts, and scenarios within the same topic.

DIFFICULTY-SPECIFIC REQUIREMENTS:
${this.getDifficultySpecificInstructions(request.difficulty, request.classType)}

CREATIVITY REQUIREMENTS:
- Use different real-world scenarios (e.g., if first task was about apples, use cars, toys, books, etc.)
- Use different numbers and calculations
- Use different characters or contexts (e.g., different people, places, situations)
- Create a unique title that describes the specific scenario
- Make the problem statement engaging and specific to the scenario

Examples of unique titles for Math problems:
- "Shopping at the Toy Store" (instead of "Counting Apples")
- "Building Blocks Tower" (instead of "Basic Addition")
- "Pizza Party Planning" (instead of "Simple Math")

Topic: ${topicString} (adjusted for ${classString}: ${ageAppropriateTopic})
Difficulty: ${difficultyString}
Grade Level: ${classString}
Problem Format: ${problemFormat}
Concepts to test: ${spec.concepts}
Grade-specific concepts: ${classSpec.concepts}
Expected complexity: ${spec.complexity}
Language level: ${classSpec.language}
Suggested constraints: ${spec.constraints}

TOPIC REQUIREMENTS:
- The problem MUST be about ${topicString} concepts
- For ENGLISH: Focus on letters, words, reading, writing, vocabulary
- For MATH: Focus on numbers, counting, addition, subtraction, shapes
- For SCIENCE: Focus on basic scientific concepts, observations, facts
- For GEOGRAPHY: Focus on places, maps, countries, directions
- For HISTORY: Focus on historical events, people, time periods

IMPORTANT: Make sure the topic is age-appropriate for ${classString} students:
- Grades 1-3: Focus on basic concepts like counting, simple math, basic reading, shapes, colors
- Grades 4-5: Simple science concepts, basic geometry, word problems
- Grades 6-8: Introduction to formal subjects like biology, chemistry, algebra
- Grades 9-12: Advanced topics like calculus, advanced sciences, complex algorithms

Problem Format Guidelines:
${this.getFormatGuidelines(problemFormat, classString)}

FORMAT-SPECIFIC REQUIREMENTS:
${this.getFormatSpecificRequirements(problemFormat, classString)}

Requirements:
1. Clear, engaging problem statement appropriate for ${classString} students
2. Use ${classSpec.language} in the problem description
3. Focus on ${classSpec.concepts} that are age-appropriate
4. Follow the ${problemFormat} format guidelines EXACTLY
5. Make it educational and fun for ${classString} level
6. If the topic seems too advanced for the grade, adapt it to simpler concepts
7. Ensure the problem format matches the expected answer type

IMPORTANT: Return ONLY valid JSON in this exact format (no additional text, no markdown, no code blocks):
{
  "title": "Concise problem title",
  "description": "One-sentence problem summary",
  "problemStatement": "${this.getProblemStatementTemplate(problemFormat, classString)}"
}
    `;
    }
    static buildAnswerPrompt(taskData) {
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
    static getDifficultySpecificInstructions(difficulty, classType) {
        const gradeLevel = this.getGradeLevel(classType);
        if (gradeLevel <= 3) {
            // Early grades (1-3)
            switch (difficulty) {
                case GraphQLDifficulty.Easy:
                    return `EASY TASK REQUIREMENTS:
- Use numbers 1-10 only
- Single-step problems (count, add, or subtract)
- Visual scenarios (toys, animals, food)
- Very simple language
- Direct counting or basic addition/subtraction
- Examples: "Count the apples", "Add 2 + 3"`;
                case GraphQLDifficulty.Medium:
                    return `MEDIUM TASK REQUIREMENTS:
- Use numbers 1-20
- Two-step problems (count then add, or combine operations)
- Story scenarios with characters
- Simple word problems
- Basic reasoning required
- Examples: "Sarah has 5 toys, gets 3 more, how many total?"`;
                case GraphQLDifficulty.Hard:
                    return `HARD TASK REQUIREMENTS:
- Use numbers 1-50
- Multi-step problems (3+ operations)
- Complex scenarios with multiple characters
- Word problems requiring reading comprehension
- Logical reasoning and problem-solving
- Examples: "Tom has 10 stickers, gives away 3, gets 5 more, how many now?"`;
                default:
                    return '';
            }
        }
        else if (gradeLevel <= 8) {
            // Middle grades (4-8)
            switch (difficulty) {
                case GraphQLDifficulty.Easy:
                    return `EASY TASK REQUIREMENTS:
- Basic arithmetic (addition, subtraction, multiplication, division)
- Single-step calculations
- Simple word problems
- Numbers up to 100
- Examples: "What is 15 × 4?", "Sarah has 25 marbles, gives away 8"`;
                case GraphQLDifficulty.Medium:
                    return `MEDIUM TASK REQUIREMENTS:
- Multi-step word problems
- Fractions, decimals, percentages
- Basic geometry concepts
- Problem-solving with reasoning
- Numbers up to 1000
- Examples: "A pizza is cut into 8 slices, 3 are eaten, what fraction remains?"`;
                case GraphQLDifficulty.Hard:
                    return `HARD TASK REQUIREMENTS:
- Complex multi-step problems
- Advanced math concepts (algebra, geometry)
- Real-world applications
- Critical thinking required
- Numbers up to 10,000
- Examples: "A rectangle has length 2x+3 and width x+1, find the area"`;
                default:
                    return '';
            }
        }
        else {
            // High school grades (9-12)
            switch (difficulty) {
                case GraphQLDifficulty.Easy:
                    return `EASY TASK REQUIREMENTS:
- Basic algebra and geometry
- Simple problem-solving
- Single concept application
- Examples: "Solve 2x + 5 = 13", "Find the area of a triangle"`;
                case GraphQLDifficulty.Medium:
                    return `MEDIUM TASK REQUIREMENTS:
- Multi-step algebra problems
- Complex geometry
- Real-world applications
- Multiple concepts combined
- Examples: "A quadratic equation with word problems", "Optimization problems"`;
                case GraphQLDifficulty.Hard:
                    return `HARD TASK REQUIREMENTS:
- Advanced calculus, trigonometry, or statistics
- Complex problem-solving
- Multiple solution approaches
- Critical thinking and analysis
- Examples: "Derivative applications", "Statistical analysis problems"`;
                default:
                    return '';
            }
        }
    }
    static getGradeLevel(classType) {
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
            default: return 1;
        }
    }
    static getDifficultySpecs() {
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
    static getClassSpecs() {
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
    static getProblemFormatFromAnswerFormat(answerFormat) {
        switch (answerFormat) {
            case 'MULTIPLE_CHOICE':
                return 'multiple choice question';
            case 'SINGLE_NUMBER':
                return 'math problem requiring a single number answer';
            case 'SINGLE_WORD':
                return 'word problem requiring a single word answer';
            case 'SHORT_TEXT':
                return 'short text response question';
            case 'LONG_TEXT':
                return 'detailed text response question';
            case 'CODE_SOLUTION':
                return 'competitive programming (LeetCode-style)';
            case 'TRUE_FALSE':
                return 'true/false question';
            case 'DRAWING':
                return 'drawing/visual response question';
            default:
                return 'general question';
        }
    }
    static getProblemFormat(topic, classType) {
        const gradeNumber = this.getGradeNumber(classType);
        // Advanced topics get more complex formats for higher grades
        const isAdvancedTopic = [
            GraphQLTopic.Math,
            GraphQLTopic.Physics,
            GraphQLTopic.Chemistry
        ].includes(topic);
        // Advanced format for advanced topics in Grade 7+
        if (isAdvancedTopic && gradeNumber >= 7) {
            return "competitive programming (LeetCode-style)";
        }
        // Grade-appropriate formats for other topics
        if (gradeNumber <= 3) {
            // Grades 1-3: Simple formats
            if (topic === GraphQLTopic.Math)
                return "simple math problem";
            if (topic === GraphQLTopic.English)
                return "word recognition problem";
            return "multiple choice question";
        }
        else if (gradeNumber <= 6) {
            // Grades 4-6: Moderate formats
            if (topic === GraphQLTopic.Math)
                return "math word problem";
            if (topic === GraphQLTopic.English)
                return "short text response question";
            if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
                return "multiple choice science question";
            }
            return "short answer question";
        }
        else if (gradeNumber <= 9) {
            // Grades 7-9: More complex formats
            if (topic === GraphQLTopic.Math)
                return "algebraic problem";
            if (topic === GraphQLTopic.English)
                return "essay question";
            if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
                return "short answer science question";
            }
            return "short answer question";
        }
        else {
            // Grades 10-12: Advanced formats
            if (topic === GraphQLTopic.Math)
                return "advanced math problem";
            if (topic === GraphQLTopic.English)
                return "analytical essay question";
            if ([GraphQLTopic.Biology, GraphQLTopic.Chemistry, GraphQLTopic.Physics].includes(topic)) {
                return "detailed explanation question";
            }
            return "detailed analysis question";
        }
    }
    static getFormatGuidelines(format, classString) {
        if (format.includes("competitive programming")) {
            return `- Use standard competitive programming format with input/output specifications
- Include example test cases with explanations
- Provide clear constraints
- Use algorithmic problem-solving approach`;
        }
        else if (format.includes("multiple choice")) {
            return `- Present 4 clear options (A, B, C, D)
- Make distractors plausible but clearly wrong
- Use simple, clear language appropriate for ${classString}
- Focus on basic concepts and recognition`;
        }
        else if (format.includes("math")) {
            return `- Present clear mathematical problem
- Use age-appropriate numbers and operations
- Include visual elements if helpful (shapes, objects)
- Focus on single-step or simple multi-step problems`;
        }
        else if (format.includes("word") || format.includes("text")) {
            return `- Use simple, clear language
- Focus on vocabulary, reading comprehension, or basic writing
- Provide clear instructions for response
- Make questions engaging and relevant`;
        }
        else if (format.includes("science")) {
            return `- Use age-appropriate scientific concepts
- Include simple observations or basic facts
- Avoid complex terminology
- Make connections to everyday life`;
        }
        else {
            return `- Use clear, engaging language appropriate for ${classString}
- Focus on age-appropriate concepts
- Provide clear instructions
- Make the problem educational and fun`;
        }
    }
    static getFormatSpecificRequirements(format, classString) {
        if (format.includes("multiple choice")) {
            return `- The problem statement MUST include 4 multiple choice options (A, B, C, D)
- Each option should be clearly labeled and plausible
- The correct answer should be obvious to students at this grade level
- Use simple, clear language for all options
- The question MUST be about the specified topic (ENGLISH, MATH, SCIENCE, etc.)
- Example for ENGLISH: "What is the first letter of 'cat'? A) A B) B C) C D) D"
- Example for MATH: "What is 2 + 2? A) 3 B) 4 C) 5 D) 6"`;
        }
        else if (format.includes("math") && format.includes("word")) {
            return `- The problem should be a word problem that requires a single number answer
- Include a story or scenario that makes the math relevant
- Use age-appropriate numbers and operations
- The answer should be a single number (no units needed)
- Example: "Sarah has 5 apples. She gives away 2 apples. How many apples does she have left?"`;
        }
        else if (format.includes("math") && !format.includes("word")) {
            return `- The problem should require a single number answer
- Use age-appropriate numbers and operations
- Present the problem clearly with visual elements if helpful
- The answer should be a single number
- Example: "What is 7 × 3?"`;
        }
        else if (format.includes("word") || format.includes("text")) {
            return `- The problem should require a short text response (1-3 words)
- Focus on vocabulary, reading comprehension, or basic writing
- Use simple, clear language
- The answer should be a single word or short phrase
- Example: "What color is the sky?" (Answer: "blue")`;
        }
        else if (format.includes("science")) {
            return `- The problem should be a multiple choice science question
- Use age-appropriate scientific concepts
- Include 4 options (A, B, C, D) with one correct answer
- Make connections to everyday life
- Avoid complex terminology
- Example: "What do plants need to grow? A) Water B) Music C) Toys D) Cars"`;
        }
        else if (format.includes("competitive programming")) {
            return `- Use standard competitive programming format
- Include input/output specifications
- Provide 2-3 example test cases with explanations
- Include constraints (1 ≤ n ≤ 1000)
- Use algorithmic problem-solving approach
- Example: "Given an array of integers, find the maximum element..."`;
        }
        else {
            return `- Use clear, engaging language appropriate for ${classString}
- Focus on age-appropriate concepts
- Provide clear instructions for the expected response
- Make the problem educational and fun`;
        }
    }
    static getGradeNumber(classType) {
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
    static getProblemStatementTemplate(format, classString) {
        if (format.includes("competitive programming")) {
            return `Complete competitive programming problem statement with:\\n- Clear problem description\\n- Input format specification\\n- Output format specification\\n- 2-3 example test cases with explanations\\n- Constraints (1 ≤ n ≤ 1000)\\n- All in proper competitive programming format`;
        }
        else if (format.includes("multiple choice")) {
            return `Create a multiple choice question with:\\n- Clear question statement\\n- 4 options (A, B, C, D)\\n- One correct answer\\n- Simple, age-appropriate language\\n- Focus on basic concepts and recognition`;
        }
        else if (format.includes("math")) {
            return `Create a math problem with:\\n- Clear mathematical question\\n- Age-appropriate numbers and operations\\n- Visual elements if helpful (shapes, objects)\\n- Single-step or simple multi-step problems\\n- Engaging context (animals, toys, games)`;
        }
        else if (format.includes("word") || format.includes("text")) {
            return `Create a text-based question with:\\n- Clear question or prompt\\n- Simple, engaging language\\n- Focus on vocabulary, reading comprehension, or basic writing\\n- Clear instructions for response\\n- Relevant and interesting content`;
        }
        else if (format.includes("science")) {
            return `Create a science question with:\\n- Age-appropriate scientific concepts\\n- Simple observations or basic facts\\n- Avoid complex terminology\\n- Make connections to everyday life\\n- Clear, engaging question format`;
        }
        else {
            return `Create an engaging question with:\\n- Clear, age-appropriate language\\n- Focus on relevant concepts\\n- Simple instructions\\n- Educational and fun content\\n- Appropriate complexity for ${classString} students`;
        }
    }
}
