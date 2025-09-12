import { Model, model, models, Schema } from "mongoose";

type OlympiadSchemaType = {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  maxScore: number;
  participants: Schema.Types.ObjectId[];
  results: Schema.Types.ObjectId[];
  organizer: Schema.Types.ObjectId;
};

const olympiadSchema = new Schema<OlympiadSchemaType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxScore: { type: Number, required: true },
    participants: {
      type: [Schema.Types.ObjectId],
      ref: "Student",
      required: true,
    },
    results: { type: [Schema.Types.ObjectId], ref: "Result", required: true },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

export const OlympiadModel: Model<OlympiadSchemaType> =
  models["Olympiad"] || model("Olympiad", olympiadSchema);
