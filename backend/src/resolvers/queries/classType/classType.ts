import { ClassTypeModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const classType = async (_: any, { id }: any) => {
  const classType = await ClassTypeModel.findById(id)
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
    })
    .populate({
      path: "classRoom",
      model: "ClassRoom",
    });

  if (!classType) {
    throw new Error("ClassType not found");
  }

  const transformed = transformDocument(classType);

  if (transformed.questions) {
    transformed.questions = transformNestedObject(transformed.questions);
  }

  if (transformed.classYear) {
    transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
  }

  return transformed;
};
