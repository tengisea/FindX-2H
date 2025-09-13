import { TaskModel } from "@/models/Task.model";
import { TaskType as ModelTaskType, Difficulty as ModelDifficulty } from "@/models/Task.model";
import { Task, Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType, Topic as GraphQLTopic } from "@/types/generated";
import { GeneratedTaskResponse } from "./ai.service";

export interface TaskGenerationRequest {
  topic: GraphQLTopic;
  difficulty: GraphQLDifficulty;
  type: GraphQLTaskType;
  piPoints: number;
  taskCount?: number;
}

export interface DifficultyDistribution {
  easy?: number;
  medium?: number;
  hard?: number;
}

export interface MultipleTaskGenerationRequest {
  topic: GraphQLTopic;
  type: GraphQLTaskType;
  piPoints: number;
  taskCount: number;
  difficultyDistribution?: DifficultyDistribution;
}

export class TaskUtilsService {
  static mapDifficultyToModel(difficulty: GraphQLDifficulty): ModelDifficulty {
    switch (difficulty) {
      case GraphQLDifficulty.Easy:
        return ModelDifficulty.EASY;
      case GraphQLDifficulty.Medium:
        return ModelDifficulty.MEDIUM;
      case GraphQLDifficulty.Hard:
        return ModelDifficulty.HARD;
      default:
        return ModelDifficulty.EASY;
    }
  }

  static mapTaskTypeToModel(type: GraphQLTaskType): ModelTaskType {
    switch (type) {
      case GraphQLTaskType.Challenge:
        return ModelTaskType.CHALLENGE;
      case GraphQLTaskType.Tournament:
        return ModelTaskType.TOURNAMENT;
      default:
        return ModelTaskType.CHALLENGE;
    }
  }

  static mapTopicToString(topic: GraphQLTopic): string {
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

  static transformToGraphQLTask(taskDoc: any, originalDifficulty: GraphQLDifficulty, originalTopic: GraphQLTopic): Task {
    return {
      __typename: 'Task',
      id: taskDoc._id.toString(),
      title: taskDoc.title,
      description: taskDoc.description,
      topic: originalTopic,
      difficulty: originalDifficulty,
      type: taskDoc.type === ModelTaskType.CHALLENGE ? GraphQLTaskType.Challenge : GraphQLTaskType.Tournament,
      piPoints: taskDoc.piPoints,
      problemStatement: this.formatProblemStatement(taskDoc.problemStatement || ''),
      aiGenerated: taskDoc.aiGenerated,
      generatedAt: taskDoc.generatedAt,
      usageCount: taskDoc.usageCount,
      createdAt: (taskDoc as any).createdAt || new Date(),
      updatedAt: (taskDoc as any).updatedAt || new Date()
    };
  }

  static formatProblemStatement(problemStatement: string): string {
    return problemStatement.replace(/\\n/g, '\n');
  }

  static async createTaskInDatabase(
    content: GeneratedTaskResponse,
    request: TaskGenerationRequest,
    aiGenerated: boolean
  ): Promise<any> {
    const modelDifficulty = this.mapDifficultyToModel(request.difficulty);
    const modelType = this.mapTaskTypeToModel(request.type);
    const topicString = this.mapTopicToString(request.topic);
    
    return await TaskModel.create({
      title: content.title,
      description: content.description,
      topic: topicString,
      difficulty: modelDifficulty,
      type: modelType,
      piPoints: request.piPoints,
      problemStatement: content.problemStatement || '',
      aiGenerated: aiGenerated,
      generatedAt: new Date(),
      usageCount: 0
    });
  }

  static calculateDifficultyDistribution(
    taskCount: number,
    difficultyDistribution?: DifficultyDistribution
  ): { difficulty: GraphQLDifficulty; count: number }[] {
    if (!difficultyDistribution) {
      const countPerDifficulty = Math.floor(taskCount / 3);
      const remainder = taskCount % 3;
      
      return [
        { difficulty: GraphQLDifficulty.Easy, count: countPerDifficulty + (remainder > 0 ? 1 : 0) },
        { difficulty: GraphQLDifficulty.Medium, count: countPerDifficulty + (remainder > 1 ? 1 : 0) },
        { difficulty: GraphQLDifficulty.Hard, count: countPerDifficulty }
      ];
    }

    const { easy = 0, medium = 0, hard = 0 } = difficultyDistribution;
    const totalSpecified = easy + medium + hard;
    
    if (totalSpecified === 0) {
      return this.calculateDifficultyDistribution(taskCount);
    }

    if (totalSpecified !== taskCount) {
      const scale = taskCount / totalSpecified;
      return [
        { difficulty: GraphQLDifficulty.Easy, count: Math.round(easy * scale) },
        { difficulty: GraphQLDifficulty.Medium, count: Math.round(medium * scale) },
        { difficulty: GraphQLDifficulty.Hard, count: Math.round(hard * scale) }
      ];
    }

    return [
      { difficulty: GraphQLDifficulty.Easy, count: easy },
      { difficulty: GraphQLDifficulty.Medium, count: medium },
      { difficulty: GraphQLDifficulty.Hard, count: hard }
    ].filter(item => item.count > 0);
  }
}
