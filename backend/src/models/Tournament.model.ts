import { Model, model, models, Schema } from "mongoose";

enum Status {
  OPEN = "OPEN",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

type TournamentSchemaType = {
  id: string;
  name: string;
  description: string;
  date: Date;
  size: number;
  maxScore: number;
  rounds: [];
  participants: Schema.Types.ObjectId[];
  status: Status;
  winner: Schema.Types.ObjectId;
};

type RoundSchemaType = {
  id: string;
  roundNumber: number;
  matches: [Schema.Types.ObjectId, Schema.Types.ObjectId];
};

const tournamentSchema = new Schema<TournamentSchemaType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "Student",
      required: true,
    },
    winner: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  },
  { timestamps: true }
);

const roundSchema = new Schema<RoundSchemaType>(
  {
    roundNumber: { type: Number, required: true },
    matches: {
      type: [Schema.Types.ObjectId],
      ref: "MatchRoom",
      required: true,
    },
  },
  { timestamps: true }
);

export const TournamentModel: Model<TournamentSchemaType> =
  models["Tournament"] || model("Tournament", tournamentSchema);

export const RoundModel: Model<RoundSchemaType> =
  models["Round"] || model("Round", roundSchema);
