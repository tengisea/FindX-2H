/**
 * Utility functions for safe date handling
 */

/**
 * Safely formats a date string to a localized date string
 * @param dateString - The date string to format
 * @param fallback - Fallback text to show if date is invalid (default: "Date not available")
 * @returns Formatted date string or fallback text
 */
export const formatDate = (
  dateString: string | null | undefined,
  fallback: string = "Date not available"
): string => {
  if (!dateString) {
    return fallback;
  }

  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return fallback;
    }

    return date.toLocaleDateString();
  } catch (error) {
    console.warn("Error formatting date:", dateString, error);
    return fallback;
  }
};

/**
 * Safely formats a date string to a localized date and time string
 * @param dateString - The date string to format
 * @param fallback - Fallback text to show if date is invalid (default: "Date not available")
 * @returns Formatted date and time string or fallback text
 */
export const formatDateTime = (
  dateString: string | null | undefined,
  fallback: string = "Date not available"
): string => {
  if (!dateString) {
    return fallback;
  }

  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return fallback;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.warn("Error formatting date and time:", dateString, error);
    return fallback;
  }
};

/**
 * Safely calculates days until a date
 * @param dateString - The date string to calculate from
 * @returns Number of days until the date, or 0 if invalid
 */
export const getDaysUntilDate = (
  dateString: string | null | undefined
): number => {
  if (!dateString) {
    return 0;
  }

  try {
    const now = new Date();
    const targetDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(targetDate.getTime())) {
      return 0;
    }

    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    console.warn("Error calculating days until date:", dateString, error);
    return 0;
  }
};

/**
 * Checks if a date string is valid
 * @param dateString - The date string to validate
 * @returns True if the date is valid, false otherwise
 */
export const isValidDate = (dateString: string | null | undefined): boolean => {
  if (!dateString) {
    return false;
  }

  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch (error) {
    return false;
  }
};
