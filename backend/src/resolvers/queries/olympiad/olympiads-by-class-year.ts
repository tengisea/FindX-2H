import { OlympiadModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToDB,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const getOlympiadByClassYear = async (_: any, { classYear }: any) => {
  // Convert GraphQL enum to database value
  const dbClassYear = mapClassYearToDB(classYear);

  // Use aggregation to find olympiads with the specified class year in a single query
  const olympiads = await OlympiadModel.aggregate([
    {
      $lookup: {
        from: "classtypes",
        localField: "_id",
        foreignField: "olympiadId",
        as: "classtypes",
      },
    },
    {
      $match: {
        "classtypes.classYear": dbClassYear,
      },
    },
    {
      $lookup: {
        from: "organizers",
        localField: "organizer",
        foreignField: "_id",
        as: "organizer",
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "classtypes._id",
        foreignField: "classTypeId",
        as: "questions",
      },
    },
    {
      $addFields: {
        organizer: { $arrayElemAt: ["$organizer", 0] },
        classtypes: {
          $map: {
            input: "$classtypes",
            as: "classType",
            in: {
              $mergeObjects: [
                "$$classType",
                {
                  questions: {
                    $filter: {
                      input: "$questions",
                      as: "question",
                      cond: {
                        $eq: ["$$question.classTypeId", "$$classType._id"],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]);

  // Transform the results
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
