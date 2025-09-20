// Helper function to format grade as "nth Grade"
export const formatGrade = (classString: string) => {
  if (!classString) return "Unknown Grade";
  
  // Remove "GRADE_" prefix and get the number
  const gradeNumber = classString.replace("GRADE_", "");
  const num = parseInt(gradeNumber);
  
  if (isNaN(num)) return classString;
  
  // Convert to ordinal
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;
  
  let suffix;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    suffix = "th";
  } else if (lastDigit === 1) {
    suffix = "st";
  } else if (lastDigit === 2) {
    suffix = "nd";
  } else if (lastDigit === 3) {
    suffix = "rd";
  } else {
    suffix = "th";
  }
  
  return `${num}${suffix} Grade`;
};
