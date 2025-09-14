import { Model, model, models, Schema } from "mongoose";

enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

type ChallengeSchemaType = {
  topic: string;
  difficulty: Difficulty;
  participants: Schema.Types.ObjectId[];
  challenger: Schema.Types.ObjectId;
  opponent: Schema.Types.ObjectId;
  winner: Schema.Types.ObjectId;
  piPoints: number;
  status: Status;
};

const challengeSchema = new Schema<ChallengeSchemaType>(
  {
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: Object.values(Difficulty),
      required: true,
    },
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: "Student" }],
      required: true,
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: false,
      default: null,
    },
    piPoints: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: Status.PENDING,
    },
    challenger: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    opponent: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  },
  { timestamps: true }
);

export const ChallengeModel: Model<ChallengeSchemaType> =
  models["Challenge"] || model("Challenge", challengeSchema);
