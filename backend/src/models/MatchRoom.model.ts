import { Model, model, models, Schema } from "mongoose";

type MatchRoomSchemaType = {
  matchId: Schema.Types.ObjectId;
  participants: [Schema.Types.ObjectId];
  task: string;
  submissions: [Schema.Types.ObjectId];
  status: string;
  winner: Schema.Types.ObjectId;
  startedAt: Date;
  endedAt: Date;
};

const matchRoomSchema = new Schema<MatchRoomSchemaType>({
  matchId: Schema.Types.ObjectId,
  participants: [Schema.Types.ObjectId],
  task: String,
  submissions: [Schema.Types.ObjectId],
  status: String,
  winner: Schema.Types.ObjectId,
  startedAt: Date,
  endedAt: Date,
});

export const MatchRoomModel: Model<MatchRoomSchemaType> =
  models["MatchRoom"] || model("MatchRoom", matchRoomSchema);
