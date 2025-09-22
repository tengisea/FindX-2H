// Date utility functions for formatting dates throughout the application

/**
 * Format class year to readable grade name
 */
export const formatClassYear = (
  classYear: string | number | null | undefined
): string => {
  if (!classYear) return "Unknown Grade";

  const classStr = String(classYear);

  // Handle different formats
  if (classStr.startsWith("GRADE_")) {
    return classStr.replace("GRADE_", "Анги ");
  }

  // Handle numeric grades
  if (/^\d+$/.test(classStr)) {
    return `${classStr}-р анги`;
  }

  return classStr;
};

export const formatDate = (
  date: string | Date | number | null | undefined
): string => {
  if (!date || date === null || date === undefined) return "N/A";

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    // Clean the string - remove any non-numeric characters except dots and dashes
    const cleanedString = date.replace(/[^0-9.-]/g, "");

    // Check if it's a numeric string (timestamp)
    if (/^\d+$/.test(cleanedString)) {
      // Convert numeric string to number first
      dateObj = new Date(parseInt(cleanedString));
    } else {
      // Try parsing as regular date string
      dateObj = new Date(cleanedString);
    }
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    console.warn("Invalid date provided to formatDate:", date);
    return "N/A";
  }

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (date: string | Date | number): string => {
  if (!date) return "N/A";

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTime = (date: string | Date | number): string => {
  if (!date) return "N/A";

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  return dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const isDateInPast = (date: string | Date | number): boolean => {
  if (!date) return false;

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return false;
  }

  return dateObj < new Date();
};

export const isDateInFuture = (date: string | Date | number): boolean => {
  if (!date) return false;

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return false;
  }

  return dateObj > new Date();
};

export const getDaysUntil = (date: string | Date | number): number => {
  if (!date) return 0;

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return 0;
  }

  const today = new Date();
  const diffTime = dateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// Additional utility functions for better date handling
export const formatDateShort = (date: string | Date | number): string => {
  if (!date) return "N/A";

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateWithTime = (date: string | Date | number): string => {
  if (!date) return "N/A";

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  return dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getRelativeTime = (date: string | Date | number): string => {
  if (!date) return "N/A";

  let dateObj: Date;

  if (typeof date === "number") {
    // Handle numeric timestamp (milliseconds)
    dateObj = new Date(date);
  } else if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return formatDate(dateObj);
  }
};

// Debug function to help troubleshoot date issues
export const debugDate = (date: string | Date): void => {
  console.log("=== Date Debug Info ===");
  console.log("Original value:", date);
  console.log("Type:", typeof date);

  const dateObj = typeof date === "string" ? new Date(date) : date;
  console.log("Parsed Date object:", dateObj);
  console.log("Is valid:", !isNaN(dateObj.getTime()));
  console.log("ISO string:", dateObj.toISOString());
  console.log("Local string:", dateObj.toString());
  console.log("======================");
};

// Safe date formatter that handles all edge cases
export const safeFormatDate = (
  date: string | Date | number | null | undefined
): string => {
  // Handle null, undefined, empty string
  if (!date || date === null || date === undefined || date === "") {
    return "N/A";
  }

  // Handle invalid string dates
  if (typeof date === "string" && date.trim() === "") {
    return "N/A";
  }

  try {
    let dateObj: Date;

    if (typeof date === "number") {
      // Handle numeric timestamp (milliseconds)
      dateObj = new Date(date);
    } else if (typeof date === "string") {
      // Check if it's a Unix timestamp (numeric string)
      if (/^\d+$/.test(date)) {
        // Convert Unix timestamp (milliseconds) to Date
        dateObj = new Date(parseInt(date));
      } else {
        // Try parsing as ISO string or other date format
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date provided to safeFormatDate:", date);
      return "N/A";
    }

    // Check if date is too far in the past or future (likely invalid)
    const year = dateObj.getFullYear();
    if (year < 1900 || year > 2100) {
      console.warn("Date seems invalid (year out of range):", date);
      return "N/A";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", date, error);
    return "N/A";
  }
};

// Mongolian date formatting functions
export const formatDateMongolian = (
  date: string | Date | number | null | undefined
): string => {
  if (!date || date === null || date === undefined || date === "") {
    return "N/A";
  }

  try {
    let dateObj: Date;

    if (typeof date === "number") {
      dateObj = new Date(date);
    } else if (typeof date === "string") {
      if (/^\d+$/.test(date)) {
        dateObj = new Date(parseInt(date));
      } else {
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }

    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date provided to formatDateMongolian:", date);
      return "N/A";
    }

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    // Mongolian month names
    const monthNames = [
      "1-р сар",
      "2-р сар",
      "3-р сар",
      "4-р сар",
      "5-р сар",
      "6-р сар",
      "7-р сар",
      "8-р сар",
      "9-р сар",
      "10-р сар",
      "11-р сар",
      "12-р сар",
    ];

    return `${year} оны ${monthNames[month - 1]} ${day}-ны өдөр`;
  } catch (error) {
    console.error("Error formatting Mongolian date:", date, error);
    return "N/A";
  }
};

export const formatDateShortMongolian = (
  date: string | Date | number | null | undefined
): string => {
  if (!date || date === null || date === undefined || date === "") {
    return "N/A";
  }

  try {
    let dateObj: Date;

    if (typeof date === "number") {
      dateObj = new Date(date);
    } else if (typeof date === "string") {
      if (/^\d+$/.test(date)) {
        dateObj = new Date(parseInt(date));
      } else {
        dateObj = new Date(date);
      }
    } else {
      dateObj = date;
    }

    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date provided to formatDateShortMongolian:", date);
      return "N/A";
    }

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}.${month.toString().padStart(2, "0")}.${day
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    console.error("Error formatting short Mongolian date:", date, error);
    return "N/A";
  }
};
