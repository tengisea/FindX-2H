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
    [ClassYear.C_CLASS]: "C_CLASS",
    [ClassYear.D_CLASS]: "D_CLASS",
    [ClassYear.E_CLASS]: "E_CLASS",
    [ClassYear.F_CLASS]: "F_CLASS",
    [ClassYear.ANGI_1]: "ANGI_1",
    [ClassYear.ANGI_2]: "ANGI_2",
    [ClassYear.ANGI_3]: "ANGI_3",
    [ClassYear.ANGI_4]: "ANGI_4",
    [ClassYear.ANGI_5]: "ANGI_5",
    [ClassYear.ANGI_6]: "ANGI_6",
    [ClassYear.ANGI_7]: "ANGI_7",
    [ClassYear.ANGI_8]: "ANGI_8",
    [ClassYear.ANGI_9]: "ANGI_9",
    [ClassYear.ANGI_10]: "ANGI_10",
    [ClassYear.ANGI_11]: "ANGI_11",
    [ClassYear.ANGI_12]: "ANGI_12",
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
