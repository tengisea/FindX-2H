import { model, models, Schema } from "mongoose";
const olympiadSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "Organizer", required: true },
    classtypes: [{ type: Schema.Types.ObjectId, ref: "ClassType" }],
    scoreOfAward: { type: Number, default: null },
    status: { type: String, enum: ["PENDING", "APPROVED"], default: "PENDING" },
}, { timestamps: true });
export const OlympiadModel = models["Olympiad"] || model("Olympiad", olympiadSchema);
