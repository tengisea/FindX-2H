import { model, models, Schema } from "mongoose";
const questionSchema = new Schema({
    classTypeId: { type: Schema.Types.ObjectId, ref: "ClassType", required: true },
    questionName: { type: String, required: true },
    maxScore: { type: Number, required: true },
}, { timestamps: true });
export const QuestionModel = models["Question"] || model("Question", questionSchema);
