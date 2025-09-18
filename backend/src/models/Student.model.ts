import { Model, model, models, Schema } from "mongoose";

enum StudentClass {
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

type StudentSchemaType = {
  school: string;
  class: StudentClass;
  name: string;
  profilePicture: string;
  email: string;
  province: string;
  district: string;
  ranking: number;
  participatedOlympiads: Schema.Types.ObjectId[];
  gold: Schema.Types.ObjectId[];
  silver: Schema.Types.ObjectId[];
  bronze: Schema.Types.ObjectId[];
  top10: Schema.Types.ObjectId[];
  rankingHistory: {
    changedBy: number;
    changedTo: number;
    reason: string;
    olympiadId?: Schema.Types.ObjectId;
    date: Date;
  }[];
};

const studentSchema = new Schema<StudentSchemaType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    school: { type: String, required: true },
    class: { type: String, enum: Object.values(StudentClass), required: true },
    profilePicture: { type: String, required: true },
    ranking: { type: Number, required: true, default: 0 },
    participatedOlympiads: [
      {
        type: Schema.Types.ObjectId,
        ref: "Olympiad",
        required: true,
        default: [],
      },
    ],
    gold: [
      {
        type: Schema.Types.ObjectId,
        ref: "Olympiad",
        required: true,
        default: [],
      },
    ],
    silver: [
      {
        type: Schema.Types.ObjectId,
        ref: "Olympiad",
        required: true,
        default: [],
      },
    ],
    bronze: [
      {
        type: Schema.Types.ObjectId,
        ref: "Olympiad",
        required: true,
        default: [],
      },
    ],
    top10: [
      {
        type: Schema.Types.ObjectId,
        ref: "Olympiad",
        required: true,
        default: [],
      },
    ],
    rankingHistory: [
      {
        changedBy: {
          type: Number,
          required: true,
        },
        changedTo: {
          type: Number,
          required: true,
        },
        reason: {
          type: String,
          required: true,
        },
        olympiadId: {
          type: Schema.Types.ObjectId,
          ref: "Olympiad",
          required: false,
        },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },

  { timestamps: true }
);

export const StudentModel: Model<StudentSchemaType> =
  models["Student"] || model("Student", studentSchema);
