// Shared utility functions for enum mapping and data transformation

export const CLASS_YEAR_MAPPING = {
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
  // Mongolian class names
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
} as const;

export const REVERSE_CLASS_YEAR_MAPPING = Object.fromEntries(
  Object.entries(CLASS_YEAR_MAPPING).map(([key, value]) => [value, key])
);

// Mapping from English enum values to Mongolian display format
export const ENGLISH_TO_MONGOLIAN_MAPPING = {
  'GRADE_1': '1р анги',
  'GRADE_2': '2р анги',
  'GRADE_3': '3р анги',
  'GRADE_4': '4р анги',
  'GRADE_5': '5р анги',
  'GRADE_6': '6р анги',
  'GRADE_7': '7р анги',
  'GRADE_8': '8р анги',
  'GRADE_9': '9р анги',
  'GRADE_10': '10р анги',
  'GRADE_11': '11р анги',
  'GRADE_12': '12р анги',
  'C_CLASS': 'C анги',
  'D_CLASS': 'D анги',
  'E_CLASS': 'E анги',
  'F_CLASS': 'F анги',
} as const;

// Reverse mapping from Mongolian to English enum values
export const MONGOLIAN_TO_ENGLISH_MAPPING = {
  '1р анги': 'GRADE_1',
  '2р анги': 'GRADE_2',
  '3р анги': 'GRADE_3',
  '4р анги': 'GRADE_4',
  '5р анги': 'GRADE_5',
  '6р анги': 'GRADE_6',
  '7р анги': 'GRADE_7',
  '8р анги': 'GRADE_8',
  '9р анги': 'GRADE_9',
  '10р анги': 'GRADE_10',
  '11р анги': 'GRADE_11',
  '12р анги': 'GRADE_12',
  'C анги': 'C_CLASS',
  'D анги': 'D_CLASS',
  'E анги': 'E_CLASS',
  'F анги': 'F_CLASS',
} as const;

/**
 * Convert GraphQL enum to database value
 */
export const mapClassYearToDB = (graphqlEnum: string): string => {
  return (
    CLASS_YEAR_MAPPING[graphqlEnum as keyof typeof CLASS_YEAR_MAPPING] ||
    graphqlEnum
  );
};

/**
 * Convert database value to GraphQL enum
 */
export const mapClassYearToGraphQL = (dbValue: string): string => {
  // First try the reverse mapping for standard English values
  if (REVERSE_CLASS_YEAR_MAPPING[dbValue]) {
    return REVERSE_CLASS_YEAR_MAPPING[dbValue];
  }
  
  // If it's a Mongolian value, convert to English enum
  if (MONGOLIAN_TO_ENGLISH_MAPPING[dbValue as keyof typeof MONGOLIAN_TO_ENGLISH_MAPPING]) {
    return MONGOLIAN_TO_ENGLISH_MAPPING[dbValue as keyof typeof MONGOLIAN_TO_ENGLISH_MAPPING];
  }
  
  // If still not found, return the original value
  return dbValue;
};

/**
 * Convert English enum value to Mongolian display format
 */
export const mapClassYearToMongolian = (englishValue: string): string => {
  return ENGLISH_TO_MONGOLIAN_MAPPING[englishValue as keyof typeof ENGLISH_TO_MONGOLIAN_MAPPING] || englishValue;
};

/**
 * Transform Mongoose document to GraphQL response format
 */
export const transformDocument = (doc: any) => {
  if (!doc) return null;

  const obj = doc.toObject ? doc.toObject() : doc;

  // Transform ObjectId arrays to string arrays
  const transformedObj = { ...obj };

  // Handle common ObjectId array fields
  const objectIdArrayFields = [
    "rooms",
    "participants",
    "studentsAnswers",
    "gold",
    "silver",
    "bronze",
    "top10",
    "questions",
    "classtypes",
    "participatedOlympiads",
  ];

  objectIdArrayFields.forEach((field) => {
    if (transformedObj[field] && Array.isArray(transformedObj[field])) {
      transformedObj[field] = transformedObj[field].map((item: any) => {
        if (item && typeof item === "object" && item._id) {
          return item._id.toString();
        }
        return item?.toString() || item;
      });
    }
  });

  // Ensure id is always set correctly
  const finalId = obj._id?.toString() || obj.id || transformedObj.id;

  return {
    ...transformedObj,
    id: finalId,
    _id: undefined, // Remove _id from response
  };
};

/**
 * Transform array of Mongoose documents
 */
export const transformDocuments = (docs: any[]) => {
  return docs.map(transformDocument);
};

/**
 * Transform nested objects (for populated fields)
 */
export const transformNestedObject = (obj: any): any => {
  if (!obj) return null;

  if (Array.isArray(obj)) {
    return obj
      .map(transformNestedObject)
      .filter((item) => item !== null && item !== undefined);
  }

  if (obj.toObject) {
    const transformed = obj.toObject();
    return {
      ...transformed,
      id: transformed._id?.toString() || transformed.id,
      _id: undefined,
    };
  }

  // Handle objects that already have _id but no id field
  if (obj._id && !obj.id) {
    return {
      ...obj,
      id: obj._id.toString(),
      _id: undefined,
    };
  }

  return obj;
};
