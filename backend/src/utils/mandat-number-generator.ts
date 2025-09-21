import { ClassYear } from "@/models/ClassType.model";

/**
 * Generates a unique mandat number for a student registering for a class type
 * Format: {classTypeNumber}{participantIndex}
 * Example: Grade 6 (classTypeNumber: 6) + 10th participant = "6010"
 */
export const generateMandatNumber = (
  classYear: ClassYear,
  participantIndex: number
): string => {
  // Map ClassYear enum to numbers
  const classYearToNumber: Record<ClassYear, string> = {
    [ClassYear.GRADE_1]: "1",
    [ClassYear.GRADE_2]: "2",
    [ClassYear.GRADE_3]: "3",
    [ClassYear.GRADE_4]: "4",
    [ClassYear.GRADE_5]: "5",
    [ClassYear.GRADE_6]: "6",
    [ClassYear.GRADE_7]: "7",
    [ClassYear.GRADE_8]: "8",
    [ClassYear.GRADE_9]: "9",
    [ClassYear.GRADE_10]: "10",
    [ClassYear.GRADE_11]: "11",
    [ClassYear.GRADE_12]: "12",
    [ClassYear.C_CLASS]: "13",
    [ClassYear.D_CLASS]: "14",
    [ClassYear.E_CLASS]: "15",
    [ClassYear.F_CLASS]: "16",
  };

  const classTypeNumber = classYearToNumber[classYear];
  const participantNumber = participantIndex.toString().padStart(3, "0");
  
  return `${classTypeNumber}${participantNumber}`;
};
