// import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType, ClassType as GraphQLClassType } from "@/types/generated";

// export interface AIGenerationRequest {
//   topic: GraphQLTopic;
//   difficulty: GraphQLDifficulty;
//   type: GraphQLTaskType;
//   classType: GraphQLClassType;
//   piPoints: number;
// }

// export interface GeneratedTaskResponse {
//   title: string;
//   description: string;
//   problemStatement?: string;
// }

// export interface GeneratedAnswerResponse {
//   answer: string;
//   solution: string;
//   testCases: Array<{
//     input: string;
//     expectedOutput: string;
//     explanation?: string;
//   }>;
// }

// export class AIService {
//   static async generateTask(request: AIGenerationRequest): Promise<GeneratedTaskResponse> {
//     try {
//       console.log('🤖 Starting AI task generation...');
      
//       const prompt = this.buildPrompt(request);
//       console.log('📝 Generated prompt for AI service');
      
//       const response = await this.callAIService(prompt);
//       console.log('✅ AI service responded successfully');
      
//       const generatedContent = this.parseAIResponse(response);
//       console.log('📋 Parsed AI response:', { title: generatedContent.title });
      
//       return generatedContent;
//     } catch (error) {
//       console.error('❌ AI generation failed:', error);
//       throw error;
//     }
//   }

//   static async generateTaskAnswer(taskData: {
//     title: string;
//     description: string;
//     problemStatement: string;
//     topic: string;
//     difficulty: string;
//     type: string;
//   }): Promise<GeneratedAnswerResponse> {
//     try {
//       console.log('🤖 Starting AI answer generation...');
      
//       const prompt = this.buildAnswerPrompt(taskData);
//       console.log('📝 Generated answer prompt for AI service');
      
//       const response = await this.callAIService(prompt);
//       console.log('✅ AI service responded successfully');
      
//       const generatedContent = this.parseAnswerResponse(response);
//       console.log('📋 Parsed AI answer response');
      
//       return generatedContent;
//     } catch (error) {
//       console.error('❌ AI answer generation failed:', error);
//       throw error;
//     }
//   }

//   private static buildPrompt(request: AIGenerationRequest): string {
//     const difficultySpecs = {
//       [GraphQLDifficulty.Easy]: {
//         concepts: 'basic loops, conditionals, simple math, arrays',
//         complexity: 'O(n) or O(n²) solutions acceptable',
//         constraints: '1 ≤ n ≤ 100'
//       },
//       [GraphQLDifficulty.Medium]: {
//         concepts: 'sorting, searching, basic data structures, string manipulation',
//         complexity: 'O(n log n) solutions expected',
//         constraints: '1 ≤ n ≤ 1000'
//       },
//       [GraphQLDifficulty.Hard]: {
//         concepts: 'advanced algorithms, dynamic programming, graph theory, complex data structures',
//         complexity: 'optimal solutions required, may need O(n log n) or better',
//         constraints: '1 ≤ n ≤ 10000'
//       }
//     };

