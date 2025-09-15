import { OrganizerModel } from "@/models";

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

export const getAllOrganizers = async () => {
  const hosts = await OrganizerModel.find().populate({
    path: "Olympiads",
    populate: {
      path: "classtypes",
      populate: {
        path: "questions",
        model: "Question"
      }
    }
  });
  
  return hosts.map(host => ({
    ...host.toObject(),
    id: host._id.toString(),
    Olympiads: host.Olympiads.map((olympiad: any) => ({
      id: olympiad._id.toString(),
      name: olympiad.name,
      description: olympiad.description || "",
      date: olympiad.date || "",
      location: olympiad.location || "",
      organizer: olympiad.organizer && typeof olympiad.organizer === 'object' && 'toObject' in olympiad.organizer ? {
        ...(olympiad.organizer as any).toObject(),
        id: (olympiad.organizer as any)._id.toString()
      } : null,
      classtypes: olympiad.classtypes ? olympiad.classtypes.map((classType: any) => ({
        id: classType._id.toString(),
        classYear: mapClassYearToGraphQL(classType.classYear),
        maxScore: classType.maxScore,
        questions: classType.questions ? classType.questions.map((question: any) => ({
          id: question._id.toString(),
          classTypeId: question.classTypeId,
          questionName: question.questionName,
          maxScore: question.maxScore
        })) : [],
        medalists: classType.medalists || 0,
        participants: classType.participants || [],
        studentsResults: classType.studentsResults || [],
        olympiadId: classType.olympiadId
      })) : [],
      scoreOfAward: olympiad.scoreOfAward,
      status: olympiad.status || "PENDING"
    }))
  }));
};