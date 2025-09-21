import mongoose from "mongoose";
import {
  handleAsyncError,
  createGraphQLError,
  ErrorCodes,
} from "./errorHandler";

export const withTransaction = async <T>(
  operations: (session: mongoose.ClientSession) => Promise<T>
): Promise<T> => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      return await operations(session);
    });
  } catch (error: any) {
    console.error("❌ Transaction error:", error);
    throw createGraphQLError(
      error.message || "Transaction failed",
      ErrorCodes.INTERNAL_ERROR
    );
  } finally {
    await session.endSession();
  }
};

export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      console.warn(`⚠️ Attempt ${attempt} failed:`, error.message);

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      }
    }
  }

  throw lastError;
};
