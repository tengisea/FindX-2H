import { Model, model, models, Schema } from "mongoose";

type OlympiadSchemaType = {
  name: string;
  description: string;
  date: Date;
  location: string;
  organizer: Schema.Types.ObjectId;
  classtypes: Schema.Types.ObjectId[];
  scoreOfAward?: number;
  status: "PENDING" | "APPROVED";
};

const olympiadSchema = new Schema<OlympiadSchemaType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "Organizer", required: true },
    classtypes: [{ type: Schema.Types.ObjectId, ref: "ClassType" }],
    scoreOfAward: { type: Number, default: null },
    status: { type: String, enum: ["PENDING", "APPROVED"], default: "PENDING" },
  },
  { timestamps: true }
);

export const OlympiadModel: Model<OlympiadSchemaType> =
  models["Olympiad"] || model("Olympiad", olympiadSchema);
