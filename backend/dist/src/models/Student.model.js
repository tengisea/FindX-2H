import { model, models, Schema } from "mongoose";
const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    school: { type: String, required: true },
    class: { type: String, required: true },
    location: { type: String, required: true },
    profilePicture: { type: String, required: true },
    totalScore: { type: Number, required: true, default: 0 },
    piPoints: { type: Number, required: true, default: 1000 },
    participatedOlympiads: [
        { type: Schema.Types.ObjectId, ref: "Olympiad", required: true, default: [] },
    ],
}, { timestamps: true });
export const StudentModel = models["Student"] || model("Student", studentSchema);
