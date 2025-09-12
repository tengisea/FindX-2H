import { Model, model, models, Schema } from "mongoose";

type StudentSchemaType = {
  id: string;
  school: string;
  name: string;
  profilePicture: string;
  email: string;
  ranking: number;
  piPoints: number;
  participatedOlympiads: Schema.Types.ObjectId[];
};

const studentSchema = new Schema<StudentSchemaType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    school: { type: String, required: true },
    profilePicture: { type: String, required: true },
    ranking: { type: Number, required: true },
    piPoints: { type: Number, required: true },
    participatedOlympiads: {
      type: [Schema.Types.ObjectId],
      ref: "Olympiad",
      required: true,
    },
  },
  { timestamps: true }
);

export const StudentModel: Model<StudentSchemaType> =
  models["Student"] || model("Student", studentSchema);
