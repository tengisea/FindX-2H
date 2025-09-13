import { OlympiadModel } from "@/models";

export const deleteOlympiad = async (_: unknown, { id }: any) => {
  const result = await OlympiadModel.findByIdAndDelete(id);
  return !!result;
};
