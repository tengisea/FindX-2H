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
    ANGI_1: "1р анги",
    ANGI_2: "2р анги",
    ANGI_3: "3р анги",
    ANGI_4: "4р анги",
    ANGI_5: "5р анги",
    ANGI_6: "6р анги",
    ANGI_7: "7р анги",
    ANGI_8: "8р анги",
    ANGI_9: "9р анги",
    ANGI_10: "10р анги",
    ANGI_11: "11р анги",
    ANGI_12: "12р анги",
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
    "1р анги": "ANGI_1",
    "2р анги": "ANGI_2",
    "3р анги": "ANGI_3",
    "4р анги": "ANGI_4",
    "5р анги": "ANGI_5",
    "6р анги": "ANGI_6",
    "7р анги": "ANGI_7",
    "8р анги": "ANGI_8",
    "9р анги": "ANGI_9",
    "10р анги": "ANGI_10",
    "11р анги": "ANGI_11",
    "12р анги": "ANGI_12",
  };

  return mapping[dbValue] || dbValue;
};
