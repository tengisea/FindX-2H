import { Model, model, models, Schema } from "mongoose";

enum Status {
  OPENING = "OPENING",
  ONGOING = "ONGOING",
  FINISHED = "FINISHED",
}

type TournamentSchemaType = {
  id: string;
  name: string;
  description: string;
  date: Date;
  size: number;
  maxScore: number;
  piPoints: number;
  piWards: Schema.Types.ObjectId[];
  closedAt: Date;
  rounds: Schema.Types.ObjectId[]; //
  participants: Schema.Types.ObjectId[];
  status: Status;
  topic: string;
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
    date: { type: Date, required: true },
    size: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    piPoints: { type: Number, required: true },
    piWards: { type: [Schema.Types.ObjectId], ref: "PiWard", required: true },
    closedAt: { type: Date, required: true },
    rounds: { type: [Schema.Types.ObjectId], ref: "MatchRoom", required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: Status.OPENING
    },
    topic: { type: String, required: true },
  },
  { timestamps: true }
);

export const TournamentModel: Model<TournamentSchemaType> =
  models["Tournament"] || model("Tournament", tournamentSchema);

