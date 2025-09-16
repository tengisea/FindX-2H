import { model, models, Schema } from "mongoose";
export var AnswerFormat;
(function (AnswerFormat) {
    AnswerFormat["SINGLE_NUMBER"] = "SINGLE_NUMBER";
    AnswerFormat["SINGLE_WORD"] = "SINGLE_WORD";
    AnswerFormat["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    AnswerFormat["SHORT_TEXT"] = "SHORT_TEXT";
    AnswerFormat["LONG_TEXT"] = "LONG_TEXT";
    AnswerFormat["CODE_SOLUTION"] = "CODE_SOLUTION";
    AnswerFormat["DRAWING"] = "DRAWING";
    AnswerFormat["TRUE_FALSE"] = "TRUE_FALSE";
})(AnswerFormat || (AnswerFormat = {}));
export const answerSchema = new Schema({
    taskId: { type: String, required: true, ref: 'Task' },
    answer: { type: String, required: true },
    solution: { type: String, required: true },
    testCases: [{
            input: { type: String, required: true },
            expectedOutput: { type: String, required: true },
            explanation: { type: String, required: false }
        }],
    answerValidation: {
        format: { type: String, enum: Object.values(AnswerFormat), required: true },
        correctAnswers: [{ type: String, required: true }],
        multipleChoiceOptions: [{
                letter: { type: String, required: true },
                text: { type: String, required: true },
                isCorrect: { type: Boolean, required: true }
            }],
        partialCreditAnswers: [{ type: String }],
        validationRules: { type: String }
    },
    aiGenerated: { type: Boolean, default: true },
    generatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });
export const AnswerModel = models["Answer"] || model("Answer", answerSchema);
