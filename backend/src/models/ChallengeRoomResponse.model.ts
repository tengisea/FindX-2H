import { model, Schema, Model, models } from "mongoose";

type ChallengeRoomResponseSchemaType = {
  challengeRoomId: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  submittedAnswer: string;
  isCorrect: boolean;
  points: number;
  submittedAt: Date;
};

const challengeRoomResponseSchema = new Schema<ChallengeRoomResponseSchemaType>(
  {
    challengeRoomId: {
      type: Schema.Types.ObjectId,
      ref: "ChallengeRoom",
      required: true,
    },
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    submittedAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    points: { type: Number, required: true },
    submittedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ChallengeRoomResponseModel: Model<ChallengeRoomResponseSchemaType> =
  models["ChallengeRoomResponse"] ||
  model("ChallengeRoomResponse", challengeRoomResponseSchema);
