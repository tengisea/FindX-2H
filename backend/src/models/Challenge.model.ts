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
  id: string;
  topic: string;
  difficulty: Difficulty;
  participants: Schema.Types.ObjectId[];
  winner: Schema.Types.ObjectId;
  piPoints: number;
  status: Status;
};

const challengeSchema = new Schema<ChallengeSchemaType>(
  {
    topic: { type: String, required: true },
    difficulty: { type: String, required: true },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "Student",
      required: true,
    },
    winner: { type: Schema.Types.ObjectId, ref: "Student", required: false },
    piPoints: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const ChallengeModel: Model<ChallengeSchemaType> =
  models["Challenge"] || model("Challenge", challengeSchema);