//     const classSpecs = {
//       [GraphQLClassType.Grade_1]: {
//         concepts: 'basic counting, simple addition, basic reading, shapes',
//         complexity: 'very simple, single-step problems',
//         language: 'simple vocabulary, short sentences, basic instructions'
//       },
//       [GraphQLClassType.Grade_2]: {
//         concepts: 'addition/subtraction, basic multiplication, simple reading comprehension',
//         complexity: '1-2 step problems, basic logic',
//         language: 'clear instructions, simple vocabulary'
//       },
//       [GraphQLClassType.Grade_3]: {
//         concepts: 'multiplication tables, basic division, reading comprehension, simple word problems',
//         complexity: '2-step problems, basic reasoning',
//         language: 'clear instructions, age-appropriate vocabulary'
//       },
//       [GraphQLClassType.Grade_4]: {
//         concepts: 'long division, fractions, geometry basics, reading comprehension',
//         complexity: '2-3 step problems, basic analytical thinking',
//         language: 'clear instructions, moderate vocabulary'
//       },
//       [GraphQLClassType.Grade_5]: {
//         concepts: 'decimals, fractions, basic algebra, geometry, reading comprehension',
//         complexity: '3-step problems, logical reasoning',
//         language: 'clear instructions, moderate vocabulary'
//       },
//       [GraphQLClassType.Grade_6]: {
//         concepts: 'algebra basics, ratios, proportions, geometry, reading comprehension',
//         complexity: 'multi-step problems, analytical thinking',
//         language: 'clear instructions, appropriate vocabulary'
//       },
//       [GraphQLClassType.Grade_7]: {
//         concepts: 'linear equations, geometry, statistics, reading comprehension',
//         complexity: 'multi-step problems, critical thinking',
//         language: 'formal instructions, academic vocabulary'
//       },
//       [GraphQLClassType.Grade_8]: {
//         concepts: 'quadratic equations, advanced geometry, probability, reading comprehension',
//         complexity: 'complex multi-step problems, critical analysis',
//         language: 'formal instructions, academic vocabulary'
//       },
//       [GraphQLClassType.Grade_9]: {
//         concepts: 'algebra, geometry, trigonometry basics, reading comprehension',
//         complexity: 'complex problems, advanced reasoning',
//         language: 'formal academic language, technical vocabulary'
//       },
//       [GraphQLClassType.Grade_10]: {
//         concepts: 'advanced algebra, trigonometry, calculus basics, reading comprehension',
//         complexity: 'advanced multi-step problems, complex reasoning',
//         language: 'formal academic language, technical vocabulary'
//       },
//       [GraphQLClassType.Grade_11]: {
//         concepts: 'calculus, advanced algebra, statistics, reading comprehension',
//         complexity: 'advanced problems, sophisticated reasoning',
//         language: 'formal academic language, technical vocabulary'
//       },
//       [GraphQLClassType.Grade_12]: {
//         concepts: 'advanced calculus, linear algebra, statistics, reading comprehension',
//         complexity: 'university-level problems, sophisticated analysis',
//         language: 'formal academic language, technical vocabulary'
//       }
//     };

//     const spec = difficultySpecs[request.difficulty];
//     const classSpec = classSpecs[request.classType];

//     const topicString = this.mapTopicToString(request.topic);
//     const difficultyString = this.mapDifficultyToString(request.difficulty);
//     const typeString = this.mapTaskTypeToString(request.type);
//     const classString = this.mapClassTypeToString(request.classType);

//     // Check if topic is age-appropriate for the grade level
//     const ageAppropriateTopic = this.getAgeAppropriateTopic(request.topic, request.classType);
    
//     return `
// Create a competitive programming problem for a ${typeString.toLowerCase()} worth ${request.piPoints} PiPoints.

// Topic: ${topicString} (adjusted for ${classString}: ${ageAppropriateTopic})
// Difficulty: ${difficultyString}
// Grade Level: ${classString}
// Concepts to test: ${spec.concepts}
// Grade-specific concepts: ${classSpec.concepts}
// Expected complexity: ${spec.complexity}
// Language level: ${classSpec.language}
// Suggested constraints: ${spec.constraints}

// IMPORTANT: Make sure the topic is age-appropriate for ${classString} students:
// - Grades 1-3: Focus on basic concepts like counting, simple math, basic reading, shapes, colors
// - Grades 4-5: Simple science concepts, basic geometry, word problems
// - Grades 6-8: Introduction to formal subjects like biology, chemistry, algebra
// - Grades 9-12: Advanced topics like calculus, advanced sciences, complex algorithms

// Requirements:
// 1. Clear, engaging problem statement appropriate for ${classString} students
// 2. Use ${classSpec.language} in the problem description
// 3. Focus on ${classSpec.concepts} that are age-appropriate
// 4. Proper input/output format specification
// 5. 2-3 example test cases with explanations
// 6. Appropriate constraints for the difficulty level
// 7. Make it educational and fun for ${classString} level
// 8. If the topic seems too advanced for the grade, adapt it to simpler concepts

// IMPORTANT: Return ONLY valid JSON in this exact format (no additional text, no markdown, no code blocks):
// {
//   "title": "Concise problem title",
//   "description": "One-sentence problem summary",
//   "problemStatement": "Complete formatted problem statement including:\\n- Problem description (using ${classSpec.language})\\n- Input format\\n- Output format\\n- Examples with explanations\\n- Constraints\\n- All in proper competitive programming format appropriate for ${classString} students"
// }
//     `;
//   }

//   private static async callAIService(prompt: string): Promise<string> {
//     if (!process.env.OPENAI_API_KEY) {
//       throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.');
//     }

//     console.log('🔑 OpenAI API key found, making request...');

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'gpt-4o-mini',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are an expert competitive programming problem setter. Create educational, well-structured problems that test algorithmic thinking.'
//           },
//           {
//             role: 'user',
//             content: prompt
//           }
//         ],
//         temperature: 0.7,
//         max_tokens: 1500
//       })
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('❌ OpenAI API Error:', response.status, errorText);
      
