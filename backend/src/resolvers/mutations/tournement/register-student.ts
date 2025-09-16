import { TournamentModel } from "../../../models";
import { StudentModel } from "../../../models";
import { MutationResolvers } from "../../../types/generated";

export const registerStudentToTournament: any = async (
  _: any,
  { tournamentId, studentId }: any
) => {
  const tournament = await TournamentModel.findById(tournamentId);
  if (!tournament) throw new Error("Tournament олдсонгүй");

  const student = await StudentModel.findById(studentId);
  if (!student) throw new Error("Student олдсонгүй");

  if (
    tournament.participants.some(
      (id) => id.toString() === student._id.toString()
    )
  ) {
    throw new Error("Сурагч аль хэдийн бүртгэгдсэн байна");
  }

  tournament.participants.push(student._id as any);
  await tournament.save();

  return {
    success: true,
    message: "Student registered successfully",
  };
};
