import { TournamentModel } from "../../../models/tournement/Tournament.model";
import { MutationResolvers } from "../../../types/generated";

export const createTournament: any = async (
  _: any,
  { tournamentInput }: any
) => {
  const tournament = await TournamentModel.create(tournamentInput);
  return {
    success: true,
    message: "Tournament created successfully",
  };
};