//       if (response.status === 429) {
//         const errorData = JSON.parse(errorText);
//         if (errorData.error?.code === 'rate_limit_exceeded') {
//           throw new Error('RATE_LIMIT_EXCEEDED');
//         }
//       }
      
//       throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
//     }

//     const data = await response.json();
    
//     if (!data.choices || !data.choices[0] || !data.choices[0].message) {
//       console.error('❌ Invalid OpenAI response format:', data);
//       throw new Error('Invalid response format from OpenAI API');
//     }

//     return data.choices[0].message.content;
//   }

//   private static parseAIResponse(response: string): GeneratedTaskResponse {
//     try {
//       let cleanedResponse = response
//         .replace(/```json\n?/g, '')
//         .replace(/```\n?$/g, '')
//         .replace(/^```/g, '')
//         .trim();
      
//       const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         cleanedResponse = jsonMatch[0];
//       }
      
//       const parseJSON = (jsonString: string) => {
//         try {
//           return JSON.parse(jsonString);
//         } catch (error) {
//           let cleaned = jsonString
//             .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
//             .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
//             .replace(/([^\\])\\([^"\\\/bfnrt])/g, '$1\\\\$2'); // Fix unescaped backslashes
          
//           return JSON.parse(cleaned);
//         }
//       };
      
//       const parsed = parseJSON(cleanedResponse);
      
//       if (!parsed.title || !parsed.description) {
//         throw new Error('Invalid AI response format - missing title or description');
//       }
      
//       return parsed;
//     } catch (error) {
//       console.error('Error parsing AI response:', error);
//       console.error('Raw response:', response);
      
//       try {
//         const titleMatch = response.match(/"title":\s*"([^"]+)"/);
//         const descriptionMatch = response.match(/"description":\s*"([^"]+)"/);
//         const problemStatementMatch = response.match(/"problemStatement":\s*"([^"]+)"/);
        
//         if (titleMatch && descriptionMatch) {
//           console.log('🔄 Using fallback parsing for AI response');
//           return {
//             title: titleMatch[1],
//             description: descriptionMatch[1],
//             problemStatement: problemStatementMatch ? problemStatementMatch[1] : 'Problem statement not available'
//           };
//         }
//       } catch (fallbackError) {
//         console.error('Fallback parsing also failed:', fallbackError);
//       }
      
//       throw new Error('Failed to parse AI response');
//     }
//   }

//   private static mapTopicToString(topic: GraphQLTopic): string {
//     switch (topic) {
//       case GraphQLTopic.Algorithms:
//         return 'algorithms';
//       case GraphQLTopic.DataStructures:
//         return 'data structures';
//       case GraphQLTopic.Math:
//         return 'mathematics';
//       case GraphQLTopic.String:
//         return 'string manipulation';
//       case GraphQLTopic.Graph:
//         return 'graph theory';
//       case GraphQLTopic.DynamicProgramming:
//         return 'dynamic programming';
//       case GraphQLTopic.Greedy:
//         return 'greedy algorithms';
//       case GraphQLTopic.English:
//         return 'English language learning';
//       case GraphQLTopic.TextProcessing:
//         return 'text processing';
//       case GraphQLTopic.Chemistry:
//         return 'chemistry';
//       case GraphQLTopic.Biology:
//         return 'biology';
//       case GraphQLTopic.Physics:
//         return 'physics';
//       case GraphQLTopic.ComputerScience:
//         return 'computer science';
//       case GraphQLTopic.Astronomy:
//         return 'astronomy';
//       case GraphQLTopic.EarthScience:
//         return 'earth science';
//       case GraphQLTopic.Linguistics:
//         return 'linguistics';
//       case GraphQLTopic.Philosophy:
//         return 'philosophy';
//       case GraphQLTopic.History:
//         return 'history';
//       case GraphQLTopic.Geography:
//         return 'geography';
//       case GraphQLTopic.Economics:
//         return 'economics';
//       default:
//         return 'algorithms';
//     }
//   }

//   private static mapDifficultyToString(difficulty: GraphQLDifficulty): string {
//     switch (difficulty) {
//       case GraphQLDifficulty.Easy:
//         return 'Easy';
//       case GraphQLDifficulty.Medium:
//         return 'Medium';
//       case GraphQLDifficulty.Hard:
//         return 'Hard';
//       default:
//         return 'Easy';
//     }
//   }

