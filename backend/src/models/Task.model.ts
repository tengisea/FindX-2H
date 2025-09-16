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

 export enum ClassType {
  GRADE_1 = "GRADE_1",
  GRADE_2 = "GRADE_2",
  GRADE_3 = "GRADE_3",
  GRADE_4 = "GRADE_4",
  GRADE_5 = "GRADE_5",
  GRADE_6 = "GRADE_6",
  GRADE_7 = "GRADE_7",
  GRADE_8 = "GRADE_8",
  GRADE_9 = "GRADE_9",
  GRADE_10 = "GRADE_10",
  GRADE_11 = "GRADE_11",
  GRADE_12 = "GRADE_12",
}

type TaskSchemaType = {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: Difficulty;
  type: TaskType;
  classType: ClassType;
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
    classType: { type: String, enum: Object.values(ClassType), required: true },
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
