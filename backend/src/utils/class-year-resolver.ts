import { ClassYear } from "@/models/ClassType.model";

/**
 * Maps GraphQL ClassYear enum values to database values
 */
export const mapClassYearToDB = (graphqlValue: string): string => {
  const mapping: Record<string, string> = {
    GRADE_1: "GRADE_1",
    GRADE_2: "GRADE_2",
    GRADE_3: "GRADE_3",
    GRADE_4: "GRADE_4",
    GRADE_5: "GRADE_5",
    GRADE_6: "GRADE_6",
    GRADE_7: "GRADE_7",
    GRADE_8: "GRADE_8",
    GRADE_9: "GRADE_9",
    GRADE_10: "GRADE_10",
    GRADE_11: "GRADE_11",
    GRADE_12: "GRADE_12",
    C_CLASS: "C_CLASS",
    D_CLASS: "D_CLASS",
    E_CLASS: "E_CLASS",
    F_CLASS: "F_CLASS",
  };

  return mapping[graphqlValue] || graphqlValue;
};

/**
 * Maps database ClassYear values to GraphQL enum values
 */
export const mapClassYearToGraphQL = (dbValue: string): string => {
  const mapping: Record<string, string> = {
    GRADE_1: "GRADE_1",
    GRADE_2: "GRADE_2",
    GRADE_3: "GRADE_3",
    GRADE_4: "GRADE_4",
    GRADE_5: "GRADE_5",
    GRADE_6: "GRADE_6",
    GRADE_7: "GRADE_7",
    GRADE_8: "GRADE_8",
    GRADE_9: "GRADE_9",
    GRADE_10: "GRADE_10",
    GRADE_11: "GRADE_11",
    GRADE_12: "GRADE_12",
    C_CLASS: "C_CLASS",
    D_CLASS: "D_CLASS",
    E_CLASS: "E_CLASS",
    F_CLASS: "F_CLASS",
  };

  return mapping[dbValue] || dbValue;
};
