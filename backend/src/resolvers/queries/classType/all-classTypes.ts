import { ClassTypeModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const allClassTypes = async () => {
  const classTypes = await ClassTypeModel.find()
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
    });

  return classTypes.map((classType) => {
    const transformed = transformDocument(classType);

    if (transformed.questions) {
      transformed.questions = transformNestedObject(transformed.questions);
    }

    if (transformed.classYear) {
      transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
    }

    return transformed;
  });
};
