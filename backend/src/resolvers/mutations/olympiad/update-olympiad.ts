import { OlympiadModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const updateOlympiad = async (_: unknown, { id, input }: any) => {
  // If rankingType is being updated, we need to use save() to trigger pre-save middleware
  if (input.rankingType) {
    const olympiad = await OlympiadModel.findById(id);
    if (!olympiad) {
      throw new Error("Olympiad not found");
    }

    // Update the fields
    Object.assign(olympiad, input);
    await olympiad.save(); // This will trigger the pre-save middleware

    // Now populate and return
    const populatedOlympiad = await OlympiadModel.findById(id)
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

    if (!populatedOlympiad) {
      throw new Error("Failed to populate olympiad data");
    }

    const transformed = transformDocument(populatedOlympiad);

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
  } else {
    // For updates without rankingType, use findByIdAndUpdate
    const updatedOlympiad = await OlympiadModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    )
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

    if (!updatedOlympiad) {
      throw new Error("Olympiad not found");
    }

    const transformed = transformDocument(updatedOlympiad);

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
  }
};
