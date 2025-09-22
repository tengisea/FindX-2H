import { OlympiadModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const getPendingOlympiads = async () => {
  const olympiads = await OlympiadModel.find({ status: "DRAFT" })
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

    // Handle ClassTypes manually since transformDocument is not working properly for populated objects
    if (olympiad.classtypes) {
      transformed.classtypes = olympiad.classtypes.map((classType: any) => {
        const classTypeId = classType._id?.toString() || classType.id;
        return {
          id: classTypeId,
          classYear: mapClassYearToGraphQL(classType.classYear),
          maxScore: classType.maxScore,
          occurringTime: classType.occurringTime,
          rooms: transformNestedObject(classType.rooms),
          questions: classType.questions
            ? classType.questions.map((question: any) => {
                const questionId = question._id?.toString() || question.id;
                return {
                  id: questionId,
                  classTypeId: classTypeId,
                  questionName: question.questionName,
                  maxScore: question.maxScore,
                };
              })
            : [],
          medalists: classType.medalists,
          participants: classType.participants || [],
          studentsAnswers: classType.studentsAnswers || [],
          olympiadId: classType.olympiadId?.toString() || classType.olympiadId,
          bestMaterials: classType.bestMaterials || [],
          gold: classType.gold || [],
          silver: classType.silver || [],
          bronze: classType.bronze || [],
          top10: classType.top10 || [],
        };
      });
    }

    if (transformed.organizer) {
      transformed.organizer = transformDocument(transformed.organizer);
      delete transformed.organizer.Olympiads;
    }

    return transformed;
  });
};
