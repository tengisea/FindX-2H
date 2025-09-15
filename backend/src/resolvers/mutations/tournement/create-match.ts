import { MutationResolvers } from "../../../types/generated";
import { TournamentModel } from "@/models";
import { MatchRoomModel, MatchStatus } from "@/models/tournement/MatchRoom.model";
import { getRoundName } from "./get-round-name";

function shuffleArray<T>(array: T[]): T[] {
    return array
        .map(item => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}

export const createMatch: MutationResolvers["createMatch"] = async (_, { input }) => {
    const tournament = await TournamentModel.findById(input.tournamentId);
    if (!tournament) throw new Error("Tournament олдсонгүй");

    const participants = [...tournament.participants];

    if (participants.length !== tournament.size) {
        throw new Error(`Тэмцээнд ${tournament.size}-с бага оролцогч байна`);
    }

    // 🔹 Shuffle оролцогчид
    const shuffled = shuffleArray(participants);

    // 🔹 Round нэрийг автоматаар тодорхойлох
    const currentRound = getRoundName(shuffled.length);

    const matchesThisRound = [];
    for (let i = 0; i < shuffled.length; i += 2) {
        if (!shuffled[i + 1]) {
            // 🆕 Odd бол bye өгөөд шууд дараагийн шатанд гаргана
            const byeMatch = await MatchRoomModel.create({
                task: "Bye match",
                round: currentRound,
                scheduleAt: new Date(input.scheduleAt),
                slotA: shuffled[i],
                slotB: null,
                winner: shuffled[i],
                tournament: tournament._id,
                status: MatchStatus.COMPLETED,
            });
            tournament.rounds.push(byeMatch._id as any);
            matchesThisRound.push(byeMatch);
            continue;
        }

        const match = await MatchRoomModel.create({
            task: input.task,
            round: currentRound,
            scheduleAt: new Date(input.scheduleAt),
            slotA: shuffled[i],
            slotB: shuffled[i + 1],
            tournament: tournament._id,
            status: MatchStatus.PENDING,
        });

        tournament.rounds.push(match._id as any);
        matchesThisRound.push(match);
    }

    await tournament.save();

    return {
        success: true,
        message: `${currentRound} шатны ${matchesThisRound.length} match үүсгэсэн`,
    };
};
