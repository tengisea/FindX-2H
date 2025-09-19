import { ClassYear } from "../models/ClassType.model";
import { CLASS_YEAR_MAPPING } from "../lib/enumUtils";

export const mapClassYearToStudentFormat = (classYear: ClassYear): string => {
  return (
    CLASS_YEAR_MAPPING[classYear as keyof typeof CLASS_YEAR_MAPPING] ||
    classYear
  );
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
