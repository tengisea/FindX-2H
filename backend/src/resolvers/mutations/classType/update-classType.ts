import { ClassTypeModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToDB,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const updateClassType = async (_: unknown, { id, input }: any) => {
  // Prepare update data
  const updateData: any = { ...input };

  // Convert classYear if provided
  if (input.classYear) {
    updateData.classYear = mapClassYearToDB(input.classYear);
  }

  const updatedClassType = await ClassTypeModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
    })
    .populate({
      path: "rooms",
      model: "ClassRoom",
    });

  if (!updatedClassType) {
    throw new Error("ClassType not found");
  }

  const transformed = transformDocument(updatedClassType);

  if (transformed.questions) {
    transformed.questions = transformNestedObject(transformed.questions);
  }

  if (transformed.classYear) {
    transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
  }

  if (transformed.rooms) {
    transformed.rooms = transformed.rooms.map((room: any) => transformDocument(room));
  }

  return transformed;
};