//   private static mapTaskTypeToString(type: GraphQLTaskType): string {
//     switch (type) {
//       case GraphQLTaskType.Challenge:
//         return 'Challenge';
//       case GraphQLTaskType.Tournament:
//         return 'Tournament';
//       default:
//         return 'Challenge';
//     }
//   }

//   private static mapClassTypeToString(classType: GraphQLClassType): string {
//     switch (classType) {
//       case GraphQLClassType.Grade_1:
//         return 'Grade 1';
//       case GraphQLClassType.Grade_2:
//         return 'Grade 2';
//       case GraphQLClassType.Grade_3:
//         return 'Grade 3';
//       case GraphQLClassType.Grade_4:
//         return 'Grade 4';
//       case GraphQLClassType.Grade_5:
//         return 'Grade 5';
//       case GraphQLClassType.Grade_6:
//         return 'Grade 6';
//       case GraphQLClassType.Grade_7:
//         return 'Grade 7';
//       case GraphQLClassType.Grade_8:
//         return 'Grade 8';
//       case GraphQLClassType.Grade_9:
//         return 'Grade 9';
//       case GraphQLClassType.Grade_10:
//         return 'Grade 10';
//       case GraphQLClassType.Grade_11:
//         return 'Grade 11';
//       case GraphQLClassType.Grade_12:
//         return 'Grade 12';
//       default:
//         return 'Grade 5';
//     }
//   }

//   private static getAgeAppropriateTopic(topic: GraphQLTopic, classType: GraphQLClassType): string {
//     const gradeNumber = this.getGradeNumber(classType);
    
