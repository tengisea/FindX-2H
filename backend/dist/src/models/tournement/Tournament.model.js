import { model, models, Schema } from "mongoose";
var Status;
(function (Status) {
    Status["OPENING"] = "OPENING";
    Status["ONGOING"] = "ONGOING";
    Status["FINISHED"] = "FINISHED";
})(Status || (Status = {}));
const tournamentSchema = new Schema({
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
}, { timestamps: true });
export const TournamentModel = models["Tournament"] || model("Tournament", tournamentSchema);
