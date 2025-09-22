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
      path: "rooms",
      model: "ClassRoom",
    });

  return classTypes.map((classType) => {
    const transformed = transformDocument(classType);

    // Ensure olympiadId is a string, not an object
    transformed.olympiadId = classType.olympiadId?.toString() || classType.olympiadId;

    // Handle questions transformation and ensure IDs are strings
    if (transformed.questions) {
      transformed.questions = transformed.questions
        .filter((question: any) => question && (question._id || question.id)) // Filter out null/undefined questions
        .map((question: any) => {
          const questionId = question._id?.toString() || question.id;
          return {
            id: questionId,
            classTypeId: transformed.id,
            questionName: question.questionName || "Untitled Question",
            maxScore: question.maxScore || 0,
          };
        });
    }

    if (transformed.classYear) {
      transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
    }

    return transformed;
  });
};
