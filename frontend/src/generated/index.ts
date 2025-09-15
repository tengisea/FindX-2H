import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  score: Scalars['Int']['output'];
};

export type AnswerInput = {
  score: Scalars['Int']['input'];
};

export type ApproveOlympiadInput = {
  scoreOfAward: Scalars['Int']['input'];
};

export type ClassType = {
  __typename?: 'ClassType';
  classYear: ClassYear;
  id: Scalars['ID']['output'];
  maxScore: Scalars['Int']['output'];
  medalists: Scalars['Int']['output'];
  olympiadId?: Maybe<Scalars['ID']['output']>;
  participants: Array<Scalars['ID']['output']>;
  questions: Array<Question>;
  studentsResults: Array<Scalars['ID']['output']>;
};

export enum ClassYear {
  Grade_1 = 'GRADE_1',
  Grade_2 = 'GRADE_2',
  Grade_3 = 'GRADE_3',
  Grade_4 = 'GRADE_4',
  Grade_5 = 'GRADE_5',
  Grade_6 = 'GRADE_6',
  Grade_7 = 'GRADE_7',
  Grade_8 = 'GRADE_8',
  Grade_9 = 'GRADE_9',
  Grade_10 = 'GRADE_10',
  Grade_11 = 'GRADE_11',
  Grade_12 = 'GRADE_12'
}

export type CreateClassTypeInput = {
  classYear: ClassYear;
  maxScore: Scalars['Int']['input'];
  medalists: Scalars['Int']['input'];
  questions: Array<CreateQuestionInput>;
};

export type CreateOlympiadRequestInput = {
  classtypes: Array<CreateClassTypeInput>;
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizerId: Scalars['ID']['input'];
};

export type CreateOrganizerInput = {
  email: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
};

export type CreateQuestionInput = {
  maxScore: Scalars['Int']['input'];
  questionName: Scalars['String']['input'];
};

export type CreateStudentAnswerInput = {
  answers: Array<AnswerInput>;
  classTypeId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};

export type CreateStudentInput = {
  class: Scalars['String']['input'];
  email: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  school: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addOlympiad: Student;
  approveOlympiad: Olympiad;
  createClassType: ClassType;
  createOrganizer: Organizer;
  createQuestion: Question;
  createStudent: Student;
  createStudentAnswer: StudentAnswer;
  deleteClassType: Scalars['Boolean']['output'];
  deleteOlympiad: Scalars['Boolean']['output'];
  deleteQuestion: Scalars['Boolean']['output'];
  deleteStudent: Scalars['Boolean']['output'];
  deleteStudentAnswer: Scalars['Boolean']['output'];
  requestOlympiad: Olympiad;
  updateClassType: ClassType;
  updateOlympiad: Olympiad;
  updateOrganizer: Organizer;
  updatePiPoints: Student;
  updateQuestion: Question;
  updateStudent: Student;
  updateStudentAnswer: StudentAnswer;
  updateTotalScore: Student;
};


export type MutationAddOlympiadArgs = {
  id: Scalars['ID']['input'];
  olympiadId: Scalars['ID']['input'];
};


export type MutationApproveOlympiadArgs = {
  id: Scalars['ID']['input'];
  input: ApproveOlympiadInput;
};


export type MutationCreateClassTypeArgs = {
  input: CreateClassTypeInput;
};


export type MutationCreateOrganizerArgs = {
  input: CreateOrganizerInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateStudentArgs = {
  input: CreateStudentInput;
};


export type MutationCreateStudentAnswerArgs = {
  input: CreateStudentAnswerInput;
};


export type MutationDeleteClassTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOlympiadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStudentAnswerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRequestOlympiadArgs = {
  input: CreateOlympiadRequestInput;
};


export type MutationUpdateClassTypeArgs = {
  id: Scalars['ID']['input'];
  input: UpdateClassTypeInput;
};


export type MutationUpdateOlympiadArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOlympiadInput;
};


