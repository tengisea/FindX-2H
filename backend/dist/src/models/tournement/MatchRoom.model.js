import { model, models, Schema } from "mongoose";
export var MatchStatus;
(function (MatchStatus) {
    MatchStatus["PENDING"] = "PENDING";
    MatchStatus["COMPLETED"] = "COMPLETED";
})(MatchStatus || (MatchStatus = {}));
const matchRoomSchema = new Schema({
    task: { type: String, required: true },
    round: { type: String, required: true },
    scheduleAt: { type: Date, required: true },
    slotA: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    slotB: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    winner: { type: Schema.Types.ObjectId, ref: "Student" },
    loser: { type: Schema.Types.ObjectId, ref: "Student" },
    tournament: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
    status: {
        type: String,
        enum: Object.values(MatchStatus),
        default: MatchStatus.PENDING,
        required: true,
    },
}, { timestamps: true } // Create болон update цагийг автоматаар хадгалах
);
export const MatchRoomModel = models["MatchRoom"] || model("MatchRoom", matchRoomSchema);
