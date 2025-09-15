import { MutationResolvers } from "../../../types/generated";
import { MatchRoomModel, MatchStatus } from "@/models/tournement/MatchRoom.model";
import { TournamentModel } from "@/models/tournement/Tournament.model";
import { PiWardModel } from "@/models/tournement/PiWard";
import mongoose from "mongoose";

type PiWardResult = { studentId: string; points: number; place: number };

// Байрын дагуу PiPoints оноох функц
function allocatePiPoints(results: { studentId: string; place: number }[], totalPiPoints: number): PiWardResult[] {
    return results.map(r => {
        let percent = 7.5; // Default 5-8 байр
        if (r.place === 1) percent = 35;
        else if (r.place === 2) percent = 20;
        else if (r.place === 3 || r.place === 4) percent = 15;

        const points = Math.floor((totalPiPoints * percent) / 100);
        return { ...r, points };
    });
}

export const createPiWard: MutationResolvers["createPiWard"] = async (_, { tournamentId }) => {
    const tournament = await TournamentModel.findById(tournamentId);
    if (!tournament) throw new Error("Tournament олдсонгүй");

    const finishedMatches = await MatchRoomModel.find({
        _id: { $in: tournament.rounds },
        status: MatchStatus.COMPLETED,
    });

    if (!finishedMatches.length) throw new Error("Дууссан тоглолт байхгүй");

    // Round-ийг эрэмбэлэх
    const roundOrder: Record<string, number> = { Final: 1, Semifinal: 2, Quarterfinal: 3 };
    const sortedMatches = finishedMatches.sort(
        (a, b) => (roundOrder[a.round] || 999) - (roundOrder[b.round] || 999)
    );

    const topPlayers: { studentId: string; place: number }[] = [];

    // 1-2 байр (Final)
    const finalMatch = sortedMatches.find(m => m.round === "Final");
    if (!finalMatch?.winner || !finalMatch?.loser) throw new Error("Final тоглолт бүрэн бус байна");
    topPlayers.push({ studentId: finalMatch.winner.toString(), place: 1 }); // Winner
    topPlayers.push({ studentId: finalMatch.loser.toString(), place: 2 });  // Loser

    // 3-4 байр (Semifinal loser)
    const semiMatches = sortedMatches.filter(m => m.round === "Semifinal");
    semiMatches.forEach(m => {
        if (m.loser) topPlayers.push({ studentId: m.loser.toString(), place: 3 + topPlayers.filter(p => p.place >= 3).length });
    });

    // 5-8 байр (Quarterfinal loser)
    const quarterMatches = sortedMatches.filter(m => m.round === "Quarterfinal");
    quarterMatches.forEach(m => {
        if (m.loser) topPlayers.push({ studentId: m.loser.toString(), place: 5 + topPlayers.filter(p => p.place >= 5).length });
    });

    // Pi оноо оноох
    const piResults = allocatePiPoints(topPlayers, tournament.piPoints);

    // PiWard үүсгэх
    const piWardDoc = await PiWardModel.create({
        tournamentId: tournament._id,
        students: piResults.map(s => ({
            studentId: new mongoose.Types.ObjectId(s.studentId),
            points: s.points,
            place: s.place,
        })),
    });

    // Tournament-д холбох
    tournament.piWards.push(piWardDoc._id as any);
    await tournament.save();

    return {
        message: "PiPoints 1-8 байр хүртэл тараалаа, Tournament-д холбогдлоо",
        success: true,
    };
};
