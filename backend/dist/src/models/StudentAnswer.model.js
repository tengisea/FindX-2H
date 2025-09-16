import { model, models, Schema } from "mongoose";
const studentAnswerSchema = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    classTypeId: { type: Schema.Types.ObjectId, ref: "ClassType", required: true },
    answers: [
        {
            questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
            score: { type: Number, required: true },
        },
    ],
    totalScoreofOlympiad: { type: Number, default: 0 },
}, { timestamps: true });
export const StudentAnswerModel = models["StudentAnswer"] || model("StudentAnswer", studentAnswerSchema);
