import { Model, model, models, Schema } from "mongoose";

type StudentSchemaType = {
  id: string;
  school: string;
  class: string;
  location: string;
  name: string;
  profilePicture: string;
  email: string;
  totalScore: number;
  piPoints: number;
  participatedOlympiads: Schema.Types.ObjectId[];
};

const studentSchema = new Schema<StudentSchemaType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    school: { type: String, required: true },
    class: { type: String, required: true },
    location: { type: String, required: true },
    profilePicture: { type: String, required: true },
    totalScore: { type: Number, required: true, default: 0 },
    piPoints: { type: Number, required: true, default: 1000},
    participatedOlympiads: [
      { type: Schema.Types.ObjectId, ref: "Olympiad", required: true, default: [] },
    ],
  },
  { timestamps: true }
);

export const StudentModel: Model<StudentSchemaType> =
  models["Student"] || model("Student", studentSchema);
