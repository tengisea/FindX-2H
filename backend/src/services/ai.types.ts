import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType, ClassType as GraphQLClassType, AnswerFormat as GraphQLAnswerFormat } from "@/types/generated";

export interface AIGenerationRequest {
  topic: GraphQLTopic;
  difficulty: GraphQLDifficulty;
  type: GraphQLTaskType;
  classType: GraphQLClassType;
  piPoints: number;
  answerFormat?: GraphQLAnswerFormat;
  variation?: string;
}

export interface GeneratedTaskResponse {
  title: string;
  description: string;
  problemStatement?: string;
}

export interface GeneratedAnswerResponse {
  answer: string;
  solution: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    explanation?: string;
  }>;
}

export interface DifficultySpec {
  concepts: string;
  complexity: string;
  constraints: string;
}

export interface ClassSpec {
  concepts: string;
  complexity: string;
  language: string;
}

export interface TopicMapping {
  [gradeRange: string]: string;
}

export interface TopicMappings {
  [topic: string]: TopicMapping;
}

export interface TaskData {
  title: string;
  description: string;
  problemStatement: string;
  topic: string;
  difficulty: string;
  type: string;
}
