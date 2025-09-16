import { MatchRoomModel, MatchStatus } from "@/models/tournement/MatchRoom.model";
import { TournamentModel } from "@/models/tournement/Tournament.model";
import { getRoundName } from "./get-round-name";
export const updateWinner = async (_, { input }) => {
    var _a, _b, _c;
    const match = await MatchRoomModel.findById(input.matchId);
    if (!match)
        throw new Error("Match олдсонгүй");
    // Winner орсон үед loser-ийг автоматаар оруулах
    if (match.slotB) {
        const validWinnerIds = [(_a = match.slotA) === null || _a === void 0 ? void 0 : _a.toString(), (_b = match.slotB) === null || _b === void 0 ? void 0 : _b.toString()];
        if (!validWinnerIds.includes(input.winnerId)) {
            throw new Error("Ялагч нь зөвхөн тухайн тоглолтын оролцогчдын нэг байх ёстой");
        }
        match.winner = input.winnerId;
        match.loser =
            ((_c = match.slotA) === null || _c === void 0 ? void 0 : _c.toString()) === input.winnerId ? match.slotB : match.slotA;
    }
    else {
        // Bye match
        match.winner = match.slotA;
        match.loser = null;
    }
    match.status = MatchStatus.COMPLETED;
    await match.save();
    const tournament = await TournamentModel.findById(match.tournament);
    if (!tournament)
        throw new Error("Tournament олдсонгүй");
    // Энэ шатны бүх тоглолт дууссан эсэхийг шалгах
    const currentRound = match.round;
    const finishedMatches = await MatchRoomModel.find({
        _id: { $in: tournament.rounds },
        round: currentRound,
        status: MatchStatus.COMPLETED,
    });
    const totalMatchesThisRound = await MatchRoomModel.countDocuments({
        _id: { $in: tournament.rounds },
        round: currentRound,
    });
    if (finishedMatches.length === totalMatchesThisRound) {
        // Дараагийн шатны winners
        const winners = finishedMatches
            .map(m => { var _a; return (_a = m.winner) === null || _a === void 0 ? void 0 : _a.toString(); })
            .filter(Boolean);
        if (winners.length > 1) {
            const nextRound = getRoundName(winners.length);
            for (let i = 0; i < winners.length; i += 2) {
                if (!winners[i + 1]) {
                    // Odd бол bye match
                    const byeMatch = await MatchRoomModel.create({
                        task: "Bye match",
                        round: nextRound,
                        scheduleAt: new Date(),
                        slotA: winners[i],
                        slotB: null,
                        winner: winners[i],
                        status: MatchStatus.COMPLETED,
                        tournament: tournament._id,
                    });
                    tournament.rounds.push(byeMatch._id);
                    continue;
                }
                const nextMatch = await MatchRoomModel.create({
                    task: "Автомат тоглолт",
                    round: nextRound,
                    scheduleAt: new Date(),
                    slotA: winners[i],
                    slotB: winners[i + 1],
                    tournament: tournament._id,
                    status: MatchStatus.PENDING,
                });
                tournament.rounds.push(nextMatch._id);
            }
            await tournament.save();
        }
    }
    return {
        success: true,
        message: "Ялагч болон loser автоматаар орууллаа, шаардлагатай бол next round match үүсгэв",
    };
};
