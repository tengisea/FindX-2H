import { QueryResolvers, Status } from "../../../types/generated";
import { MatchRoomModel } from "../../../models"

export const getMatchRoom: QueryResolvers["getMatchRoom"] = async (_, { id }) => {
    const match = await MatchRoomModel.findById(id).populate(["slotA", "slotB"]);
    if (!match) {
        throw new Error("Match not found");
    }
    return {
        id: match._id.toString(),
        round: match.round,
        scheduleAt: match.scheduleAt.toISOString(),
        slotA: match.slotA.toString(),
        slotB: match.slotB.toString(),
        tournament: match.tournament.toString(),
        tournamentId: match.tournament.toString(),
        winner: match.winner?.toString(),
        task: match.task,
        status: "PENDING" as any,
    };
};