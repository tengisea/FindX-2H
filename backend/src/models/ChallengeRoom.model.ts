import { Model, model, models, Schema } from "mongoose";

enum Status {
  WAITING = "WAITING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
type ChallengeRoomSchemaType = {
  challengeId: Schema.Types.ObjectId;
  challengerId: Schema.Types.ObjectId;
  opponentId: Schema.Types.ObjectId;
  status: Status;
  winnerId: Schema.Types.ObjectId;
  challengerScore: number;
  opponentScore: number;
};


const challengeRoomSchema = new Schema<ChallengeRoomSchemaType>(
  {
    challengeId: { type: Schema.Types.ObjectId, ref: "Challenge", required: true },
    challengerId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    opponentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    status: { type: String, required: true },
    winnerId: { type: Schema.Types.ObjectId, required: true },
    challengerScore: { type: Number, required: true },
    opponentScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export const ChallengeRoomModel: Model<ChallengeRoomSchemaType> =
  models["ChallengeRoom"] || model("ChallengeRoom", challengeRoomSchema);