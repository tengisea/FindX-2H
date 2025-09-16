import { TournamentModel } from "@/models/tournement/Tournament.model";
export const getTournaments = async () => {
    const tournaments = await TournamentModel.find().populate('rounds');
    return tournaments.map(tournament => ({
        id: tournament._id.toString(),
        name: tournament.name,
        description: tournament.description,
        date: tournament.date.toISOString(),
        size: tournament.size,
        maxScore: tournament.maxScore,
        piPoints: tournament.piPoints,
        piWards: tournament.piWards.map(id => id.toString()),
        closedAt: tournament.closedAt.toISOString(),
        rounds: tournament.rounds,
        participants: tournament.participants.map(id => id.toString()),
        status: tournament.status,
        topic: tournament.topic,
        createdAt: tournament.createdAt.toISOString(),
        updatedAt: tournament.updatedAt.toISOString(),
    }));
};
