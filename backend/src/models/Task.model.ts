import { Model, model, models, Schema } from "mongoose";

 export enum TaskType {
  CHALLENGE = "CHALLENGE",
  TOURNAMENT = "TOURNAMENT",
}

 export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

type TaskSchemaType = {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
  type: TaskType;
  piPoints: number; 
  aiGenerated: boolean;
  generatedAt: Date;
  usageCount: number;
  problemStatement: string;
  createdAt: Date;
  updatedAt: Date;
};

 export const taskSchema = new Schema<TaskSchemaType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, enum: Object.values(Difficulty), required: true },
    type: { type: String, enum: Object.values(TaskType), required: true },
    piPoints: { type: Number, required: true },
    problemStatement: { type: String, required: false, default: '' },
    aiGenerated: { type: Boolean, default: true },
    generatedAt: { type: Date, default: Date.now },
    usageCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const TaskModel: Model<TaskSchemaType> =
  models["Task"] || model("Task", taskSchema);
