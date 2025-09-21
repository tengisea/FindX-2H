import { ClassTypeModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const classTypesByOlympiad = async (_: any, { olympiadId }: any) => {
  const classTypes = await ClassTypeModel.find({ olympiadId })
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
