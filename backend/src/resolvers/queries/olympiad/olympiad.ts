import { OlympiadModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const olympiad = async (_: any, { id }: any) => {
  const olympiad = await OlympiadModel.findById(id)
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

  if (!olympiad) {
    throw new Error("Olympiad not found");
  }

  const transformed = transformDocument(olympiad);

  // Transform nested objects and handle classYear mapping
  if (transformed.classtypes) {
    transformed.classtypes = transformed.classtypes.map((classType: any) => ({
      ...transformDocument(classType),
      classYear: mapClassYearToGraphQL(classType.classYear),
      questions: transformNestedObject(classType.questions),
    }));
  }

  if (transformed.organizer) {
    transformed.organizer = transformDocument(transformed.organizer);
    // Remove circular reference
    delete transformed.organizer.Olympiads;
  }

  return transformed;
};
