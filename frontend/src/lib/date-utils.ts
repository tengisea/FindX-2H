// Date utility functions for formatting dates throughout the application

export const formatDate = (date: string | Date | null | undefined): string => {
    if (!date || date === null || date === undefined) return "N/A";

    const dateObj = typeof date === "string" ? new Date(date) : date;

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

export const formatDateTime = (date: string | Date): string => {
    if (!date) return "N/A";

    const dateObj = typeof date === "string" ? new Date(date) : date;

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

export const formatTime = (date: string | Date): string => {
    if (!date) return "N/A";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return "Invalid Date";
    }

    return dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const isDateInPast = (date: string | Date): boolean => {
    if (!date) return false;

    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return false;
    }

    return dateObj < new Date();
};

export const isDateInFuture = (date: string | Date): boolean => {
    if (!date) return false;

    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return false;
    }

    return dateObj > new Date();
};

export const getDaysUntil = (date: string | Date): number => {
    if (!date) return 0;

    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return 0;
    }

    const today = new Date();
    const diffTime = dateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};

// Additional utility functions for better date handling
export const formatDateShort = (date: string | Date): string => {
    if (!date) return "N/A";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
        return "Invalid Date";
    }

    return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

export const formatDateWithTime = (date: string | Date): string => {
    if (!date) return "N/A";

    const dateObj = typeof date === "string" ? new Date(date) : date;

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

export const getRelativeTime = (date: string | Date): string => {
    if (!date) return "N/A";

    const dateObj = typeof date === "string" ? new Date(date) : date;

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
    date: string | Date | null | undefined
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

        if (typeof date === "string") {
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