// Class mapping utilities for frontend
// This mirrors the backend enumUtils.ts mapping

export const ENGLISH_TO_MONGOLIAN_CLASS_MAPPING = {
  GRADE_1: "1р анги",
  GRADE_2: "2р анги",
  GRADE_3: "3р анги",
  GRADE_4: "4р анги",
  GRADE_5: "5р анги",
  GRADE_6: "6р анги",
  GRADE_7: "7р анги",
  GRADE_8: "8р анги",
  GRADE_9: "9р анги",
  GRADE_10: "10р анги",
  GRADE_11: "11р анги",
  GRADE_12: "12р анги",
  C_CLASS: "C анги",
  D_CLASS: "D анги",
  E_CLASS: "E анги",
  F_CLASS: "F анги",
} as const;

export const MONGOLIAN_TO_ENGLISH_CLASS_MAPPING = {
  "1р анги": "GRADE_1",
  "2р анги": "GRADE_2",
  "3р анги": "GRADE_3",
  "4р анги": "GRADE_4",
  "5р анги": "GRADE_5",
  "6р анги": "GRADE_6",
  "7р анги": "GRADE_7",
  "8р анги": "GRADE_8",
  "9р анги": "GRADE_9",
  "10р анги": "GRADE_10",
  "11р анги": "GRADE_11",
  "12р анги": "GRADE_12",
  "C анги": "C_CLASS",
  "D анги": "D_CLASS",
  "E анги": "E_CLASS",
  "F анги": "F_CLASS",
} as const;

/**
 * Convert English class enum to Mongolian display format
 */
export const mapClassToMongolian = (englishValue: string): string => {
  return (
    ENGLISH_TO_MONGOLIAN_CLASS_MAPPING[
      englishValue as keyof typeof ENGLISH_TO_MONGOLIAN_CLASS_MAPPING
    ] || englishValue
  );
};

/**
 * Convert Mongolian class display to English enum
 */
export const mapClassToEnglish = (mongolianValue: string): string => {
  return (
    MONGOLIAN_TO_ENGLISH_CLASS_MAPPING[
      mongolianValue as keyof typeof MONGOLIAN_TO_ENGLISH_CLASS_MAPPING
    ] || mongolianValue
  );
};

/**
 * Get all available classes in Mongolian format
 */
export const getAllClassesInMongolian = (): string[] => {
  return Object.values(ENGLISH_TO_MONGOLIAN_CLASS_MAPPING);
};

/**
 * Get all available classes in English format
 */
export const getAllClassesInEnglish = (): string[] => {
  return Object.keys(ENGLISH_TO_MONGOLIAN_CLASS_MAPPING);
};