export type MutationUpdateOrganizerArgs = {
  id: Scalars['ID']['input'];
  input: CreateOrganizerInput;
};


export type MutationUpdatePiPointsArgs = {
  id: Scalars['ID']['input'];
  piPoints: Scalars['Int']['input'];
};


export type MutationUpdateQuestionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateQuestionInput;
};


export type MutationUpdateStudentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateStudentInput;
};


export type MutationUpdateStudentAnswerArgs = {
  id: Scalars['ID']['input'];
  input: UpdateStudentAnswerInput;
};


export type MutationUpdateTotalScoreArgs = {
  id: Scalars['ID']['input'];
  totalScore: Scalars['Int']['input'];
};

export type Olympiad = {
  __typename?: 'Olympiad';
  classtypes: Array<ClassType>;
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organizer?: Maybe<Organizer>;
  scoreOfAward?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
};

export type Organizer = {
  __typename?: 'Organizer';
  Olympiads?: Maybe<Array<Olympiad>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organizationName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allClassTypes: Array<ClassType>;
  allOlympiads: Array<Olympiad>;
  allStudentAnswers: Array<StudentAnswer>;
  classType: ClassType;
  classTypesByClassYear: Array<ClassType>;
  classTypesByOlympiad: Array<ClassType>;
  getAllApprovedOlympiads: Array<Olympiad>;
  getAllOrganizers: Array<Organizer>;
  getAllStudent: Array<Student>;
  getOlympiadByClassYear: Array<Olympiad>;
  getOrganizer: Organizer;
  getPendingOlympiads: Array<Olympiad>;
  olympiad: Olympiad;
  participantsByClassType: Array<Scalars['ID']['output']>;
  question: Question;
  questionsByClassType: Array<Question>;
  student?: Maybe<Student>;
  studentAnswer?: Maybe<StudentAnswer>;
  studentAnswersByClassType: Array<StudentAnswer>;
  studentsByClass: Array<Student>;
  studentsByClassType: Array<Student>;
  studentsByLocation: Array<Student>;
  studentsByOlympiad: Array<Student>;
  studentsBySchool: Array<Student>;
  studentsResultsByClassType: Array<Scalars['ID']['output']>;
};


export type QueryClassTypeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClassTypesByClassYearArgs = {
  classYear: ClassYear;
};


export type QueryClassTypesByOlympiadArgs = {
  olympiadId: Scalars['ID']['input'];
};


export type QueryGetOlympiadByClassYearArgs = {
  classYear: ClassYear;
};


export type QueryGetOrganizerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOlympiadArgs = {
  id: Scalars['ID']['input'];
};


export type QueryParticipantsByClassTypeArgs = {
  classTypeId: Scalars['ID']['input'];
};


export type QueryQuestionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryQuestionsByClassTypeArgs = {
  classTypeId: Scalars['ID']['input'];
};


export type QueryStudentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStudentAnswerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStudentAnswersByClassTypeArgs = {
  classTypeId: Scalars['ID']['input'];
};


export type QueryStudentsByClassArgs = {
  class: Scalars['String']['input'];
};


export type QueryStudentsByClassTypeArgs = {
  classTypeId: Scalars['ID']['input'];
};


export type QueryStudentsByLocationArgs = {
  location: Scalars['String']['input'];
};


export type QueryStudentsByOlympiadArgs = {
  olympiadId: Scalars['ID']['input'];
};


export type QueryStudentsBySchoolArgs = {
  school: Scalars['String']['input'];
};


export type QueryStudentsResultsByClassTypeArgs = {
  classTypeId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  classTypeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  maxScore: Scalars['Int']['output'];
  questionName: Scalars['String']['output'];
};

export enum Response {
  NotFound = 'NOT_FOUND',
  Success = 'Success'
}

