import mongoose from "mongoose";
import { RankingError, RANKING_ERROR_CODES } from "@/types/ranking.types";

/**
 * Utility class for handling database transactions
 * Provides consistent transaction management across the application
 */
export class TransactionHelper {
  /**
   * Execute a function within a database transaction
   *
   * @param operation - Function to execute within transaction
   * @param options - Transaction options
   * @returns Result of the operation
   */
  static async withTransaction<T>(
    operation: (session: mongoose.ClientSession) => Promise<T>,
    options: {
      retries?: number;
      maxRetries?: number;
      retryDelay?: number;
    } = {}
  ): Promise<T> {
    const { retries = 0, maxRetries = 3, retryDelay = 1000 } = options;

    const session = await mongoose.startSession();

    try {
      return await session.withTransaction(async () => {
        return await operation(session);
      });
    } catch (error) {
      // If this is a retryable error and we haven't exceeded max retries, retry
      if (retries < maxRetries && this.isRetryableError(error)) {
        console.warn(
          `Transaction failed, retrying (${retries + 1}/${maxRetries}):`,
          error
        );

        // Wait before retrying
        await new Promise((resolve) =>
          setTimeout(resolve, retryDelay * (retries + 1))
        );

        return this.withTransaction(operation, {
          retries: retries + 1,
          maxRetries,
          retryDelay,
        });
      }

      throw new RankingError(
        `Transaction failed after ${retries + 1} attempts: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        RANKING_ERROR_CODES.TRANSACTION_FAILED,
        { error, retries, maxRetries }
      );
    } finally {
      await session.endSession();
    }
  }

  /**
   * Execute multiple operations in a single transaction
   *
   * @param operations - Array of operations to execute
   * @param options - Transaction options
   * @returns Array of results from all operations
   */
  static async withMultipleOperations<T>(
    operations: Array<(session: mongoose.ClientSession) => Promise<T>>,
    options: {
      retries?: number;
      maxRetries?: number;
      retryDelay?: number;
    } = {}
  ): Promise<T[]> {
    return this.withTransaction(async (session) => {
      const results: T[] = [];

      for (const operation of operations) {
        const result = await operation(session);
        results.push(result);
      }

      return results;
    }, options);
  }

  /**
   * Check if an error is retryable
   *
   * @param error - Error to check
   * @returns true if error is retryable
   */
  private static isRetryableError(error: any): boolean {
    if (!error) return false;

    // MongoDB transient errors that can be retried
    const retryableErrors = [
      "TransientTransactionError",
      "UnknownTransactionCommitResult",
      "WriteConflict",
      "NetworkTimeout",
      "HostUnreachable",
      "HostNotFound",
      "NetworkInterfaceExceededTimeLimit",
      "SocketException",
    ];

    const errorMessage = error.message || error.toString();
    const errorName = error.name || "";

    return retryableErrors.some(
      (retryableError) =>
        errorMessage.includes(retryableError) ||
        errorName.includes(retryableError)
    );
  }

  /**
   * Execute a bulk operation with transaction support
   *
   * @param model - Mongoose model
   * @param operations - Bulk operations
   * @param options - Transaction options
   * @returns Result of bulk operation
   */
  static async bulkWriteWithTransaction<T>(
    model: mongoose.Model<T>,
    operations: mongoose.AnyBulkWriteOperation<T>[],
    options: {
      session?: mongoose.ClientSession;
      retries?: number;
      maxRetries?: number;
      retryDelay?: number;
    } = {}
  ): Promise<mongoose.mongo.BulkWriteResult> {
    const { session, retries = 0, maxRetries = 3, retryDelay = 1000 } = options;

    if (session) {
      // Use existing session
      return model.bulkWrite(operations, { session });
    }

    // Create new transaction
    return this.withTransaction(
      async (newSession) => {
        return model.bulkWrite(operations, { session: newSession });
      },
      { retries, maxRetries, retryDelay }
    );
  }

  /**
   * Execute a find and update operation with transaction support
   *
   * @param model - Mongoose model
   * @param filter - Query filter
   * @param update - Update operation
   * @param options - Transaction options
   * @returns Updated document
   */
  static async findByIdAndUpdateWithTransaction<T>(
    model: mongoose.Model<T>,
    id: string | mongoose.Types.ObjectId,
    update: mongoose.UpdateQuery<T>,
    options: {
      session?: mongoose.ClientSession;
      retries?: number;
      maxRetries?: number;
      retryDelay?: number;
    } = {}
  ): Promise<T | null> {
    const { session, retries = 0, maxRetries = 3, retryDelay = 1000 } = options;

    if (session) {
      // Use existing session
      return model.findByIdAndUpdate(id, update, { session, new: true });
    }

    // Create new transaction
    return this.withTransaction(
      async (newSession) => {
        return model.findByIdAndUpdate(id, update, {
          session: newSession,
          new: true,
        });
      },
      { retries, maxRetries, retryDelay }
    );
  }
}

// Named exports for convenience
export const withTransaction = TransactionHelper.withTransaction;
export const withMultipleOperations = TransactionHelper.withMultipleOperations;
export const bulkWriteWithTransaction =
  TransactionHelper.bulkWriteWithTransaction;
export const findByIdAndUpdateWithTransaction =
  TransactionHelper.findByIdAndUpdateWithTransaction;
