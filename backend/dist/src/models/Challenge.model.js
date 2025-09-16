import { model, models, Schema } from "mongoose";
var Difficulty;
(function (Difficulty) {
    Difficulty["EASY"] = "EASY";
    Difficulty["MEDIUM"] = "MEDIUM";
    Difficulty["HARD"] = "HARD";
})(Difficulty || (Difficulty = {}));
var Status;
(function (Status) {
    Status["PENDING"] = "PENDING";
    Status["COMPLETED"] = "COMPLETED";
    Status["CANCELLED"] = "CANCELLED";
})(Status || (Status = {}));
const challengeSchema = new Schema({
    topic: { type: String, required: true },
    difficulty: {
        type: String,
        enum: Object.values(Difficulty),
        required: true,
    },
    participants: {
        type: [{ type: Schema.Types.ObjectId, ref: "Student" }],
        required: true,
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: false,
        default: null,
    },
    piPoints: { type: Number, required: true, default: 0 },
    status: {
        type: String,
        enum: Object.values(Status),
        required: true,
        default: Status.PENDING,
    },
    challenger: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    opponent: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    tasks: {
        type: [{ type: Schema.Types.ObjectId, ref: "Task" }],
        required: false,
        default: [],
    },
    classType: { type: String, required: false },
}, { timestamps: true });
export const ChallengeModel = models["Challenge"] || model("Challenge", challengeSchema);
