import { OrganizerModel } from "@/models";

const mapClassYearToGraphQL = (dbValue: string): string => {
  // Since we now use English enum values in the database, no mapping is needed
  return dbValue;
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