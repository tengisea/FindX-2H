import { Model, model, models, Schema } from "mongoose";

export enum ClassYear {
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
  C_CLASS = "C_CLASS",
  D_CLASS = "D_CLASS",
  E_CLASS = "E_CLASS",
  F_CLASS = "F_CLASS",
}



const bestMaterialSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    materialImages: [String],
    description: String,
  },
  { _id: false }
);

type ClassTypeSchemaType = {
  olympiadId: Schema.Types.ObjectId;
  classYear: ClassYear;
  maxScore: number;
  occurringTime?: String;
  classRoom?: Schema.Types.ObjectId;
  questions: Schema.Types.ObjectId[];
  participants?: Schema.Types.ObjectId[];
  studentsAnswers?: Schema.Types.ObjectId[];
  medalists: number;
  gold?: Schema.Types.ObjectId[];
  silver?: Schema.Types.ObjectId[];
  bronze?: Schema.Types.ObjectId[];
  top10?: Schema.Types.ObjectId[];
  bestMaterials?: {
    studentId: Schema.Types.ObjectId;
    materialImages: string[];
    description: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

const classTypeSchema = new Schema<ClassTypeSchemaType>(
  {
    olympiadId: {
      type: Schema.Types.ObjectId,
      ref: "Olympiad",
      required: true,
    },
    classYear: { type: String, enum: Object.values(ClassYear), required: true },
    maxScore: { type: Number, required: true },
    occurringTime: { type: String },
    classRoom: { type: Schema.Types.ObjectId, ref: "ClassRoom"},
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    participants: [
      { type: Schema.Types.ObjectId, ref: "Student", default: [] },
    ],
    studentsAnswers: [
      { type: Schema.Types.ObjectId, ref: "StudentAnswer", default: [] },
    ],
    medalists: { type: Number, required: true },
    gold: [{ type: Schema.Types.ObjectId, ref: "Student", default: [] }],
    silver: [{ type: Schema.Types.ObjectId, ref: "Student", default: [] }],
    bronze: [{ type: Schema.Types.ObjectId, ref: "Student", default: [] }],
    top10: [{ type: Schema.Types.ObjectId, ref: "Student", default: [] }],
    bestMaterials: [bestMaterialSchema],
  },
  { timestamps: true }
);

export const ClassTypeModel: Model<ClassTypeSchemaType> =
  models["ClassType"] || model("ClassType", classTypeSchema);
