import { GraphQLError } from "graphql";

export enum ErrorCodes {
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  CONFLICT = "CONFLICT",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
}

export const createGraphQLError = (
  message: string,
  code: ErrorCodes = ErrorCodes.INTERNAL_ERROR,
  extensions?: Record<string, any>
) => {
  return new GraphQLError(message, {
    extensions: {
      code,
      ...extensions,
    },
  });
};

export const handleAsyncError = async <T>(
  operation: () => Promise<T>,
  errorMessage: string = "Operation failed"
): Promise<T> => {
  try {
    return await operation();
  } catch (error: any) {
    console.error("❌ Operation error:", error);
    if (error instanceof GraphQLError) {
      throw error;
    }
    throw createGraphQLError(
      error.message || errorMessage,
      ErrorCodes.INTERNAL_ERROR
    );
  }
};

// Validation helpers
export const validateRequired = (value: any, fieldName: string) => {
  if (value === null || value === undefined || value === "") {
    throw createGraphQLError(
      `${fieldName} is required`,
      ErrorCodes.VALIDATION_ERROR
    );
  }
};

export const validateDateRange = (
  startDate: Date,
  endDate: Date,
  fieldNames: [string, string]
) => {
  if (startDate && endDate && startDate > endDate) {
    throw createGraphQLError(
      `${fieldNames[0]} cannot be after ${fieldNames[1]}`,
      ErrorCodes.VALIDATION_ERROR
    );
  }
};

export const validateScoreRange = (
  score: number,
  min: number = 0,
  max: number = 100
) => {
  if (score < min || score > max) {
    throw createGraphQLError(
      `Score must be between ${min} and ${max}`,
      ErrorCodes.VALIDATION_ERROR
    );
  }
};
