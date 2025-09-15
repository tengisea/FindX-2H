import { OlympiadModel } from "@/models";
import { ClassTypeModel, ClassYear } from "@/models";
import { QuestionModel } from "@/models";

// Mapping from GraphQL enum to actual string values
const mapClassYear = (graphqlEnum: string): string => {
  const mapping: { [key: string]: string } = {
    'GRADE_1': '1р анги',
    'GRADE_2': '2р анги',
    'GRADE_3': '3р анги',
    'GRADE_4': '4р анги',
    'GRADE_5': '5р анги',
    'GRADE_6': '6р анги',
    'GRADE_7': '7р анги',
    'GRADE_8': '8р анги',
    'GRADE_9': '9р анги',
    'GRADE_10': '10р анги',
    'GRADE_11': '11р анги',
    'GRADE_12': '12р анги',
  };
  return mapping[graphqlEnum] || graphqlEnum;
};

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

export const requestOlympiad = async (_: unknown, { input }: any) => {
  const { organizerId, name, description, date, location, classtypes } = input;

  // First create the olympiad to get its ID
  const olympiad = new OlympiadModel({
    organizer: organizerId,
    name,
    description,
    date,
    location,
    classtypes: [], // Will be populated later
    status: "PENDING",
  });
  await olympiad.save();

  const classTypeIds = [];
  for (const classTypeInput of classtypes) {
    const { classYear, maxScore, medalists, questions } = classTypeInput;

    const classType = new ClassTypeModel({
      olympiadId: olympiad._id,
      classYear: mapClassYear(classYear),
      maxScore,
      medalists,
    });
    await classType.save();

    for (const q of questions) {
      const question = new QuestionModel({
        classTypeId: classType._id,
        questionName: q.questionName,
        maxScore: q.maxScore,
      });
      await question.save();
      classType.questions.push(question._id as any);
    }
    await classType.save();
    classTypeIds.push(classType._id as any);
  }

  // Update the olympiad with the class type IDs
  olympiad.classtypes = classTypeIds;
  await olympiad.save();

  const populatedOlympiad = await olympiad.populate({
    path: "classtypes",
    populate: {
      path: "questions",
      model: "Question"
    }
  });

  // Transform the data to convert database values back to GraphQL enum values
  const transformedOlympiad = {
    ...populatedOlympiad.toObject(),
    id: populatedOlympiad._id.toString(),
    classtypes: populatedOlympiad.classtypes.map((classType: any) => ({
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
