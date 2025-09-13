import { Model, model, models, Schema } from "mongoose";

type AnswerSchemaType = {
  id: string;
  taskId: string;
  answer: string;
  solution: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    explanation?: string;
  }>;
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
    aiGenerated: { type: Boolean, default: true },
    generatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const AnswerModel: Model<AnswerSchemaType> =
  models["Answer"] || model("Answer", answerSchema);
