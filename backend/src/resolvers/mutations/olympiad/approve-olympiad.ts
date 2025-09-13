import { OlympiadModel } from "@/models"; 

export const approveOlympiad = async (_: unknown, { id, input }: any) => {
  return OlympiadModel.findByIdAndUpdate(
    id,
    { $set: { scoreOfAward: input.scoreOfAward, status: "APPROVED" } },
    { new: true }
  ).populate("classtypes");
};
