import { TournamentModel } from "../../../models/tournement/Tournament.model";
import { MatchRoomModel, MatchStatus } from "../../../models/tournement/MatchRoom.model";
import { PiWardModel } from "../../../models/tournement/PiWard";
import mongoose from "mongoose";

enum Status {
    OPENING = "OPENING",
    ONGOING = "ONGOING",
    FINISHED = "FINISHED",
}

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

// PiWard автоматаар үүсгэх функц
async function createPiWardForTournament(tournamentId: string) {
    const tournament = await TournamentModel.findById(tournamentId);
    if (!tournament) throw new Error("Tournament олдсонгүй");

    // Check if PiWard already exists
    if (tournament.piWards && tournament.piWards.length > 0) {
        return { success: true, message: "PiWard already exists for this tournament" };
    }

    const finishedMatches = await MatchRoomModel.find({
        _id: { $in: tournament.rounds },
        status: MatchStatus.COMPLETED,
    });

    if (!finishedMatches.length) {
        throw new Error("Дууссан тоглолт байхгүй - PiWard үүсгэх боломжгүй");
    }

    // Round-ийг эрэмбэлэх
    const roundOrder: Record<string, number> = { Final: 1, Semifinal: 2, Quarterfinal: 3 };
    const sortedMatches = finishedMatches.sort(
        (a, b) => (roundOrder[a.round] || 999) - (roundOrder[b.round] || 999)
    );

    const topPlayers: { studentId: string; place: number }[] = [];

    // 1-2 байр (Final)
    const finalMatch = sortedMatches.find(m => m.round === "Final");
    if (!finalMatch?.winner || !finalMatch?.loser) {
        throw new Error("Final тоглолт бүрэн бус байна - PiWard үүсгэх боломжгүй");
    }
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
    tournament.piWards = [...tournament.piWards, piWardDoc._id as any];
    tournament.status = Status.FINISHED;
    await tournament.save();

    return {
        success: true,
        message: "PiWard автоматаар үүсгэгдлээ, Tournament дууссан"
    };
}

export const updateTournamentStatus = async (
    _: any,
    { id, status }: { id: string; status: any }
) => {
    try {
        // Check if tournament exists
        const tournament = await TournamentModel.findById(id);
        if (!tournament) {
            return {
                success: false,
                message: "Tournament not found",
            };
        }

        // Update the tournament status
        const updatedTournament = await TournamentModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedTournament) {
            return {
                success: false,
                message: "Failed to update tournament status",
            };
        }

        // If status is being set to FINISHED, automatically create PiWard
        if (status === Status.FINISHED) {
            try {
                const piWardResult = await createPiWardForTournament(id);
                return {
                    success: true,
                    message: `Tournament status updated to ${status}. ${piWardResult.message}`,
                };
            } catch (piWardError) {
                // If PiWard creation fails, still update the status but warn about PiWard
                console.error("Error creating PiWard:", piWardError);
                const errorMessage = piWardError instanceof Error ? piWardError.message : "Unknown error";
                return {
                    success: true,
                    message: `Tournament status updated to ${status}. Warning: PiWard creation failed - ${errorMessage}`,
                };
            }
        }

        return {
            success: true,
            message: `Tournament status updated to ${status}`,
        };
    } catch (error) {
        console.error("Error updating tournament status:", error);
        return {
            success: false,
            message: "Internal server error",
        };
    }
};