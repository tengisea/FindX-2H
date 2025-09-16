import { Model, model, models, Schema } from "mongoose";

type QuestionSchemaType = {
  classTypeId: Schema.Types.ObjectId;
  questionName: string;
  maxScore: number;
};

const questionSchema = new Schema<QuestionSchemaType>(
  {
    classTypeId: { type: Schema.Types.ObjectId, ref: "ClassType", required: true },
    questionName: { type: String, required: true },
    maxScore: { type: Number, required: true },
  },
  { timestamps: true }
);

export const QuestionModel: Model<QuestionSchemaType> =
  models["Question"] || model("Question", questionSchema);
