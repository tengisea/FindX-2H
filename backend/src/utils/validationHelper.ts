import { createGraphQLError, ErrorCodes } from "./errorHandler";

export const validateOlympiadInput = (input: any) => {
  // Validate date ranges
  if (input.closeDay && input.occurringDay) {
    const closeDate = new Date(input.closeDay);
    const occurringDate = new Date(input.occurringDay);

    if (closeDate > occurringDate) {
      throw createGraphQLError(
        "Close day cannot be after occurring day",
        ErrorCodes.VALIDATION_ERROR
      );
    }
  }

  // Validate class types
  if (input.classtypes && input.classtypes.length === 0) {
    throw createGraphQLError(
      "At least one class type is required",
      ErrorCodes.VALIDATION_ERROR
    );
  }

  // Validate class type questions
  if (input.classtypes) {
    input.classtypes.forEach((classType: any, index: number) => {
      if (!classType.questions || classType.questions.length === 0) {
        throw createGraphQLError(
          `Class type ${index + 1} must have at least one question`,
          ErrorCodes.VALIDATION_ERROR
        );
      }

      // Validate question scores
      classType.questions.forEach((question: any, qIndex: number) => {
        if (question.maxScore <= 0) {
          throw createGraphQLError(
            `Question ${qIndex + 1} in class type ${
              index + 1
            } must have a positive score`,
            ErrorCodes.VALIDATION_ERROR
          );
        }
      });
    });
  }
};

export const validateStudentAnswerInput = (input: any) => {
  if (!input.answers || input.answers.length === 0) {
    throw createGraphQLError(
      "At least one answer is required",
      ErrorCodes.VALIDATION_ERROR
    );
  }

  // Validate answer scores
  input.answers.forEach((answer: any, index: number) => {
    if (answer.score < 0) {
      throw createGraphQLError(
        `Answer ${index + 1} cannot have negative score`,
        ErrorCodes.VALIDATION_ERROR
      );
    }
  });
};

export const validateClassRoomInput = (input: any) => {
  if (input.maxStudents && input.maxStudents <= 0) {
    throw createGraphQLError(
      "Max students must be greater than 0",
      ErrorCodes.VALIDATION_ERROR
    );
  }

  if (input.roomNumber && input.roomNumber.trim() === "") {
    throw createGraphQLError(
      "Room number cannot be empty",
      ErrorCodes.VALIDATION_ERROR
    );
  }
};

export const validateRegistrationInput = (input: any) => {
  if (!input.studentId || !input.classTypeId || !input.olympiadId) {
    throw createGraphQLError(
      "Student ID, Class Type ID, and Olympiad ID are required",
      ErrorCodes.VALIDATION_ERROR
    );
  }
};

export const validateStudentInput = (input: any) => {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    throw createGraphQLError(
      "Invalid email format",
      ErrorCodes.VALIDATION_ERROR
    );
  }

  // Name validation
  if (!input.name || input.name.trim().length < 2) {
    throw createGraphQLError(
      "Name must be at least 2 characters long",
      ErrorCodes.VALIDATION_ERROR
    );
  }

  // School validation
  if (!input.school || input.school.trim().length < 2) {
    throw createGraphQLError(
      "School name must be at least 2 characters long",
      ErrorCodes.VALIDATION_ERROR
    );
  }

  // Profile picture URL validation
  if (input.profilePicture) {
    try {
      new URL(input.profilePicture);
    } catch {
      throw createGraphQLError(
        "Invalid profile picture URL",
        ErrorCodes.VALIDATION_ERROR
      );
    }
  }
};

export const validateObjectId = (id: string, fieldName: string = "ID") => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(id)) {
    throw createGraphQLError(
      `Invalid ${fieldName} format`,
      ErrorCodes.VALIDATION_ERROR
    );
  }
};
