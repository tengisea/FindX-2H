import { MatchRoomModel } from "../../../models/tournement/MatchRoom.model";

export const getMatchRooms = async (
    _: any,
    { tournamentId }: { tournamentId: string }
) => {
    try {
        const matchRooms = await MatchRoomModel.find({ tournament: tournamentId })
            .populate('slotA')
            .populate('slotB')
            .populate('winner')
            .populate('loser');


        // Transform the data to match GraphQL schema expectations
        return matchRooms.map(matchRoom => {
            // Helper function to safely extract ID from populated or non-populated field
            const extractId = (field: any): string => {
                if (!field) return '';
                if (typeof field === 'string') return field;
                if (field._id) return field._id.toString();
                if (field.toString) return field.toString();
                return '';
            };

            return {
                id: matchRoom._id.toString(),
                task: matchRoom.task,
                round: matchRoom.round,
                scheduleAt: matchRoom.scheduleAt.toISOString(),
                slotA: matchRoom.slotA ? extractId(matchRoom.slotA) : null,
                slotB: matchRoom.slotB ? extractId(matchRoom.slotB) : null,
                winner: matchRoom.winner ? extractId(matchRoom.winner) : null,
                loser: matchRoom.loser ? extractId(matchRoom.loser) : null,
                tournament: matchRoom.tournament.toString(),
                status: matchRoom.status,
                // Include populated student data for frontend use
                slotAData: matchRoom.slotA,
                slotBData: matchRoom.slotB,
                winnerData: matchRoom.winner,
                loserData: matchRoom.loser,
            };
        });
    } catch (error) {
        console.error("Error fetching match rooms:", error);
        throw new Error("Failed to fetch match rooms");
    }
};