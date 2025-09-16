import { model, models, Schema } from "mongoose";
var Status;
(function (Status) {
    Status["WAITING"] = "WAITING";
    Status["ACTIVE"] = "ACTIVE";
    Status["FINISHED"] = "FINISHED";
})(Status || (Status = {}));
const challengeRoomSchema = new Schema({
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
}, { timestamps: true });
export const ChallengeRoomModel = models["ChallengeRoom"] || model("ChallengeRoom", challengeRoomSchema);
