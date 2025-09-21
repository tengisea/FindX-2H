import { ClassTypeModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToDB,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const classTypesByClassYear = async (_: any, { classYear }: any) => {
  const dbClassYear = mapClassYearToDB(classYear);

  const classTypes = await ClassTypeModel.find({ classYear: dbClassYear })
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