//     // Define age-appropriate topics for each grade range
//     const topicMappings: Record<GraphQLTopic, Record<string, string>> = {
//       [GraphQLTopic.Biology]: {
//         '1-3': 'basic animal and plant concepts, colors, shapes, simple nature observations',
//         '4-5': 'simple living things, basic plant and animal features, nature basics',
//         '6-8': 'basic biology concepts, simple life processes, basic classification',
//         '9-12': 'full biology topics: cells, genetics, ecosystems, evolution'
//       },
//       [GraphQLTopic.Chemistry]: {
//         '1-3': 'basic materials, colors, simple properties, mixing colors',
//         '4-5': 'simple materials and properties, basic experiments',
//         '6-8': 'basic chemistry concepts, simple reactions, elements',
//         '9-12': 'full chemistry: atoms, molecules, reactions, periodic table'
//       },
//       [GraphQLTopic.Physics]: {
//         '1-3': 'basic movement, simple machines, light and dark',
//         '4-5': 'simple forces, basic energy concepts, simple experiments',
//         '6-8': 'basic physics: motion, forces, energy, simple mechanics',
//         '9-12': 'advanced physics: calculus-based mechanics, thermodynamics, quantum'
//       },
//       [GraphQLTopic.Math]: {
//         '1-3': 'counting, basic addition/subtraction, shapes, patterns',
//         '4-5': 'multiplication, division, fractions, basic geometry',
//         '6-8': 'algebra basics, ratios, proportions, coordinate geometry',
//         '9-12': 'advanced algebra, trigonometry, calculus, statistics'
//       },
//       [GraphQLTopic.English]: {
//         '1-3': 'basic reading, simple words, letter recognition, simple stories',
//         '4-5': 'reading comprehension, basic grammar, simple writing',
//         '6-8': 'literature analysis, grammar rules, essay writing',
//         '9-12': 'advanced literature, complex grammar, advanced writing'
//       },
//       [GraphQLTopic.Algorithms]: {
//         '1-3': 'simple sorting, basic patterns, simple sequences',
//         '4-5': 'basic sorting concepts, simple problem solving, basic logic',
//         '6-8': 'fundamental algorithms, basic data structures, simple complexity',
//         '9-12': 'advanced algorithms, complex data structures, optimization techniques'
//       },
//       [GraphQLTopic.DataStructures]: {
//         '1-3': 'simple lists, basic collections, simple organization',
//         '4-5': 'basic arrays, simple lists, basic organization concepts',
//         '6-8': 'arrays, linked lists, basic trees, simple graphs',
//         '9-12': 'advanced data structures, complex trees, advanced graphs, heaps'
//       },
//       [GraphQLTopic.String]: {
//         '1-3': 'basic letter recognition, simple word patterns, basic reading',
//         '4-5': 'word matching, simple string operations, basic text processing',
//         '6-8': 'string manipulation, basic pattern matching, simple parsing',
//         '9-12': 'advanced string algorithms, pattern matching, text processing'
//       },
//       [GraphQLTopic.Graph]: {
//         '1-3': 'simple connections, basic relationships, simple networks',
//         '4-5': 'basic connections, simple relationships, basic networks',
//         '6-8': 'basic graph concepts, simple paths, basic traversal',
//         '9-12': 'advanced graph theory, complex algorithms, optimization'
//       },
//       [GraphQLTopic.DynamicProgramming]: {
//         '1-3': 'simple counting, basic patterns, simple sequences',
//         '4-5': 'basic counting problems, simple optimization, basic patterns',
//         '6-8': 'basic dynamic programming, simple optimization problems',
//         '9-12': 'advanced dynamic programming, complex optimization, memoization'
//       },
//       [GraphQLTopic.Greedy]: {
//         '1-3': 'simple choices, basic decision making, simple optimization',
//         '4-5': 'basic greedy concepts, simple choices, basic optimization',
//         '6-8': 'greedy algorithms, basic optimization strategies',
//         '9-12': 'advanced greedy algorithms, complex optimization problems'
//       },
//       [GraphQLTopic.TextProcessing]: {
//         '1-3': 'basic reading, simple word recognition, basic text understanding',
//         '4-5': 'basic text analysis, simple word processing, basic comprehension',
//         '6-8': 'text analysis, basic natural language processing, simple parsing',
//         '9-12': 'advanced text processing, natural language processing, complex parsing'
//       },
//       [GraphQLTopic.ComputerScience]: {
//         '1-3': 'basic computer concepts, simple technology, basic digital literacy',
//         '4-5': 'basic computer science concepts, simple programming basics',
//         '6-8': 'computer science fundamentals, programming concepts, basic systems',
//         '9-12': 'advanced computer science, complex programming, systems design'
//       },
//       [GraphQLTopic.Astronomy]: {
//         '1-3': 'basic space concepts, simple planets, basic stars',
//         '4-5': 'simple astronomy, basic solar system, simple space concepts',
//         '6-8': 'basic astronomy, solar system, basic space science',
//         '9-12': 'advanced astronomy, astrophysics, complex space science'
//       },
//       [GraphQLTopic.EarthScience]: {
//         '1-3': 'basic earth concepts, simple weather, basic nature',
//         '4-5': 'basic earth science, simple geology, basic environmental concepts',
//         '6-8': 'earth science fundamentals, basic geology, environmental science',
//         '9-12': 'advanced earth science, geology, environmental systems'
//       },
//       [GraphQLTopic.Linguistics]: {
//         '1-3': 'basic language concepts, simple word patterns, basic communication',
//         '4-5': 'basic linguistics, simple language analysis, basic communication',
//         '6-8': 'linguistics basics, language analysis, basic communication theory',
//         '9-12': 'advanced linguistics, language theory, complex communication systems'
//       },
//       [GraphQLTopic.Philosophy]: {
//         '1-3': 'basic thinking concepts, simple reasoning, basic questions',
//         '4-5': 'basic philosophy, simple ethical concepts, basic reasoning',
//         '6-8': 'philosophy basics, ethical reasoning, basic logical thinking',
//         '9-12': 'advanced philosophy, ethical theory, complex logical reasoning'
//       },
//       [GraphQLTopic.History]: {
//         '1-3': 'basic historical concepts, simple timelines, basic stories',
//         '4-5': 'basic history, simple historical events, basic timelines',
//         '6-8': 'history fundamentals, historical analysis, basic research',
//         '9-12': 'advanced history, historical analysis, complex research methods'
//       },
//       [GraphQLTopic.Geography]: {
//         '1-3': 'basic geography, simple maps, basic locations',
//         '4-5': 'basic geography, simple map reading, basic location concepts',
//         '6-8': 'geography fundamentals, map reading, basic geographic analysis',
//         '9-12': 'advanced geography, geographic analysis, complex spatial concepts'
//       },
//       [GraphQLTopic.Economics]: {
//         '1-3': 'basic economic concepts, simple money concepts, basic trade',
//         '4-5': 'basic economics, simple financial concepts, basic market ideas',
//         '6-8': 'economics basics, financial literacy, basic market concepts',
//         '9-12': 'advanced economics, financial systems, complex market analysis'
//       }
//     };

//     const gradeRange = this.getGradeRange(gradeNumber);
//     const mapping = topicMappings[topic]?.[gradeRange];
    
