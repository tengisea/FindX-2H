import { ClassYear } from "../models/ClassType.model";

export const mapClassYearToStudentFormat = (classYear: ClassYear): string => {
  const mapping: { [key in ClassYear]: string } = {
    [ClassYear.GRADE_1]: "GRADE_1",
    [ClassYear.GRADE_2]: "GRADE_2",
    [ClassYear.GRADE_3]: "GRADE_3",
    [ClassYear.GRADE_4]: "GRADE_4",
    [ClassYear.GRADE_5]: "GRADE_5",
    [ClassYear.GRADE_6]: "GRADE_6",
    [ClassYear.GRADE_7]: "GRADE_7",
    [ClassYear.GRADE_8]: "GRADE_8",
    [ClassYear.GRADE_9]: "GRADE_9",
    [ClassYear.GRADE_10]: "GRADE_10",
    [ClassYear.GRADE_11]: "GRADE_11",
    [ClassYear.GRADE_12]: "GRADE_12",
  };
  return mapping[classYear];
};

export const extractClassYearsFromOlympiad = (olympiad: any): ClassYear[] => {
  if (!olympiad.classtypes || !Array.isArray(olympiad.classtypes)) {
    return [];
  }

  return olympiad.classtypes.map((classType: any) => {
    const classYearValue = classType.classYear;
    return classYearValue as ClassYear;
  });
};
