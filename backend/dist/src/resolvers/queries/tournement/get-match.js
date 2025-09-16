import { MatchRoomModel } from "../../../models";
export const getMatchRoom = async (_, { id }) => {
    var _a;
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
        winner: (_a = match.winner) === null || _a === void 0 ? void 0 : _a.toString(),
        task: match.task,
        status: "PENDING",
    };
};
