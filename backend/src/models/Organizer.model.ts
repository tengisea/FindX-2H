import { Model, model, models, Schema } from "mongoose";

type OrganizerSchemaType = {
  id: string;
  organizationName: string;
  email: string;
  Olympiads: Schema.Types.ObjectId[];
};

const organizerSchema = new Schema<OrganizerSchemaType>(
  {
    organizationName: { type: String, required: true },
    email: { type: String, required: true },
    Olympiads: {
      type: [Schema.Types.ObjectId],
      ref: "Olympiad",
      required: true,
    },
  },
  { timestamps: true }
);

export const OrganizerModel: Model<OrganizerSchemaType> =
  models["Organizer"] || model("Organizer", organizerSchema);
