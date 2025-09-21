import { OlympiadRankingType } from "@/generated";

export const getRankingTypeDisplayName = (rankingType: OlympiadRankingType | null | undefined): string => {
  if (!rankingType) return "Not specified";
  
  switch (rankingType) {
    case OlympiadRankingType.School:
      return "School Level";
    case OlympiadRankingType.District:
      return "District Level";
    case OlympiadRankingType.Regional:
      return "Regional Level";
    case OlympiadRankingType.National:
      return "National Level";
    case OlympiadRankingType.ATier:
      return "A Tier";
    case OlympiadRankingType.BTier:
      return "B Tier";
    case OlympiadRankingType.CTier:
      return "C Tier";
    default:
      return rankingType;
  }
};
