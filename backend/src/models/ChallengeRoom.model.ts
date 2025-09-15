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
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    challengerId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    opponentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: Status.WAITING,
    },
    winnerId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: false,
    },
    challengerScore: { type: Number, required: true, default: 0 },
    opponentScore: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const ChallengeRoomModel: Model<ChallengeRoomSchemaType> =
  models["ChallengeRoom"] || model("ChallengeRoom", challengeRoomSchema);
