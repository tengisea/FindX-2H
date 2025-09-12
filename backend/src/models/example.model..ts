import { Model, model, models, Schema } from "mongoose";

type exampleSchemaType = {
  age: number;
  phoneNumber: string;
};

const exampleSchema = new Schema<exampleSchemaType>(
  {
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    // example:{type:Schema.Types.ObjectId,ref:"ModelName",required:true}
  },
  { timestamps: true }
);

export const ExampleModel: Model<exampleSchemaType> =
  models["Example"] || model("Example", exampleSchema);
