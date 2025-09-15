import { OrganizerModel } from "@/models";

export const getOrganizer = async (_: any, { id }: any) => {
  const host = await OrganizerModel.findById(id).populate({
    path: "Olympiads",
    populate: {
      path: "classtypes",
      populate: {
        path: "questions",
        model: "Question"
      }
    }
  });
  
  if (!host) {
    throw new Error("Organizer not found");
  }

  return {
    ...host.toObject(),
    id: host._id.toString(),
    Olympiads: host.Olympiads.map((olympiad: any) => ({
      id: olympiad._id.toString(),
      name: olympiad.name,
      date: olympiad.date,
      description: olympiad.description,
      location: olympiad.location,
      status: olympiad.status,
      scoreOfAward: olympiad.scoreOfAward,
      classtypes: olympiad.classtypes.map((classType: any) => ({
        id: classType._id.toString(),
        classYear: classType.classYear,
        maxScore: classType.maxScore,
        medalists: classType.medalists,
        questions: classType.questions.map((question: any) => ({
          id: question._id.toString(),
          questionName: question.questionName,
          maxScore: question.maxScore
        }))
      }))
    }))
  };
};