import { MatchRoomModel, MatchStatus } from "../../../models/tournement/MatchRoom.model";
import { TournamentModel } from "../../../models/tournement/Tournament.model";
import { getRoundName } from "../tournement/get-round-name";

// Дараагийн шатны match автоматаар үүсгэх функц
async function createNextRoundMatches(tournamentId: string, currentRound: string) {
    const tournament = await TournamentModel.findById(tournamentId);
    if (!tournament) return null;

    // Тухайн шатны бүх match-уудыг олох
    const currentRoundMatches = await MatchRoomModel.find({
        tournament: tournamentId,
        round: currentRound,
        status: MatchStatus.COMPLETED
    });

    // Дараагийн шатны оролцогчдыг цуглуулах (winner-ууд)
    const nextRoundParticipants = currentRoundMatches
        .filter(match => match.winner)
        .map(match => match.winner);

    // Хэрэв дараагийн шатны оролцогчдын тоо 2-оос бага бол тэмцээн дууссан
    if (nextRoundParticipants.length < 2) {
        return null;
    }

    // Дараагийн шатны нэр тодорхойлох
    const nextRoundName = getRoundName(nextRoundParticipants.length);

    // Дараагийн шатны match-уудыг үүсгэх
    const nextRoundMatches = [];
    for (let i = 0; i < nextRoundParticipants.length; i += 2) {
        if (!nextRoundParticipants[i + 1]) {
            // Хэрэв сондгой тооны оролцогч байвал bye match үүсгэх
            const byeMatch = await MatchRoomModel.create({
                task: "Bye match",
                round: nextRoundName,
                scheduleAt: new Date(),
                slotA: nextRoundParticipants[i],
                slotB: null,
                winner: nextRoundParticipants[i],
                tournament: tournament._id,
                status: MatchStatus.COMPLETED,
            });
            tournament.rounds = [...tournament.rounds, byeMatch._id as any];
            nextRoundMatches.push(byeMatch);
            continue;
        }

        const match = await MatchRoomModel.create({
            task: `${nextRoundName} Match`,
            round: nextRoundName,
            scheduleAt: new Date(),
            slotA: nextRoundParticipants[i],
            slotB: nextRoundParticipants[i + 1],
            tournament: tournament._id,
            status: MatchStatus.PENDING,
        });

        tournament.rounds = [...tournament.rounds, match._id as any];
        nextRoundMatches.push(match);
    }

    await tournament.save();
    return nextRoundMatches;
}

export const updateWinner = async (
    _: unknown,
    { input }: { input: { matchId: string; winnerId: string; loserId: string } }
) => {
    try {
        const matchRoom = await MatchRoomModel.findById(input.matchId);

        if (!matchRoom) {
            return {
                success: false,
                message: "Match room not found",
            };
        }

        // Update winner and loser
        matchRoom.winner = input.winnerId as any;
        matchRoom.loser = input.loserId as any;
        matchRoom.status = MatchStatus.COMPLETED;

        await matchRoom.save();

        // Тухайн шатны бүх match дууссан эсэхийг шалгах
        const tournament = await TournamentModel.findById(matchRoom.tournament);
        if (!tournament) {
            return {
                success: true,
                message: "Winner updated successfully",
            };
        }

        const currentRoundMatches = await MatchRoomModel.find({
            tournament: tournament._id,
            round: matchRoom.round,
            status: MatchStatus.PENDING
        });

        // Хэрэв тухайн шатны бүх match дууссан бол дараагийн шат үүсгэх
        if (currentRoundMatches.length === 0) {
            const nextRoundMatches = await createNextRoundMatches(tournament._id.toString(), matchRoom.round);

            if (nextRoundMatches && nextRoundMatches.length > 0) {
                return {
                    success: true,
                    message: `Winner updated successfully. Next round (${nextRoundMatches[0].round}) created with ${nextRoundMatches.length} matches.`,
                };
            } else {
                return {
                    success: true,
                    message: "Winner updated successfully. Tournament completed!",
                };
            }
        }

        return {
            success: true,
            message: "Winner updated successfully",
        };
    } catch (error) {
        console.error("Error updating winner:", error);
        return {
            success: false,
            message: "Internal server error",
        };
    }
};