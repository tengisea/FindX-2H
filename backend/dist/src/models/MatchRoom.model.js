import { model, models, Schema } from "mongoose";
const matchRoomSchema = new Schema({
    matchId: Schema.Types.ObjectId,
    participants: [Schema.Types.ObjectId],
    task: String,
    submissions: [Schema.Types.ObjectId],
    status: String,
    winner: Schema.Types.ObjectId,
    startedAt: Date,
    endedAt: Date,
});
export const MatchRoomModel = models["MatchRoom"] || model("MatchRoom", matchRoomSchema);
