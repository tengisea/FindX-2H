import { Model, model, models, Schema } from "mongoose";

type ClassRoomSchemaType = {
  roomNumber: string;
  maxStudents: number;
  mandatNumber: Schema.Types.ObjectId[];
  classTypeId: Schema.Types.ObjectId;
};

const classRoomSchema = new Schema<ClassRoomSchemaType>({
  roomNumber: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  mandatNumber: [{ type: Schema.Types.ObjectId, ref: "StudentAnswer"}],
  classTypeId: { type: Schema.Types.ObjectId, ref: "ClassType", required: true },
});

export const ClassRoomModel: Model<ClassRoomSchemaType> =
  models["ClassRoom"] || model("ClassRoom", classRoomSchema);