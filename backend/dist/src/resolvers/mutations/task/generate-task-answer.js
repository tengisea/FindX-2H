import { TaskModel } from "@/models/Task.model";
import { AnswerModel } from "@/models/Answer.model";
import { AnswerGeneratorService } from "@/services/answer-generator.service";
import { GraphQLError } from "graphql";
export const generateTaskAnswer = async (_, { taskId }) => {
    var _a, _b, _c, _d;
    try {
        console.log(`🔍 Looking for task with ID: ${taskId}`);
        // Find the task by ID
        const task = await TaskModel.findById(taskId);
        if (!task) {
            throw new GraphQLError(`Task with ID ${taskId} not found`);
        }
        console.log(`✅ Found task: ${task.title}`);
        // Check if task already has an answer
        const existingAnswer = await AnswerModel.findOne({ taskId });
        if (existingAnswer) {
            console.log(`⚠️ Task ${taskId} already has an answer`);
            return {
                id: existingAnswer._id.toString(),
                taskId: existingAnswer.taskId,
                answer: existingAnswer.answer,
                solution: existingAnswer.solution,
                testCases: (_a = existingAnswer.testCases) === null || _a === void 0 ? void 0 : _a.map(tc => ({
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                    explanation: tc.explanation || undefined
                })),
                answerValidation: {
                    format: existingAnswer.answerValidation.format,
                    correctAnswers: existingAnswer.answerValidation.correctAnswers,
                    multipleChoiceOptions: (_b = existingAnswer.answerValidation.multipleChoiceOptions) === null || _b === void 0 ? void 0 : _b.map(opt => ({
                        letter: opt.letter,
                        text: opt.text,
                        isCorrect: opt.isCorrect
                    })),
                    partialCreditAnswers: existingAnswer.answerValidation.partialCreditAnswers,
                    validationRules: existingAnswer.answerValidation.validationRules
                },
                aiGenerated: existingAnswer.aiGenerated,
                generatedAt: existingAnswer.generatedAt,
                createdAt: existingAnswer.createdAt,
                updatedAt: existingAnswer.updatedAt
            };
        }
        // Generate answer using the new AnswerGeneratorService
        console.log('🤖 Generating answer using AnswerGeneratorService...');
        // Map model types to GraphQL types
        const { topic, classType } = AnswerGeneratorService.mapModelToGraphQLTypes(task.topic, task.classType);
        const answerData = await AnswerGeneratorService.generateAnswerFormat({
            topic,
            classType,
            title: task.title,
            description: task.description,
            problemStatement: task.problemStatement || ''
        });
        console.log('✅ AnswerGeneratorService generated answer successfully');
        // Create a new answer document
        const newAnswer = new AnswerModel({
            taskId,
            answer: answerData.answer,
            solution: answerData.solution,
            testCases: answerData.testCases,
            answerValidation: answerData.answerValidation,
            aiGenerated: true,
            generatedAt: new Date()
        });
        const savedAnswer = await newAnswer.save();
        console.log(`🎉 Successfully generated answer for task: ${task.title}`);
        // Convert Mongoose document to GraphQL type
        return {
            id: savedAnswer._id.toString(),
            taskId: savedAnswer.taskId,
            answer: savedAnswer.answer,
            solution: savedAnswer.solution,
            testCases: (_c = savedAnswer.testCases) === null || _c === void 0 ? void 0 : _c.map(tc => ({
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                explanation: tc.explanation || undefined
            })),
            answerValidation: {
                format: savedAnswer.answerValidation.format,
                correctAnswers: savedAnswer.answerValidation.correctAnswers,
                multipleChoiceOptions: (_d = savedAnswer.answerValidation.multipleChoiceOptions) === null || _d === void 0 ? void 0 : _d.map(opt => ({
                    letter: opt.letter,
                    text: opt.text,
                    isCorrect: opt.isCorrect
                })),
                partialCreditAnswers: savedAnswer.answerValidation.partialCreditAnswers,
                validationRules: savedAnswer.answerValidation.validationRules
            },
            aiGenerated: savedAnswer.aiGenerated,
            generatedAt: savedAnswer.generatedAt,
            createdAt: savedAnswer.createdAt,
            updatedAt: savedAnswer.updatedAt
        };
    }
    catch (error) {
        console.error('Error generating task answer:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new GraphQLError(`Failed to generate task answer: ${errorMessage}`);
    }
};
