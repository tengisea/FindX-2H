import { OlympiadModel } from "@/models";

export const olympiad = async (_: any, { id }: any) => {
  return OlympiadModel.findById(id).populate("classtypes");
};
