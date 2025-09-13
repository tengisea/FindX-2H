import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType } from "@/types/generated";

export interface AIGenerationRequest {
  topic: GraphQLTopic;
  difficulty: GraphQLDifficulty;
  type: GraphQLTaskType;
  piPoints: number;
}

export interface GeneratedTaskResponse {
  title: string;
  description: string;
  problemStatement?: string;
}

export class AIService {
  static async generateTask(request: AIGenerationRequest): Promise<GeneratedTaskResponse> {
    try {
      console.log('🤖 Starting AI task generation...');
      
      const prompt = this.buildPrompt(request);
      console.log('📝 Generated prompt for AI service');
      
      const response = await this.callAIService(prompt);
      console.log('✅ AI service responded successfully');
      
      const generatedContent = this.parseAIResponse(response);
      console.log('📋 Parsed AI response:', { title: generatedContent.title });
      
      return generatedContent;
    } catch (error) {
      console.error('❌ AI generation failed:', error);
      throw error;
    }
  }

  private static buildPrompt(request: AIGenerationRequest): string {
    const difficultySpecs = {
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

    const spec = difficultySpecs[request.difficulty];

    const topicString = this.mapTopicToString(request.topic);
    const difficultyString = this.mapDifficultyToString(request.difficulty);
    const typeString = this.mapTaskTypeToString(request.type);

    return `
Create a competitive programming problem for a ${typeString.toLowerCase()} worth ${request.piPoints} PiPoints.

Topic: ${topicString}
Difficulty: ${difficultyString}
Concepts to test: ${spec.concepts}
Expected complexity: ${spec.complexity}
Suggested constraints: ${spec.constraints}

Requirements:
1. Clear, engaging problem statement
2. Proper input/output format specification
3. 2-3 example test cases with explanations
4. Appropriate constraints for the difficulty level
5. Make it educational and fun

IMPORTANT: Return ONLY valid JSON in this exact format (no additional text, no markdown, no code blocks):
{
  "title": "Concise problem title",
  "description": "One-sentence problem summary",
  "problemStatement": "Complete formatted problem statement including:\\n- Problem description\\n- Input format\\n- Output format\\n- Examples with explanations\\n- Constraints\\n- All in proper competitive programming format"
}
    `;
  }

  private static async callAIService(prompt: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.');
    }

    console.log('🔑 OpenAI API key found, making request...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert competitive programming problem setter. Create educational, well-structured problems that test algorithmic thinking.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API Error:', response.status, errorText);
      
      if (response.status === 429) {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.code === 'rate_limit_exceeded') {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
      }
      
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid OpenAI response format:', data);
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;
  }

  private static parseAIResponse(response: string): GeneratedTaskResponse {
    try {
      let cleanedResponse = response
        .replace(/```json\n?/g, '')
        .replace(/```\n?$/g, '')
        .replace(/^```/g, '')
        .trim();
      
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedResponse = jsonMatch[0];
      }
      
      const parseJSON = (jsonString: string) => {
        try {
          return JSON.parse(jsonString);
        } catch (error) {
          let cleaned = jsonString
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
            .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
            .replace(/([^\\])\\([^"\\\/bfnrt])/g, '$1\\\\$2'); // Fix unescaped backslashes
          
          return JSON.parse(cleaned);
        }
      };
      
      const parsed = parseJSON(cleanedResponse);
      
      if (!parsed.title || !parsed.description) {
        throw new Error('Invalid AI response format - missing title or description');
      }
      
      return parsed;
    } catch (error) {
      console.error('Error parsing AI response:', error);
      console.error('Raw response:', response);
      
      try {
        const titleMatch = response.match(/"title":\s*"([^"]+)"/);
        const descriptionMatch = response.match(/"description":\s*"([^"]+)"/);
        const problemStatementMatch = response.match(/"problemStatement":\s*"([^"]+)"/);
        
        if (titleMatch && descriptionMatch) {
          console.log('🔄 Using fallback parsing for AI response');
          return {
            title: titleMatch[1],
            description: descriptionMatch[1],
            problemStatement: problemStatementMatch ? problemStatementMatch[1] : 'Problem statement not available'
          };
        }
      } catch (fallbackError) {
        console.error('Fallback parsing also failed:', fallbackError);
      }
      
      throw new Error('Failed to parse AI response');
    }
  }

  private static mapTopicToString(topic: GraphQLTopic): string {
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

  private static mapDifficultyToString(difficulty: GraphQLDifficulty): string {
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

  private static mapTaskTypeToString(type: GraphQLTaskType): string {
    switch (type) {
      case GraphQLTaskType.Challenge:
        return 'Challenge';
      case GraphQLTaskType.Tournament:
        return 'Tournament';
      default:
        return 'Challenge';
    }
  }
}
