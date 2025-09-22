import { Model, model, models, Schema } from "mongoose";

type ClassRoomSchemaType = {
  roomNumber: string;
  maxStudents: number;
  mandatNumber: string[];
  classTypeId: Schema.Types.ObjectId;
};

const classRoomSchema = new Schema<ClassRoomSchemaType>({
  roomNumber: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  mandatNumber: [{ type: String, required: true }],
  classTypeId: {
    type: Schema.Types.ObjectId,
    ref: "ClassType",
    required: true,
  },
});

export const ClassRoomModel: Model<ClassRoomSchemaType> =
  models["ClassRoom"] || model("ClassRoom", classRoomSchema);
