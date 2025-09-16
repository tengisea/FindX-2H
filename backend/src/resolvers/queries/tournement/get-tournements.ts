import { TournamentModel } from "@/models/tournement/Tournament.model";
import { PiWardModel } from "@/models/tournement/PiWard";
import { QueryResolvers } from "../../../types/generated";

export const getTournaments: QueryResolvers["getTournaments"] = async (_, { id }) => {
    const tournaments = await TournamentModel.find({}).populate('rounds');

    // Get all PiWards for all tournaments
    const allPiWards = await PiWardModel.find({
        tournamentId: { $in: tournaments.map(t => t._id) }
    }).populate('students.studentId');

    // Create a map for quick lookup
    const piWardsMap = new Map();
    allPiWards.forEach(piWard => {
        piWardsMap.set(piWard.tournamentId.toString(), piWard);
    });

    return tournaments.map(tournament => {
        const piWard = piWardsMap.get(tournament._id.toString());
        return {
            id: tournament._id.toString(),
            name: tournament.name,
            description: tournament.description,
            date: tournament.date.toISOString(),
            size: tournament.size,
            maxScore: tournament.maxScore,
            piPoints: tournament.piPoints,
            piWards: piWard ? [{
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
            }] : [],
            closedAt: tournament.closedAt.toISOString(),
            rounds: tournament.rounds as any,
            participants: tournament.participants.map(id => id.toString()),
            status: tournament.status as any,
            topic: tournament.topic,
            createdAt: (tournament as any).createdAt.toISOString(),
            updatedAt: (tournament as any).updatedAt.toISOString(),
        };
    });
};
