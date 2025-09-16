import { model, Schema, models } from "mongoose";
const challengeRoomResponseSchema = new Schema({
    challengeRoomId: {
        type: Schema.Types.ObjectId,
        ref: "ChallengeRoom",
        required: true,
    },
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    submittedAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    points: { type: Number, required: true },
    submittedAt: { type: Date, required: true },
}, { timestamps: true });
export const ChallengeRoomResponseModel = models["ChallengeRoomResponse"] ||
    model("ChallengeRoomResponse", challengeRoomResponseSchema);