export type Student = {
  __typename?: 'Student';
  class: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  participatedOlympiads: Array<Scalars['ID']['output']>;
  piPoints: Scalars['Int']['output'];
  profilePicture: Scalars['String']['output'];
  school: Scalars['String']['output'];
  totalScore: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type StudentAnswer = {
  __typename?: 'StudentAnswer';
  answers: Array<Answer>;
  classTypeId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  studentId: Scalars['ID']['output'];
  totalScoreofOlympiad: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UpdateClassTypeInput = {
  classYear: ClassYear;
  maxScore: Scalars['Int']['input'];
  medalists: Scalars['Int']['input'];
};

export type UpdateOlympiadInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateQuestionInput = {
  maxScore: Scalars['Int']['input'];
  questionName: Scalars['String']['input'];
};

export type UpdateStudentAnswerInput = {
  answers?: InputMaybe<Array<AnswerInput>>;
  classTypeId?: InputMaybe<Scalars['ID']['input']>;
  studentId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateStudentInput = {
  class?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
};

export type RequestOlympiadMutationVariables = Exact<{
  input: CreateOlympiadRequestInput;
}>;


export type RequestOlympiadMutation = { __typename?: 'Mutation', requestOlympiad: { __typename?: 'Olympiad', id: string, name: string, description: string, date: string, location: string, scoreOfAward?: number | null, status: string, organizer?: { __typename?: 'Organizer', id: string, organizationName: string, email: string } | null, classtypes: Array<{ __typename?: 'ClassType', id: string, classYear: ClassYear, maxScore: number, medalists: number, participants: Array<string>, studentsResults: Array<string>, olympiadId?: string | null, questions: Array<{ __typename?: 'Question', id: string, classTypeId: string, questionName: string, maxScore: number }> }> } };

export type ApproveOlympiadMutationVariables = Exact<{
  approveOlympiadId: Scalars['ID']['input'];
  input: ApproveOlympiadInput;
}>;


export type ApproveOlympiadMutation = { __typename?: 'Mutation', approveOlympiad: { __typename?: 'Olympiad', id: string, name: string, description: string, date: string, location: string, scoreOfAward?: number | null, status: string, organizer?: { __typename?: 'Organizer', id: string, organizationName: string, email: string } | null, classtypes: Array<{ __typename?: 'ClassType', id: string, classYear: ClassYear, maxScore: number, medalists: number, participants: Array<string>, studentsResults: Array<string>, olympiadId?: string | null, questions: Array<{ __typename?: 'Question', id: string, classTypeId: string, questionName: string, maxScore: number }> }> } };

export type UpdateOlympiadMutationVariables = Exact<{
  updateOlympiadId: Scalars['ID']['input'];
  input: UpdateOlympiadInput;
}>;


export type UpdateOlympiadMutation = { __typename?: 'Mutation', updateOlympiad: { __typename?: 'Olympiad', id: string, name: string, description: string, date: string, location: string, scoreOfAward?: number | null, status: string, organizer?: { __typename?: 'Organizer', id: string, organizationName: string, email: string } | null, classtypes: Array<{ __typename?: 'ClassType', id: string, classYear: ClassYear, maxScore: number, medalists: number, participants: Array<string>, studentsResults: Array<string>, olympiadId?: string | null, questions: Array<{ __typename?: 'Question', id: string, classTypeId: string, questionName: string, maxScore: number }> }> } };

export type DeleteOlympiadMutationVariables = Exact<{
  deleteOlympiadId: Scalars['ID']['input'];
}>;


export type DeleteOlympiadMutation = { __typename?: 'Mutation', deleteOlympiad: boolean };

export type GetAllOlympiadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOlympiadsQuery = { __typename?: 'Query', allOlympiads: Array<{ __typename?: 'Olympiad', id: string, name: string, description: string, date: string, location: string, scoreOfAward?: number | null, status: string, organizer?: { __typename?: 'Organizer', id: string, organizationName: string, email: string } | null, classtypes: Array<{ __typename?: 'ClassType', id: string, classYear: ClassYear, maxScore: number, medalists: number, participants: Array<string>, studentsResults: Array<string>, olympiadId?: string | null, questions: Array<{ __typename?: 'Question', id: string, classTypeId: string, questionName: string, maxScore: number }> }> }> };

export type GetPendingOlympiadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPendingOlympiadsQuery = { __typename?: 'Query', getPendingOlympiads: Array<{ __typename?: 'Olympiad', id: string, name: string, description: string, date: string, location: string, scoreOfAward?: number | null, status: string, organizer?: { __typename?: 'Organizer', id: string, organizationName: string, email: string } | null, classtypes: Array<{ __typename?: 'ClassType', id: string, classYear: ClassYear, maxScore: number, medalists: number, participants: Array<string>, studentsResults: Array<string>, olympiadId?: string | null, questions: Array<{ __typename?: 'Question', id: string, classTypeId: string, questionName: string, maxScore: number }> }> }> };

export type GetApprovedOlympiadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApprovedOlympiadsQuery = { __typename?: 'Query', getAllApprovedOlympiads: Array<{ __typename?: 'Olympiad', id: string, name: string, description: string, date: string, location: string, scoreOfAward?: number | null, status: string, organizer?: { __typename?: 'Organizer', id: string, organizationName: string, email: string } | null, classtypes: Array<{ __typename?: 'ClassType', id: string, classYear: ClassYear, maxScore: number, medalists: number, participants: Array<string>, studentsResults: Array<string>, olympiadId?: string | null, questions: Array<{ __typename?: 'Question', id: string, classTypeId: string, questionName: string, maxScore: number }> }> }> };

export type GetOlympiadByClassYearQueryVariables = Exact<{
  classYear: ClassYear;
}>;


export type GetOlympiadByClassYearQuery = { __typename?: 'Query', getOlympiadByClassYear: Array<{ __typename?: 'Olympiad', id: string, name: string, description: string, date: string, location: string, scoreOfAward?: number | null, status: string, organizer?: { __typename?: 'Organizer', id: string, organizationName: string, email: string } | null, classtypes: Array<{ __typename?: 'ClassType', id: string, classYear: ClassYear, maxScore: number, medalists: number, participants: Array<string>, studentsResults: Array<string>, olympiadId?: string | null, questions: Array<{ __typename?: 'Question', id: string, classTypeId: string, questionName: string, maxScore: number }> }> }> };

export type GetAllOrganizersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrganizersQuery = { __typename?: 'Query', getAllOrganizers: Array<{ __typename?: 'Organizer', id: string, organizationName: string, email: string, Olympiads?: Array<{ __typename?: 'Olympiad', id: string, name: string }> | null }> };

export type GetOrganizerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetOrganizerQuery = { __typename?: 'Query', getOrganizer: { __typename?: 'Organizer', id: string, organizationName: string, email: string, Olympiads?: Array<{ __typename?: 'Olympiad', id: string, name: string }> | null } };


export const RequestOlympiadDocument = gql`
    mutation RequestOlympiad($input: CreateOlympiadRequestInput!) {
  requestOlympiad(input: $input) {
    id
    name
    description
    date
    location
    organizer {
      id
      organizationName
      email
    }
    classtypes {
      id
      classYear
      maxScore
      questions {
        id
        classTypeId
        questionName
        maxScore
      }
      medalists
      participants
      studentsResults
      olympiadId
    }
    scoreOfAward
    status
  }
}
    `;
export type RequestOlympiadMutationFn = Apollo.MutationFunction<RequestOlympiadMutation, RequestOlympiadMutationVariables>;

/**
 * __useRequestOlympiadMutation__
 *
 * To run a mutation, you first call `useRequestOlympiadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestOlympiadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestOlympiadMutation, { data, loading, error }] = useRequestOlympiadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestOlympiadMutation(baseOptions?: Apollo.MutationHookOptions<RequestOlympiadMutation, RequestOlympiadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestOlympiadMutation, RequestOlympiadMutationVariables>(RequestOlympiadDocument, options);
      }
export type RequestOlympiadMutationHookResult = ReturnType<typeof useRequestOlympiadMutation>;
export type RequestOlympiadMutationResult = Apollo.MutationResult<RequestOlympiadMutation>;
export type RequestOlympiadMutationOptions = Apollo.BaseMutationOptions<RequestOlympiadMutation, RequestOlympiadMutationVariables>;
export const ApproveOlympiadDocument = gql`
    mutation ApproveOlympiad($approveOlympiadId: ID!, $input: ApproveOlympiadInput!) {
  approveOlympiad(id: $approveOlympiadId, input: $input) {
    id
    name
    description
    date
    location
    organizer {
      id
      organizationName
      email
    }
    classtypes {
      id
      classYear
      maxScore
      questions {
        id
        classTypeId
        questionName
        maxScore
      }
      medalists
      participants
      studentsResults
      olympiadId
    }
    scoreOfAward
    status
  }
}
    `;
export type ApproveOlympiadMutationFn = Apollo.MutationFunction<ApproveOlympiadMutation, ApproveOlympiadMutationVariables>;

/**
 * __useApproveOlympiadMutation__
 *
 * To run a mutation, you first call `useApproveOlympiadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveOlympiadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveOlympiadMutation, { data, loading, error }] = useApproveOlympiadMutation({
 *   variables: {
 *      approveOlympiadId: // value for 'approveOlympiadId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApproveOlympiadMutation(baseOptions?: Apollo.MutationHookOptions<ApproveOlympiadMutation, ApproveOlympiadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveOlympiadMutation, ApproveOlympiadMutationVariables>(ApproveOlympiadDocument, options);
      }
export type ApproveOlympiadMutationHookResult = ReturnType<typeof useApproveOlympiadMutation>;
export type ApproveOlympiadMutationResult = Apollo.MutationResult<ApproveOlympiadMutation>;
export type ApproveOlympiadMutationOptions = Apollo.BaseMutationOptions<ApproveOlympiadMutation, ApproveOlympiadMutationVariables>;
export const UpdateOlympiadDocument = gql`
    mutation UpdateOlympiad($updateOlympiadId: ID!, $input: UpdateOlympiadInput!) {
  updateOlympiad(id: $updateOlympiadId, input: $input) {
    id
    name
    description
    date
    location
    organizer {
      id
      organizationName
      email
    }
    classtypes {
      id
      classYear
      maxScore
      questions {
        id
        classTypeId
        questionName
        maxScore
      }
      medalists
      participants
      studentsResults
      olympiadId
    }
    scoreOfAward
    status
  }
}
    `;
export type UpdateOlympiadMutationFn = Apollo.MutationFunction<UpdateOlympiadMutation, UpdateOlympiadMutationVariables>;

/**
 * __useUpdateOlympiadMutation__
 *
 * To run a mutation, you first call `useUpdateOlympiadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOlympiadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOlympiadMutation, { data, loading, error }] = useUpdateOlympiadMutation({
 *   variables: {
 *      updateOlympiadId: // value for 'updateOlympiadId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOlympiadMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOlympiadMutation, UpdateOlympiadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOlympiadMutation, UpdateOlympiadMutationVariables>(UpdateOlympiadDocument, options);
      }
export type UpdateOlympiadMutationHookResult = ReturnType<typeof useUpdateOlympiadMutation>;
export type UpdateOlympiadMutationResult = Apollo.MutationResult<UpdateOlympiadMutation>;
export type UpdateOlympiadMutationOptions = Apollo.BaseMutationOptions<UpdateOlympiadMutation, UpdateOlympiadMutationVariables>;
export const DeleteOlympiadDocument = gql`
    mutation DeleteOlympiad($deleteOlympiadId: ID!) {
  deleteOlympiad(id: $deleteOlympiadId)
}
    `;
export type DeleteOlympiadMutationFn = Apollo.MutationFunction<DeleteOlympiadMutation, DeleteOlympiadMutationVariables>;

/**
 * __useDeleteOlympiadMutation__
 *
 * To run a mutation, you first call `useDeleteOlympiadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOlympiadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOlympiadMutation, { data, loading, error }] = useDeleteOlympiadMutation({
 *   variables: {
 *      deleteOlympiadId: // value for 'deleteOlympiadId'
 *   },
 * });
 */
export function useDeleteOlympiadMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOlympiadMutation, DeleteOlympiadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOlympiadMutation, DeleteOlympiadMutationVariables>(DeleteOlympiadDocument, options);
      }
export type DeleteOlympiadMutationHookResult = ReturnType<typeof useDeleteOlympiadMutation>;
export type DeleteOlympiadMutationResult = Apollo.MutationResult<DeleteOlympiadMutation>;
export type DeleteOlympiadMutationOptions = Apollo.BaseMutationOptions<DeleteOlympiadMutation, DeleteOlympiadMutationVariables>;
export const GetAllOlympiadsDocument = gql`
    query GetAllOlympiads {
  allOlympiads {
    id
    name
    description
    date
    location
    organizer {
      id
      organizationName
      email
    }
    classtypes {
      id
      classYear
      maxScore
      questions {
        id
        classTypeId
        questionName
        maxScore
      }
      medalists
      participants
      studentsResults
      olympiadId
    }
    scoreOfAward
    status
  }
}
    `;

/**
 * __useGetAllOlympiadsQuery__
 *
 * To run a query within a React component, call `useGetAllOlympiadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOlympiadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOlympiadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOlympiadsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOlympiadsQuery, GetAllOlympiadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOlympiadsQuery, GetAllOlympiadsQueryVariables>(GetAllOlympiadsDocument, options);
      }
export function useGetAllOlympiadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOlympiadsQuery, GetAllOlympiadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOlympiadsQuery, GetAllOlympiadsQueryVariables>(GetAllOlympiadsDocument, options);
        }
export function useGetAllOlympiadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllOlympiadsQuery, GetAllOlympiadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOlympiadsQuery, GetAllOlympiadsQueryVariables>(GetAllOlympiadsDocument, options);
        }
export type GetAllOlympiadsQueryHookResult = ReturnType<typeof useGetAllOlympiadsQuery>;
export type GetAllOlympiadsLazyQueryHookResult = ReturnType<typeof useGetAllOlympiadsLazyQuery>;
export type GetAllOlympiadsSuspenseQueryHookResult = ReturnType<typeof useGetAllOlympiadsSuspenseQuery>;
export type GetAllOlympiadsQueryResult = Apollo.QueryResult<GetAllOlympiadsQuery, GetAllOlympiadsQueryVariables>;
export const GetPendingOlympiadsDocument = gql`
    query GetPendingOlympiads {
  getPendingOlympiads {
    id
    name
    description
    date
    location
    organizer {
      id
      organizationName
      email
    }
    classtypes {
      id
      classYear
      maxScore
      questions {
        id
        classTypeId
        questionName
        maxScore
      }
      medalists
      participants
      studentsResults
      olympiadId
    }
    scoreOfAward
    status
  }
}
    `;

/**
 * __useGetPendingOlympiadsQuery__
 *
 * To run a query within a React component, call `useGetPendingOlympiadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingOlympiadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingOlympiadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPendingOlympiadsQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingOlympiadsQuery, GetPendingOlympiadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingOlympiadsQuery, GetPendingOlympiadsQueryVariables>(GetPendingOlympiadsDocument, options);
      }
export function useGetPendingOlympiadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingOlympiadsQuery, GetPendingOlympiadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingOlympiadsQuery, GetPendingOlympiadsQueryVariables>(GetPendingOlympiadsDocument, options);
        }
export function useGetPendingOlympiadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPendingOlympiadsQuery, GetPendingOlympiadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPendingOlympiadsQuery, GetPendingOlympiadsQueryVariables>(GetPendingOlympiadsDocument, options);
        }
export type GetPendingOlympiadsQueryHookResult = ReturnType<typeof useGetPendingOlympiadsQuery>;
export type GetPendingOlympiadsLazyQueryHookResult = ReturnType<typeof useGetPendingOlympiadsLazyQuery>;
export type GetPendingOlympiadsSuspenseQueryHookResult = ReturnType<typeof useGetPendingOlympiadsSuspenseQuery>;
export type GetPendingOlympiadsQueryResult = Apollo.QueryResult<GetPendingOlympiadsQuery, GetPendingOlympiadsQueryVariables>;
export const GetApprovedOlympiadsDocument = gql`
    query GetApprovedOlympiads {
  getAllApprovedOlympiads {
    id
    name
    description
    date
    location
    organizer {
      id
      organizationName
      email
    }
    classtypes {
      id
      classYear
      maxScore
      questions {
        id
        classTypeId
        questionName
        maxScore
      }
      medalists
      participants
      studentsResults
      olympiadId
    }
    scoreOfAward
    status
  }
}
    `;

/**
 * __useGetApprovedOlympiadsQuery__
 *
 * To run a query within a React component, call `useGetApprovedOlympiadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApprovedOlympiadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApprovedOlympiadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetApprovedOlympiadsQuery(baseOptions?: Apollo.QueryHookOptions<GetApprovedOlympiadsQuery, GetApprovedOlympiadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApprovedOlympiadsQuery, GetApprovedOlympiadsQueryVariables>(GetApprovedOlympiadsDocument, options);
      }
export function useGetApprovedOlympiadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApprovedOlympiadsQuery, GetApprovedOlympiadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApprovedOlympiadsQuery, GetApprovedOlympiadsQueryVariables>(GetApprovedOlympiadsDocument, options);
        }
export function useGetApprovedOlympiadsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetApprovedOlympiadsQuery, GetApprovedOlympiadsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetApprovedOlympiadsQuery, GetApprovedOlympiadsQueryVariables>(GetApprovedOlympiadsDocument, options);
        }
export type GetApprovedOlympiadsQueryHookResult = ReturnType<typeof useGetApprovedOlympiadsQuery>;
export type GetApprovedOlympiadsLazyQueryHookResult = ReturnType<typeof useGetApprovedOlympiadsLazyQuery>;
export type GetApprovedOlympiadsSuspenseQueryHookResult = ReturnType<typeof useGetApprovedOlympiadsSuspenseQuery>;
export type GetApprovedOlympiadsQueryResult = Apollo.QueryResult<GetApprovedOlympiadsQuery, GetApprovedOlympiadsQueryVariables>;
export const GetOlympiadByClassYearDocument = gql`
    query GetOlympiadByClassYear($classYear: ClassYear!) {
  getOlympiadByClassYear(classYear: $classYear) {
    id
    name
    description
    date
    location
    organizer {
      id
      organizationName
      email
    }
    classtypes {
      id
      classYear
      maxScore
      questions {
        id
        classTypeId
        questionName
        maxScore
      }
      medalists
      participants
      studentsResults
      olympiadId
    }
    scoreOfAward
    status
  }
}
    `;

/**
 * __useGetOlympiadByClassYearQuery__
 *
 * To run a query within a React component, call `useGetOlympiadByClassYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOlympiadByClassYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOlympiadByClassYearQuery({
 *   variables: {
 *      classYear: // value for 'classYear'
 *   },
 * });
 */
export function useGetOlympiadByClassYearQuery(baseOptions: Apollo.QueryHookOptions<GetOlympiadByClassYearQuery, GetOlympiadByClassYearQueryVariables> & ({ variables: GetOlympiadByClassYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOlympiadByClassYearQuery, GetOlympiadByClassYearQueryVariables>(GetOlympiadByClassYearDocument, options);
      }
export function useGetOlympiadByClassYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOlympiadByClassYearQuery, GetOlympiadByClassYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOlympiadByClassYearQuery, GetOlympiadByClassYearQueryVariables>(GetOlympiadByClassYearDocument, options);
        }
export function useGetOlympiadByClassYearSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOlympiadByClassYearQuery, GetOlympiadByClassYearQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOlympiadByClassYearQuery, GetOlympiadByClassYearQueryVariables>(GetOlympiadByClassYearDocument, options);
        }
export type GetOlympiadByClassYearQueryHookResult = ReturnType<typeof useGetOlympiadByClassYearQuery>;
export type GetOlympiadByClassYearLazyQueryHookResult = ReturnType<typeof useGetOlympiadByClassYearLazyQuery>;
export type GetOlympiadByClassYearSuspenseQueryHookResult = ReturnType<typeof useGetOlympiadByClassYearSuspenseQuery>;
export type GetOlympiadByClassYearQueryResult = Apollo.QueryResult<GetOlympiadByClassYearQuery, GetOlympiadByClassYearQueryVariables>;
export const GetAllOrganizersDocument = gql`
    query GetAllOrganizers {
  getAllOrganizers {
    id
    organizationName
    email
    Olympiads {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllOrganizersQuery__
 *
 * To run a query within a React component, call `useGetAllOrganizersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrganizersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrganizersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllOrganizersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrganizersQuery, GetAllOrganizersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrganizersQuery, GetAllOrganizersQueryVariables>(GetAllOrganizersDocument, options);
      }
export function useGetAllOrganizersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrganizersQuery, GetAllOrganizersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrganizersQuery, GetAllOrganizersQueryVariables>(GetAllOrganizersDocument, options);
        }
