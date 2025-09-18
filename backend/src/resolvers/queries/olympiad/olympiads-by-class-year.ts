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
