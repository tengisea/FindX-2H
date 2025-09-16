import { OlympiadModel } from "@/models";

// Reverse mapping from database values back to GraphQL enum values
const mapClassYearToGraphQL = (dbValue: string): string => {
  const reverseMapping: { [key: string]: string } = {
    '1р анги': 'GRADE_1',
    '2р анги': 'GRADE_2',
    '3р анги': 'GRADE_3',
    '4р анги': 'GRADE_4',
    '5р анги': 'GRADE_5',
    '6р анги': 'GRADE_6',
    '7р анги': 'GRADE_7',
    '8р анги': 'GRADE_8',
    '9р анги': 'GRADE_9',
    '10р анги': 'GRADE_10',
    '11р анги': 'GRADE_11',
    '12р анги': 'GRADE_12',
  };
  return reverseMapping[dbValue] || dbValue;
};

export const allOlympiads = async () => {
  const olympiads = await OlympiadModel.find().populate({
    path: "classtypes",
    populate: {
      path: "questions",
      model: "Question"
    }
  }).populate("organizer");

  // Transform the data to convert database values back to GraphQL enum values
  return olympiads.map(olympiad => ({
    ...olympiad.toObject(),
    id: olympiad._id.toString(),
    organizer: olympiad.organizer && typeof olympiad.organizer === 'object' && 'toObject' in olympiad.organizer ? {
      ...(olympiad.organizer as any).toObject(),
      id: (olympiad.organizer as any)._id.toString()
    } : null,
    classtypes: olympiad.classtypes.map((classType: any) => ({
      ...classType.toObject(),
      id: classType._id.toString(),
      classYear: mapClassYearToGraphQL(classType.classYear),
      questions: classType.questions.map((question: any) => ({
        ...question.toObject(),
        id: question._id.toString()
      }))
    }))
  }));
};
