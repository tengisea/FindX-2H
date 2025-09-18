import { Model, model, models, Schema } from "mongoose";

export enum ClassYear {
  GRADE_1 = "1р анги",
  GRADE_2 = "2р анги",
  GRADE_3 = "3р анги",
  GRADE_4 = "4р анги",
  GRADE_5 = "5р анги",
  GRADE_6 = "6р анги",
  GRADE_7 = "7р анги",
  GRADE_8 = "8р анги",
  GRADE_9 = "9р анги",
  GRADE_10 = "10р анги",
  GRADE_11 = "11р анги",
  GRADE_12 = "12р анги",
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
  questions: Schema.Types.ObjectId[];
  participants: Schema.Types.ObjectId[];
  studentsAnswers: Schema.Types.ObjectId[];
  medalists: number;
  gold: Schema.Types.ObjectId[];
  silver: Schema.Types.ObjectId[];
  bronze: Schema.Types.ObjectId[];
  top10: Schema.Types.ObjectId[];
  bestMaterials: {
    studentId: Schema.Types.ObjectId;
    materialImages: string[];
    description: string;
  }[];
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
