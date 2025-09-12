import { Model, model, models, Schema } from "mongoose";

type StudentsResultSchemaType = {
  studentId: Schema.Types.ObjectId;
  olympiadId: Schema.Types.ObjectId;
  studentScore: number;
};

const studentsResultSchema = new Schema<StudentsResultSchemaType>({
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
  olympiadId: { type: Schema.Types.ObjectId, ref: "Olympiad", required: true },
  studentScore: { type: Number, required: true },
});

export const StudentsResultModel: Model<StudentsResultSchemaType> =
  models["StudentsResult"] || model("StudentsResult", studentsResultSchema);