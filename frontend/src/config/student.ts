// Centralized student configuration
// This file contains the student ID that should be used across all student-related components

export const STUDENT_CONFIG = {
    // Default student ID - in a real app, this would come from authentication context
    DEFAULT_STUDENT_ID: '68c54f3c22ed3250680b05cb',

    // Alternative student ID for testing different scenarios (unregistered student)
    TEST_STUDENT_ID: '68c54f3c22ed3250680b05cb',

    // Unregistered student ID for testing registration flow
    UNREGISTERED_STUDENT_ID: '68c54f3c22ed3250680b05cb',

    // Completely different student ID for testing unregistered scenarios
    NEW_UNREGISTERED_STUDENT_ID: '68c54f3c22ed3250680b05cb',
} as const;

// Helper function to get the current student ID
// In a real app, this would get the ID from authentication context
export const getCurrentStudentId = (): string => {
    // For testing purposes, using the registered student ID to show tournament bracket
    // In production, this would be: return authContext.user?.id || STUDENT_CONFIG.DEFAULT_STUDENT_ID;
    return STUDENT_CONFIG.DEFAULT_STUDENT_ID;
};

// Helper function to check if a student is registered for a tournament
export const isStudentRegistered = (studentId: string, participants: string[]): boolean => {
    return participants.includes(studentId);
};

// Helper function to switch between registered and unregistered student for testing
export const switchToRegisteredStudent = (): string => {
    return STUDENT_CONFIG.DEFAULT_STUDENT_ID;
};

export const switchToUnregisteredStudent = (): string => {
    return STUDENT_CONFIG.TEST_STUDENT_ID;
};