import { ClassYear } from '../models/ClassType.model';

export const mapClassYearToStudentFormat = (classYear: ClassYear): string => {
  const mapping: { [key in ClassYear]: string } = {
    [ClassYear.GRADE_1]: '1р анги',
    [ClassYear.GRADE_2]: '2р анги',
    [ClassYear.GRADE_3]: '3р анги',
    [ClassYear.GRADE_4]: '4р анги',
    [ClassYear.GRADE_5]: '5р анги',
    [ClassYear.GRADE_6]: '6р анги',
    [ClassYear.GRADE_7]: '7р анги',
    [ClassYear.GRADE_8]: '8р анги',
    [ClassYear.GRADE_9]: '9р анги',
    [ClassYear.GRADE_10]: '10р анги',
    [ClassYear.GRADE_11]: '11р анги',
    [ClassYear.GRADE_12]: '12р анги',
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