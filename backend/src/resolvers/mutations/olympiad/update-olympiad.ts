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

export const updateOlympiad = async (_:unknown, { id, input }: any) => {
  const updatedOlympiad = await OlympiadModel.findByIdAndUpdate(
    id,
    { $set: input },
    { new: true }
  ).populate({
    path: "classtypes",
    populate: {
      path: "questions",
      model: "Question"
    }
  }).populate("organizer");

  if (!updatedOlympiad) {
    throw new Error("Olympiad not found");
  }

  // Transform the data to convert database values back to GraphQL enum values
  const transformedOlympiad = {
    ...updatedOlympiad.toObject(),
    id: updatedOlympiad._id.toString(),
    organizer: updatedOlympiad.organizer && typeof updatedOlympiad.organizer === 'object' && 'toObject' in updatedOlympiad.organizer ? {
      ...(updatedOlympiad.organizer as any).toObject(),
      id: (updatedOlympiad.organizer as any)._id.toString()
    } : null,
    classtypes: updatedOlympiad.classtypes.map((classType: any) => ({
      ...classType.toObject(),
      id: classType._id.toString(),
      classYear: mapClassYearToGraphQL(classType.classYear),
      questions: classType.questions.map((question: any) => ({
        ...question.toObject(),
        id: question._id.toString()
      }))
    }))
  };

  return transformedOlympiad;
};
