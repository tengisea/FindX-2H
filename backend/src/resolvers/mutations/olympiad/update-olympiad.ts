import { OlympiadModel } from "@/models";

export const updateOlympiad = async (_:unknown, { id, input }: any) => {
  return OlympiadModel.findByIdAndUpdate(
    id,
    { $set: input },
    { new: true }
  ).populate("classtypes");
};
