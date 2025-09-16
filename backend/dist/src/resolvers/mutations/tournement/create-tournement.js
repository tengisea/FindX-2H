import { TournamentModel } from "../../../models/tournement/Tournament.model";
export const createTournament = async (_, { tournamentInput }) => {
    const tournament = await TournamentModel.create(tournamentInput);
    return {
        success: true,
        message: "Tournament created successfully",
    };
};
