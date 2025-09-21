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
} as const;

export const REVERSE_CLASS_YEAR_MAPPING = Object.fromEntries(
  Object.entries(CLASS_YEAR_MAPPING).map(([key, value]) => [value, key])
);

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
  return REVERSE_CLASS_YEAR_MAPPING[dbValue] || dbValue;
};

/**
 * Transform Mongoose document to GraphQL response format
 */
export const transformDocument = (doc: any) => {
  if (!doc) return null;

  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    ...obj,
    id: obj._id?.toString() || obj.id,
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
