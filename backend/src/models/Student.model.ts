import { Model, model, models, Schema } from "mongoose";
import {
  StudentClass,
  StudentProvince,
  StudentRegion,
} from "@/types/generated";

type StudentSchemaType = {
  school: string;
  class: StudentClass;
  name: string;
  profilePicture: string;
  email: string;
  province: StudentProvince;
  region: StudentRegion;
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
    province: {
      type: String,
      enum: Object.values(StudentProvince),
      required: true,
    },
    region: {
      type: String,
      enum: Object.values(StudentRegion),
      required: true,
    },
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

// Add indexes for better query performance
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ class: 1 });
studentSchema.index({ province: 1 });
studentSchema.index({ region: 1 });
studentSchema.index({ school: 1 });
studentSchema.index({ ranking: 1 });

export const StudentModel: Model<StudentSchemaType> =
  models["Student"] || model("Student", studentSchema);
