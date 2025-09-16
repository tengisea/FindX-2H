import { model, models, Schema } from "mongoose";
const organizerSchema = new Schema({
    organizationName: { type: String, required: true },
    email: { type: String, required: true },
    Olympiads: [{ type: Schema.Types.ObjectId, ref: "Olympiad" }]
}, { timestamps: true });
export const OrganizerModel = models["Organizer"] || model("Organizer", organizerSchema);
