import { TaskGeneratorService } from "@/services/taskGenerator.service";
import { AnswerGeneratorService } from "@/services/answer-generator.service";
import { AnswerModel } from "@/models/Answer.model";
import { GraphQLError } from "graphql";
export const generateTask = async (_, { input }) => {
    try {
        if (input.piPoints < 1) {
            throw new GraphQLError("PiPoints must be at least 1");
        }
        const generatedTask = await TaskGeneratorService.generateTask({
            topic: input.topic,
            difficulty: input.difficulty,
            type: input.type,
            classType: input.classType,
            piPoints: input.piPoints,
            answerFormat: input.answerFormat
        });
        // Generate answer automatically after task generation
        console.log('🤖 Auto-generating answer for task...');
        try {
            // Map model types to GraphQL types
            const { topic, classType } = AnswerGeneratorService.mapModelToGraphQLTypes(generatedTask.topic, generatedTask.classType);
            const answerData = await AnswerGeneratorService.generateAnswerFormat({
                topic,
                classType,
                title: generatedTask.title,
                description: generatedTask.description,
                problemStatement: generatedTask.problemStatement || ''
            });
            // Save answer to database
            const newAnswer = new AnswerModel({
                taskId: generatedTask.id,
                answer: answerData.answer,
                solution: answerData.solution,
                testCases: answerData.testCases,
                answerValidation: answerData.answerValidation,
                aiGenerated: true,
                generatedAt: new Date()
            });
            await newAnswer.save();
            console.log('✅ Answer auto-generated and saved successfully');
        }
        catch (answerError) {
            console.error('⚠️ Failed to auto-generate answer:', answerError);
            // Don't fail the task generation if answer generation fails
        }
        return generatedTask;
    }
    catch (error) {
        console.error('Error generating task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new GraphQLError(`Failed to generate task: ${errorMessage}`);
    }
};
