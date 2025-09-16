import { TaskModel } from "@/models/Task.model";
import { TaskType as ModelTaskType, Difficulty as ModelDifficulty, ClassType as ModelClassType } from "@/models/Task.model";
import { Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType, Topic as GraphQLTopic, TaskClassType as GraphQLClassType } from "@/types/generated";
export class TaskUtilsService {
    static mapDifficultyToModel(difficulty) {
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
    static mapTaskTypeToModel(type) {
        switch (type) {
            case GraphQLTaskType.Challenge:
                return ModelTaskType.CHALLENGE;
            case GraphQLTaskType.Tournament:
                return ModelTaskType.TOURNAMENT;
            default:
                return ModelTaskType.CHALLENGE;
        }
    }
    static mapClassTypeToModel(classType) {
        switch (classType) {
            case GraphQLClassType.Grade_1:
                return ModelClassType.GRADE_1;
            case GraphQLClassType.Grade_2:
                return ModelClassType.GRADE_2;
            case GraphQLClassType.Grade_3:
                return ModelClassType.GRADE_3;
            case GraphQLClassType.Grade_4:
                return ModelClassType.GRADE_4;
            case GraphQLClassType.Grade_5:
                return ModelClassType.GRADE_5;
            case GraphQLClassType.Grade_6:
                return ModelClassType.GRADE_6;
            case GraphQLClassType.Grade_7:
                return ModelClassType.GRADE_7;
            case GraphQLClassType.Grade_8:
                return ModelClassType.GRADE_8;
            case GraphQLClassType.Grade_9:
                return ModelClassType.GRADE_9;
            case GraphQLClassType.Grade_10:
                return ModelClassType.GRADE_10;
            case GraphQLClassType.Grade_11:
                return ModelClassType.GRADE_11;
            case GraphQLClassType.Grade_12:
                return ModelClassType.GRADE_12;
            default:
                return ModelClassType.GRADE_5;
        }
    }
    static mapTopicToString(topic) {
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
    static transformToGraphQLTask(taskDoc, originalDifficulty, originalTopic, originalClassType) {
        return {
            __typename: 'Task',
            id: taskDoc._id.toString(),
            title: taskDoc.title,
            description: taskDoc.description,
            topic: originalTopic,
            difficulty: originalDifficulty,
            type: taskDoc.type === ModelTaskType.CHALLENGE ? GraphQLTaskType.Challenge : GraphQLTaskType.Tournament,
            classType: originalClassType,
            piPoints: taskDoc.piPoints,
            problemStatement: this.formatProblemStatement(taskDoc.problemStatement || ''),
            aiGenerated: taskDoc.aiGenerated,
            generatedAt: taskDoc.generatedAt,
            usageCount: taskDoc.usageCount,
            createdAt: taskDoc.createdAt || new Date(),
            updatedAt: taskDoc.updatedAt || new Date()
        };
    }
    static formatProblemStatement(problemStatement) {
        return problemStatement.replace(/\\n/g, '\n');
    }
    static async createTaskInDatabase(content, request, aiGenerated) {
        const modelDifficulty = this.mapDifficultyToModel(request.difficulty);
        const modelType = this.mapTaskTypeToModel(request.type);
        const modelClassType = this.mapClassTypeToModel(request.classType);
        const topicString = this.mapTopicToString(request.topic);
        return await TaskModel.create({
            title: content.title,
            description: content.description,
            topic: topicString,
            difficulty: modelDifficulty,
            type: modelType,
            classType: modelClassType,
            piPoints: request.piPoints,
            problemStatement: content.problemStatement || '',
            aiGenerated: aiGenerated,
            generatedAt: new Date(),
            usageCount: 0
        });
    }
    static calculateDifficultyDistribution(taskCount, difficultyDistribution) {
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
