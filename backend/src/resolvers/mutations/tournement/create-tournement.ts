import { TournamentModel } from "../../../models/tournement/Tournament.model";
import { MutationResolvers } from "../../../types/generated";

export const createTournament: MutationResolvers["createTournament"] = async (_, { tournamentInput },) => {
    const tournament = await TournamentModel.create(tournamentInput);
    return {
        success: true,
        message: "Tournament created successfully",
    };
};