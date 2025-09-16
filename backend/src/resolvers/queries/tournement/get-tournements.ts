import { TournamentModel } from "@/models/tournement/Tournament.model";
import { QueryResolvers } from "../../../types/generated";

export const getTournaments: any = async () => {
  const tournaments = await TournamentModel.find().populate("rounds");
  return tournaments.map((tournament) => ({
    id: tournament._id.toString(),
    name: tournament.name,
    description: tournament.description,
    date: tournament.date.toISOString(),
    size: tournament.size,
    maxScore: tournament.maxScore,
    piPoints: tournament.piPoints,
    piWards: tournament.piWards.map((id) => id.toString()),
    closedAt: tournament.closedAt.toISOString(),
    rounds: tournament.rounds as any,
    participants: tournament.participants.map((id) => id.toString()),
    status: tournament.status as any,
    topic: tournament.topic,
    createdAt: (tournament as any).createdAt.toISOString(),
    updatedAt: (tournament as any).updatedAt.toISOString(),
  }));
};
