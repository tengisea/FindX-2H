import { Model, model, models, Schema } from "mongoose";

export enum MatchStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

type MatchRoomSchemaType = {
  id: string;
  task: string; // Тоглолтын нэр, даалгавар эсвэл тайлбар
  round: string; // Жишээ нь: "Quarterfinals"
  scheduleAt: Date; // Тоглолт эхлэх цаг
  slotA: Schema.Types.ObjectId; // Оролцогч A
  slotB: Schema.Types.ObjectId; // Оролцогч B
  winner?: Schema.Types.ObjectId; // Ялагч
  loser?: Schema.Types.ObjectId; // Хувьчин
  tournament: Schema.Types.ObjectId; // Хамаарах тэмцээн
  status: MatchStatus;
};

const matchRoomSchema = new Schema<MatchRoomSchemaType>(
  {
    task: { type: String, required: true },
    round: { type: String, required: true },
    scheduleAt: { type: Date, required: true },
    slotA: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    slotB: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    winner: { type: Schema.Types.ObjectId, ref: "Student" },
    loser: { type: Schema.Types.ObjectId, ref: "Student" },
    tournament: { type: Schema.Types.ObjectId, ref: "Tournament", required: true },
    status: {
      type: String,
      enum: Object.values(MatchStatus),
      default: MatchStatus.PENDING,
      required: true,
    },
  },
  { timestamps: true } // Create болон update цагийг автоматаар хадгалах
);

export const MatchRoomModel: Model<MatchRoomSchemaType> =
  models["MatchRoom"] || model("MatchRoom", matchRoomSchema);
