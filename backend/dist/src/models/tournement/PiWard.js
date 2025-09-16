import { model, models, Schema } from "mongoose";
const piWardSchema = new Schema({
    tournamentId: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
    students: [
        {
            studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
            points: { type: Number, required: true },
            place: { type: Number, required: true },
        },
    ],
}, { timestamps: true } // createdAt, updatedAt автоматаар үүснэ
);
export const PiWardModel = models["PiWard"] || model("PiWard", piWardSchema);
