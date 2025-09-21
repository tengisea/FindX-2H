import { Model, model, models, Schema } from "mongoose";

type StudentAnswerSchemaType = {
  studentId: Schema.Types.ObjectId;
  classTypeId: Schema.Types.ObjectId;
  mandatNumber: String;
  roomNumber?: number;
  answers: {
    questionId: Schema.Types.ObjectId;
    score: number;
    description: string;
  }[];
  totalScoreofOlympiad?: number;
  image: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

const studentAnswerSchema = new Schema<StudentAnswerSchemaType>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    classTypeId: {
      type: Schema.Types.ObjectId,
      ref: "ClassType",
      required: true,
    },
    mandatNumber: { type: String, required: true },
    roomNumber: { type: Number },
    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        score: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
    totalScoreofOlympiad: { type: Number, default: 0 },
    image: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const StudentAnswerModel: Model<StudentAnswerSchemaType> =
  models["StudentAnswer"] || model("StudentAnswer", studentAnswerSchema);
