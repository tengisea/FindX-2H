import { TournamentModel } from "@/models/tournement/Tournament.model";
import { PiWardModel } from "@/models/tournement/PiWard";
import { QueryResolvers } from "../../../types/generated";

export const getTournament: any = async (_: any, { id }: any) => {
  const tournament = await TournamentModel.findById(id).populate("rounds");
  if (!tournament) throw new Error("Tournament not found");

  // Populate PiWards with students data
  const populatedPiWards = await PiWardModel.find({
    _id: { $in: tournament.piWards }
  }).populate('students.studentId');

  return {
    id: tournament._id.toString(),
    name: tournament.name,
    description: tournament.description,
    date: tournament.date.toISOString(),
    size: tournament.size,
    maxScore: tournament.maxScore,
    piPoints: tournament.piPoints,
    piWards: populatedPiWards.map(piWard => ({
      id: piWard._id.toString(),
      tournamentId: piWard.tournamentId.toString(),
      students: piWard.students.map((student: any) => ({
        studentId: student.studentId?._id?.toString() || student.studentId?.toString() || 'unknown',
        points: student.points,
        place: student.place,
        // Add student information
        studentName: student.studentId?.name || 'Unknown Student',
        studentClass: student.studentId?.class || 'Unknown Class',
        studentSchool: student.studentId?.school || 'Unknown School',
        studentEmail: student.studentId?.email || 'unknown@example.com',
      })),
      createdAt: (piWard as any).createdAt.toISOString(),
      updatedAt: (piWard as any).updatedAt.toISOString(),
    })) as any,
    closedAt: tournament.closedAt.toISOString(),
    rounds: tournament.rounds as any,
    participants: tournament.participants.map(id => id.toString()),
    status: tournament.status as any,
    topic: tournament.topic,
    createdAt: (tournament as any).createdAt.toISOString(),
    updatedAt: (tournament as any).updatedAt.toISOString(),
  };
};