//     return mapping || `${this.mapTopicToString(topic)} (adapted for Grade ${gradeNumber})`;
//   }

//   private static getGradeNumber(classType: GraphQLClassType): number {
//     switch (classType) {
//       case GraphQLClassType.Grade_1: return 1;
//       case GraphQLClassType.Grade_2: return 2;
//       case GraphQLClassType.Grade_3: return 3;
//       case GraphQLClassType.Grade_4: return 4;
//       case GraphQLClassType.Grade_5: return 5;
//       case GraphQLClassType.Grade_6: return 6;
//       case GraphQLClassType.Grade_7: return 7;
//       case GraphQLClassType.Grade_8: return 8;
//       case GraphQLClassType.Grade_9: return 9;
//       case GraphQLClassType.Grade_10: return 10;
//       case GraphQLClassType.Grade_11: return 11;
//       case GraphQLClassType.Grade_12: return 12;
//       default: return 5;
//     }
//   }

//   private static getGradeRange(gradeNumber: number): string {
//     if (gradeNumber <= 3) return '1-3';
//     if (gradeNumber <= 5) return '4-5';
//     if (gradeNumber <= 8) return '6-8';
//     return '9-12';
//   }

//   private static buildAnswerPrompt(taskData: {
//     title: string;
//     description: string;
//     problemStatement: string;
//     topic: string;
//     difficulty: string;
//     type: string;
//   }): string {
//     return `
// You are an expert competitive programming problem solver. Generate a complete solution for the following problem:

// Title: ${taskData.title}
// Description: ${taskData.description}
// Topic: ${taskData.topic}
// Difficulty: ${taskData.difficulty}
// Type: ${taskData.type}

// Problem Statement:
// ${taskData.problemStatement}

// Requirements:
// 1. Provide the correct answer/result
// 2. Include a detailed step-by-step solution explaining the approach
// 3. Provide 3-5 test cases with input, expected output, and explanations
// 4. Consider the difficulty level when providing the solution complexity

// IMPORTANT: Return ONLY valid JSON in this exact format (no additional text, no markdown, no code blocks):
// {
//   "answer": "The final answer or result",
//   "solution": "Detailed step-by-step solution explaining the approach, algorithm, and reasoning",
//   "testCases": [
//     {
//       "input": "test input 1",
//       "expectedOutput": "expected output 1",
//       "explanation": "explanation of why this output is correct"
//     },
//     {
//       "input": "test input 2", 
//       "expectedOutput": "expected output 2",
//       "explanation": "explanation of why this output is correct"
//     },
//     {
//       "input": "test input 3",
//       "expectedOutput": "expected output 3", 
//       "explanation": "explanation of why this output is correct"
//     }
//   ]
// }
//     `;
//   }

//   private static parseAnswerResponse(response: string): GeneratedAnswerResponse {
//     try {
//       let cleanedResponse = response
//         .replace(/```json\n?/g, '')
//         .replace(/```\n?$/g, '')
//         .replace(/^```/g, '')
//         .trim();
      
//       const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         cleanedResponse = jsonMatch[0];
//       }
      
//       const parseJSON = (jsonString: string) => {
//         try {
//           return JSON.parse(jsonString);
//         } catch (error) {
//           let cleaned = jsonString
//             .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
//             .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
//             .replace(/([^\\])\\([^"\\\/bfnrt])/g, '$1\\\\$2'); // Fix unescaped backslashes
          
//           return JSON.parse(cleaned);
//         }
//       };
      
//       const parsed = parseJSON(cleanedResponse);
      
//       if (!parsed.answer || !parsed.solution || !parsed.testCases) {
//         throw new Error('Invalid AI response format - missing answer, solution, or testCases');
//       }
      
//       return parsed;
//     } catch (error) {
//       console.error('Error parsing AI answer response:', error);
//       console.error('Raw response:', response);
      
//       try {
//         const answerMatch = response.match(/"answer":\s*"([^"]+)"/);
//         const solutionMatch = response.match(/"solution":\s*"([^"]+)"/);
        
//         if (answerMatch && solutionMatch) {
//           console.log('🔄 Using fallback parsing for AI answer response');
//           return {
//             answer: answerMatch[1],
//             solution: solutionMatch[1],
//             testCases: []
//           };
//         }
//       } catch (fallbackError) {
//         console.error('Fallback parsing also failed:', fallbackError);
//       }
      
//       throw new Error('Failed to parse AI answer response');
//     }
//   }
// }
