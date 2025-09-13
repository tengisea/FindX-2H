import { OlympiadModel } from "@/models";

export const allOlympiads = async () => {
  return OlympiadModel.find().populate("classtypes");
};
