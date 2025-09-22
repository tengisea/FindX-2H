// Medal Preview System Types

export interface StudentMedalInfo {
  studentId: string;
  studentName: string;
  score: number;
  rank: number;
}

export interface MedalPreview {
  classTypeId: string;
  classYear: string;
  totalParticipants: number;
  medalists: number;
  gold: StudentMedalInfo[];
  silver: StudentMedalInfo[];
  bronze: StudentMedalInfo[];
  top10: StudentMedalInfo[];
}

export interface PreviewMedalsResponse {
  success: boolean;
  message: string;
  olympiad: {
    id: string;
    name: string;
    description: string;
    closeDay: string;
    location: string;
    organizer: {
      id: string;
      organizationName: string;
      email: string;
    };
    classtypes: {
      id: string;
      classYear: string;
      maxScore: number;
      occurringTime: string;
      rooms: string[];
      questions: {
        id: string;
        classTypeId: string;
        questionName: string;
        maxScore: number;
      }[];
      medalists: number;
      participants: string[];
      studentsAnswers: string[];
      olympiadId: string;
      bestMaterials: {
        studentId: string;
        materialImages: string[];
        description: string;
      }[];
      gold: string[];
      silver: string[];
      bronze: string[];
      top10: string[];
    }[];
    participants: number;
    scoreOfAward: number;
    status: string;
    rankingType: string;
    invitation: boolean;
    occurringDay: string;
  };
  medalPreviews: MedalPreview[];
}

export interface UpdateMedalAssignmentsInput {
  classTypeId: string;
  gold: string[];
  silver: string[];
  bronze: string[];
}

export interface FinalizeMedalsResponse {
  success: boolean;
  message: string;
  emailsSent: number;
  olympiad: {
    id: string;
    name: string;
    description: string;
    closeDay: string;
    location: string;
    organizer: {
      id: string;
      organizationName: string;
      email: string;
    };
    classtypes: {
      id: string;
      classYear: string;
      maxScore: number;
      occurringTime: string;
      rooms: string[];
      questions: {
        id: string;
        classTypeId: string;
        questionName: string;
        maxScore: number;
      }[];
      medalists: number;
      participants: string[];
      studentsAnswers: string[];
      olympiadId: string;
      bestMaterials: {
        studentId: string;
        materialImages: string[];
        description: string;
      }[];
      gold: string[];
      silver: string[];
      bronze: string[];
      top10: string[];
    }[];
    participants: number;
    scoreOfAward: number;
    status: string;
    rankingType: string;
    invitation: boolean;
    occurringDay: string;
  };
}

// GraphQL Mutation Variables
export interface FinishOlympiadVariables {
  finishOlympiadId: string;
}

export interface PreviewMedalsVariables {
  previewMedalsId: string;
}

export interface UpdateMedalAssignmentsVariables {
  olympiadId: string;
  assignments: UpdateMedalAssignmentsInput[];
}

export interface FinalizeMedalsVariables {
  finalizeMedalsId: string;
}

// GraphQL Query Variables
export interface GetOlympiadVariables {
  olympiadId: string;
}

// Medal Preview Flow States
export type MedalPreviewFlowState =
  | "CLOSED" // Olympiad is closed, ready to finish
  | "MEDALS_PREVIEW" // Medal preview generated, can edit assignments
  | "FINISHED"; // Medals finalized, emails sent

// Medal Types
export type MedalType = "gold" | "silver" | "bronze" | "top10";

// Class Year Types (matching backend)
export type ClassYear =
  | "E_CLASS"
  | "GRADE_1"
  | "GRADE_2"
  | "GRADE_3"
  | "GRADE_4"
  | "GRADE_5"
  | "GRADE_6"
  | "GRADE_7"
  | "GRADE_8"
  | "GRADE_9"
  | "GRADE_10"
  | "GRADE_11"
  | "GRADE_12";

// Olympiad Status Types (matching backend)
export type OlympiadStatus =
  | "OPEN"
  | "CLOSED"
  | "FINISHED"
  | "CANCELLED"
  | "DRAFT"
  | "UNDER_REVIEW"
  | "MEDALS_PREVIEW";
