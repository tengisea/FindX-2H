import { StudentModel } from "../../../models";
import { GraphQLError } from "graphql";
import { Types } from "mongoose";

export const students = async (
  _: unknown,
  {
    class: classYear,
    school,
    province,
    district,
    olympiadId,
    medal,
  }: {
    class?: string;
    school?: string;
    province?: string;
    district?: string;
    olympiadId?: string;
    medal?: string;
  }
) => {
  try {
    // Build query object based on provided filters
    const query: any = {};

    if (classYear) {
      query.class = classYear;
    }
    if (school) {
      query.school = school;
    }
    if (province) {
      query.province = province;
    }
    if (district) {
      query.district = district;
    }
    if (olympiadId) {
      if (!Types.ObjectId.isValid(olympiadId)) {
        throw new GraphQLError("Invalid olympiad ID format");
      }
      query.participatedOlympiads = olympiadId;
    }
    if (medal) {
      if (!["GOLD", "SILVER", "BRONZE", "TOP10"].includes(medal)) {
        throw new GraphQLError(
          "Invalid medal type. Must be GOLD, SILVER, BRONZE, or TOP10"
        );
      }
      query[medal.toLowerCase()] = { $exists: true, $ne: [] };
    }

    const students = await StudentModel.find(query).lean();

    return students.map((student: any) => {
      const { _id, ...rest } = student;
      return {
        id: String(_id),
        ...rest,
        participatedOlympiads:
          rest.participatedOlympiads?.map((id: any) => String(id)) || [],
        gold: rest.gold?.map((id: any) => String(id)) || [],
        silver: rest.silver?.map((id: any) => String(id)) || [],
        bronze: rest.bronze?.map((id: any) => String(id)) || [],
        top10: rest.top10?.map((id: any) => String(id)) || [],
        rankingHistory:
          rest.rankingHistory?.map((entry: any) => ({
            ...entry,
            changedBy: String(entry.changedBy),
            olympiadId: entry.olympiadId ? String(entry.olympiadId) : null,
          })) || [],
      };
    });
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
