import { QueryResolvers } from "@/types/generated";

export const example: QueryResolvers["example"] = async () => {
  return {
    id: "1",
    age: 25,
    phoneNumber: "99998888",
  };
};
