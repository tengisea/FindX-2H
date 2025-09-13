import { Model, model, models, Schema } from "mongoose";

type QuestionSchemaType = {
  classTypeId: Schema.Types.ObjectId;
  questionNumber: number;
  maxScore: number;
};

const questionSchema = new Schema<QuestionSchemaType>(
  {
    classTypeId: { type: Schema.Types.ObjectId, ref: "ClassType", required: true },
    questionNumber: { type: Number, required: true },
    maxScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export const QuestionModel: Model<QuestionSchemaType> =
  models["Question"] || model("Question", questionSchema);
