import { OlympiadModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const allOlympiads = async () => {
  const olympiads = await OlympiadModel.find()
    .populate({
      path: "classtypes",
      populate: {
        path: "questions",
        model: "Question",
      },
    })
    .populate({
      path: "organizer",
      select: "organizationName email",
    });

  return olympiads.map((olympiad) => {
    const transformed = transformDocument(olympiad);

    if (transformed.classtypes) {
      transformed.classtypes = transformed.classtypes.map((classType: any) => ({
        ...transformDocument(classType),
        classYear: mapClassYearToGraphQL(classType.classYear),
        questions: transformNestedObject(classType.questions),
      }));
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    return transformed;
  });
};
