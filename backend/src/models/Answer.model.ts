import { Model, model, models, Schema } from "mongoose";

export enum AnswerFormat {
  SINGLE_NUMBER = "SINGLE_NUMBER",
  SINGLE_WORD = "SINGLE_WORD",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  SHORT_TEXT = "SHORT_TEXT",
  LONG_TEXT = "LONG_TEXT",
  CODE_SOLUTION = "CODE_SOLUTION",
  DRAWING = "DRAWING",
  TRUE_FALSE = "TRUE_FALSE",
}

type MultipleChoiceOption = {
  letter: string;
  text: string;
  isCorrect: boolean;
};

type AnswerValidation = {
  format: AnswerFormat;
  correctAnswers: string[];
  multipleChoiceOptions?: MultipleChoiceOption[];
  partialCreditAnswers?: string[];
  validationRules?: string;
};

type AnswerSchemaType = {
  id: string;
  taskId: string;
  answer: string;
  solution: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
    explanation?: string;
  }>;
  answerValidation: AnswerValidation;
  aiGenerated: boolean;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const answerSchema = new Schema<AnswerSchemaType>(
  {
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
  },
  { timestamps: true }
);

export const AnswerModel: Model<AnswerSchemaType> =
  models["Answer"] || model("Answer", answerSchema);
