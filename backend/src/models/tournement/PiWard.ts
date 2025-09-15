import { Model, model, models, Schema } from "mongoose";

type PiWardStudent = {
    studentId: Schema.Types.ObjectId;  // Сурагчийн ID
    points: number;                    // Оноо (PiPoints)
    place: number;                     // Байр (1, 2, 3, ...)
};

type PiWardSchemaType = {
    tournamentId: Schema.Types.ObjectId; // Тэмцээний ID
    students: PiWardStudent[];           // Байр, оноотой сурагчид
};

const piWardSchema = new Schema<PiWardSchemaType>(
    {
        tournamentId: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
        students: [
            {
                studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
                points: { type: Number, required: true },
                place: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true } // createdAt, updatedAt автоматаар үүснэ
);

export const PiWardModel: Model<PiWardSchemaType> =
    models["PiWard"] || model("PiWard", piWardSchema);