export function useGetAllOrganizersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllOrganizersQuery, GetAllOrganizersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrganizersQuery, GetAllOrganizersQueryVariables>(GetAllOrganizersDocument, options);
        }
export type GetAllOrganizersQueryHookResult = ReturnType<typeof useGetAllOrganizersQuery>;
export type GetAllOrganizersLazyQueryHookResult = ReturnType<typeof useGetAllOrganizersLazyQuery>;
export type GetAllOrganizersSuspenseQueryHookResult = ReturnType<typeof useGetAllOrganizersSuspenseQuery>;
export type GetAllOrganizersQueryResult = Apollo.QueryResult<GetAllOrganizersQuery, GetAllOrganizersQueryVariables>;
export const GetOrganizerDocument = gql`
    query GetOrganizer($id: ID!) {
  getOrganizer(id: $id) {
    id
    organizationName
    email
    Olympiads {
      id
      name
    }
  }
}
    `;

/**
 * __useGetOrganizerQuery__
 *
 * To run a query within a React component, call `useGetOrganizerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizerQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizerQuery, GetOrganizerQueryVariables> & ({ variables: GetOrganizerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizerQuery, GetOrganizerQueryVariables>(GetOrganizerDocument, options);
      }
export function useGetOrganizerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizerQuery, GetOrganizerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizerQuery, GetOrganizerQueryVariables>(GetOrganizerDocument, options);
        }
export function useGetOrganizerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOrganizerQuery, GetOrganizerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganizerQuery, GetOrganizerQueryVariables>(GetOrganizerDocument, options);
        }
export type GetOrganizerQueryHookResult = ReturnType<typeof useGetOrganizerQuery>;
export type GetOrganizerLazyQueryHookResult = ReturnType<typeof useGetOrganizerLazyQuery>;
export type GetOrganizerSuspenseQueryHookResult = ReturnType<typeof useGetOrganizerSuspenseQuery>;
export type GetOrganizerQueryResult = Apollo.QueryResult<GetOrganizerQuery, GetOrganizerQueryVariables>;