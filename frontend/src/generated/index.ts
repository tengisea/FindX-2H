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

export type Challenge = {
  __typename?: 'Challenge';
  challenger: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  difficulty: Difficulty;
  id: Scalars['ID']['output'];
  opponent: Scalars['ID']['output'];
  participants: Array<Scalars['ID']['output']>;
  piPoints: Scalars['Int']['output'];
  status: Status;
  topic: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  winner?: Maybe<Scalars['ID']['output']>;
};

export type ChallengeInput = {
  challenger: Scalars['ID']['input'];
  difficulty: Difficulty;
  opponent: Scalars['ID']['input'];
  topic: Scalars['String']['input'];
};

export type ChallengeRoom = {
  __typename?: 'ChallengeRoom';
  challengeId: Scalars['ID']['output'];
  challengerId: Scalars['ID']['output'];
  challengerScore: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  opponentId: Scalars['ID']['output'];
  opponentScore: Scalars['Int']['output'];
  status: Status;
  updatedAt: Scalars['DateTime']['output'];
  winnerId?: Maybe<Scalars['ID']['output']>;
};

export type ChallengeRoomInput = {
  challengeId: Scalars['ID']['input'];
  challengerId: Scalars['ID']['input'];
  opponentId: Scalars['ID']['input'];
};

export type ChallengeRoomResponse = {
  __typename?: 'ChallengeRoomResponse';
  challengeRoomId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isCorrect: Scalars['Boolean']['output'];
  points: Scalars['Int']['output'];
  studentId: Scalars['ID']['output'];
  submittedAnswer: Scalars['String']['output'];
  submittedAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChallengeRoomResponseInput = {
  challengeRoomId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
  submittedAnswer: Scalars['String']['input'];
};

export enum Difficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type Mutation = {
  __typename?: 'Mutation';
  createChallenge: Scalars['ID']['output'];
  createChallengeRoom: ChallengeRoom;
  createChallengeRoomResponse: ChallengeRoomResponse;
  updateChallengeRoom: ChallengeRoom;
};


export type MutationCreateChallengeArgs = {
  input: ChallengeInput;
};


export type MutationCreateChallengeRoomArgs = {
  input: ChallengeRoomInput;
};


export type MutationCreateChallengeRoomResponseArgs = {
  input: ChallengeRoomResponseInput;
};


export type MutationUpdateChallengeRoomArgs = {
  input: UpdateChallengeRoomInput;
};

export type Query = {
  __typename?: 'Query';
  getChallenge?: Maybe<Challenge>;
  getChallengeRoom: ChallengeRoom;
  getChallengeRoomResponse?: Maybe<ChallengeRoomResponse>;
  listChallengeRoomResponses: Array<ChallengeRoomResponse>;
  listChallengeRoomsByStudent: Array<ChallengeRoom>;
  listChallenges: Array<Challenge>;
  listStudentChallengeResponses: Array<ChallengeRoomResponse>;
};


export type QueryGetChallengeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetChallengeRoomArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetChallengeRoomResponseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListChallengeRoomResponsesArgs = {
  roomId: Scalars['ID']['input'];
};


export type QueryListChallengeRoomsByStudentArgs = {
  studentId: Scalars['ID']['input'];
};


export type QueryListChallengesArgs = {
  studentId: Scalars['ID']['input'];
};


export type QueryListStudentChallengeResponsesArgs = {
  studentId: Scalars['ID']['input'];
};

export enum Response {
  NotFound = 'NOT_FOUND',
  Success = 'Success'
}

export enum Status {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Finished = 'FINISHED',
  Pending = 'PENDING',
  Waiting = 'WAITING'
}

export type UpdateChallengeRoomInput = {
  challengerScore?: InputMaybe<Scalars['Int']['input']>;
  opponentScore?: InputMaybe<Scalars['Int']['input']>;
  roomId: Scalars['ID']['input'];
  status?: InputMaybe<Status>;
  winnerId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateChallengeMutationVariables = Exact<{
  input: ChallengeInput;
}>;


export type CreateChallengeMutation = { __typename?: 'Mutation', createChallenge: string };

export type CreateChallengeRoomMutationVariables = Exact<{
  input: ChallengeRoomInput;
}>;


export type CreateChallengeRoomMutation = { __typename?: 'Mutation', createChallengeRoom: { __typename?: 'ChallengeRoom', id: string, challengeId: string, challengerId: string, opponentId: string, status: Status, winnerId?: string | null, challengerScore: number, opponentScore: number, createdAt: any, updatedAt: any } };

export type UpdateChallengeRoomMutationVariables = Exact<{
  input: UpdateChallengeRoomInput;
}>;


export type UpdateChallengeRoomMutation = { __typename?: 'Mutation', updateChallengeRoom: { __typename?: 'ChallengeRoom', id: string, challengeId: string, challengerId: string, opponentId: string, status: Status, winnerId?: string | null, challengerScore: number, opponentScore: number, createdAt: any, updatedAt: any } };

export type CreateChallengeRoomResponseMutationVariables = Exact<{
  input: ChallengeRoomResponseInput;
}>;


export type CreateChallengeRoomResponseMutation = { __typename?: 'Mutation', createChallengeRoomResponse: { __typename?: 'ChallengeRoomResponse', id: string, challengeRoomId: string, studentId: string, submittedAnswer: string, isCorrect: boolean, points: number, submittedAt: any, createdAt: any, updatedAt: any } };

export type GetChallengeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetChallengeQuery = { __typename?: 'Query', getChallenge?: { __typename?: 'Challenge', id: string, topic: string, difficulty: Difficulty, challenger: string, opponent: string, participants: Array<string>, winner?: string | null, piPoints: number, status: Status, createdAt: any, updatedAt: any } | null };

export type ListChallengesQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type ListChallengesQuery = { __typename?: 'Query', listChallenges: Array<{ __typename?: 'Challenge', id: string, topic: string, difficulty: Difficulty, challenger: string, opponent: string, participants: Array<string>, winner?: string | null, piPoints: number, status: Status, createdAt: any, updatedAt: any }> };

export type GetChallengeRoomQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetChallengeRoomQuery = { __typename?: 'Query', getChallengeRoom: { __typename?: 'ChallengeRoom', id: string, challengeId: string, challengerId: string, opponentId: string, status: Status, winnerId?: string | null, challengerScore: number, opponentScore: number, createdAt: any, updatedAt: any } };

export type ListChallengeRoomsByStudentQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type ListChallengeRoomsByStudentQuery = { __typename?: 'Query', listChallengeRoomsByStudent: Array<{ __typename?: 'ChallengeRoom', id: string, challengeId: string, challengerId: string, opponentId: string, status: Status, winnerId?: string | null, challengerScore: number, opponentScore: number, createdAt: any, updatedAt: any }> };

export type GetChallengeRoomResponseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetChallengeRoomResponseQuery = { __typename?: 'Query', getChallengeRoomResponse?: { __typename?: 'ChallengeRoomResponse', id: string, challengeRoomId: string, studentId: string, submittedAnswer: string, isCorrect: boolean, points: number, submittedAt: any, createdAt: any, updatedAt: any } | null };

export type ListChallengeRoomResponsesQueryVariables = Exact<{
  roomId: Scalars['ID']['input'];
}>;


export type ListChallengeRoomResponsesQuery = { __typename?: 'Query', listChallengeRoomResponses: Array<{ __typename?: 'ChallengeRoomResponse', id: string, challengeRoomId: string, studentId: string, submittedAnswer: string, isCorrect: boolean, points: number, submittedAt: any, createdAt: any, updatedAt: any }> };

export type ListStudentChallengeResponsesQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type ListStudentChallengeResponsesQuery = { __typename?: 'Query', listStudentChallengeResponses: Array<{ __typename?: 'ChallengeRoomResponse', id: string, challengeRoomId: string, studentId: string, submittedAnswer: string, isCorrect: boolean, points: number, submittedAt: any, createdAt: any, updatedAt: any }> };


export const CreateChallengeDocument = gql`
    mutation CreateChallenge($input: ChallengeInput!) {
  createChallenge(input: $input)
}
    `;
export type CreateChallengeMutationFn = Apollo.MutationFunction<CreateChallengeMutation, CreateChallengeMutationVariables>;

/**
 * __useCreateChallengeMutation__
 *
 * To run a mutation, you first call `useCreateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeMutation, { data, loading, error }] = useCreateChallengeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChallengeMutation(baseOptions?: Apollo.MutationHookOptions<CreateChallengeMutation, CreateChallengeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChallengeMutation, CreateChallengeMutationVariables>(CreateChallengeDocument, options);
      }
export type CreateChallengeMutationHookResult = ReturnType<typeof useCreateChallengeMutation>;
export type CreateChallengeMutationResult = Apollo.MutationResult<CreateChallengeMutation>;
export type CreateChallengeMutationOptions = Apollo.BaseMutationOptions<CreateChallengeMutation, CreateChallengeMutationVariables>;
export const CreateChallengeRoomDocument = gql`
    mutation CreateChallengeRoom($input: ChallengeRoomInput!) {
  createChallengeRoom(input: $input) {
    id
    challengeId
    challengerId
    opponentId
    status
    winnerId
    challengerScore
    opponentScore
    createdAt
    updatedAt
  }
}
    `;
export type CreateChallengeRoomMutationFn = Apollo.MutationFunction<CreateChallengeRoomMutation, CreateChallengeRoomMutationVariables>;

/**
 * __useCreateChallengeRoomMutation__
 *
 * To run a mutation, you first call `useCreateChallengeRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeRoomMutation, { data, loading, error }] = useCreateChallengeRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChallengeRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateChallengeRoomMutation, CreateChallengeRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChallengeRoomMutation, CreateChallengeRoomMutationVariables>(CreateChallengeRoomDocument, options);
      }
export type CreateChallengeRoomMutationHookResult = ReturnType<typeof useCreateChallengeRoomMutation>;
export type CreateChallengeRoomMutationResult = Apollo.MutationResult<CreateChallengeRoomMutation>;
export type CreateChallengeRoomMutationOptions = Apollo.BaseMutationOptions<CreateChallengeRoomMutation, CreateChallengeRoomMutationVariables>;
export const UpdateChallengeRoomDocument = gql`
    mutation UpdateChallengeRoom($input: UpdateChallengeRoomInput!) {
  updateChallengeRoom(input: $input) {
    id
    challengeId
    challengerId
    opponentId
    status
    winnerId
    challengerScore
    opponentScore
    createdAt
    updatedAt
  }
}
    `;
export type UpdateChallengeRoomMutationFn = Apollo.MutationFunction<UpdateChallengeRoomMutation, UpdateChallengeRoomMutationVariables>;

/**
 * __useUpdateChallengeRoomMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeRoomMutation, { data, loading, error }] = useUpdateChallengeRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChallengeRoomMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChallengeRoomMutation, UpdateChallengeRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChallengeRoomMutation, UpdateChallengeRoomMutationVariables>(UpdateChallengeRoomDocument, options);
      }
export type UpdateChallengeRoomMutationHookResult = ReturnType<typeof useUpdateChallengeRoomMutation>;
export type UpdateChallengeRoomMutationResult = Apollo.MutationResult<UpdateChallengeRoomMutation>;
export type UpdateChallengeRoomMutationOptions = Apollo.BaseMutationOptions<UpdateChallengeRoomMutation, UpdateChallengeRoomMutationVariables>;
export const CreateChallengeRoomResponseDocument = gql`
    mutation CreateChallengeRoomResponse($input: ChallengeRoomResponseInput!) {
  createChallengeRoomResponse(input: $input) {
    id
    challengeRoomId
    studentId
    submittedAnswer
    isCorrect
    points
    submittedAt
    createdAt
    updatedAt
  }
}
    `;
export type CreateChallengeRoomResponseMutationFn = Apollo.MutationFunction<CreateChallengeRoomResponseMutation, CreateChallengeRoomResponseMutationVariables>;

/**
 * __useCreateChallengeRoomResponseMutation__
 *
 * To run a mutation, you first call `useCreateChallengeRoomResponseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeRoomResponseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeRoomResponseMutation, { data, loading, error }] = useCreateChallengeRoomResponseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChallengeRoomResponseMutation(baseOptions?: Apollo.MutationHookOptions<CreateChallengeRoomResponseMutation, CreateChallengeRoomResponseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChallengeRoomResponseMutation, CreateChallengeRoomResponseMutationVariables>(CreateChallengeRoomResponseDocument, options);
      }
export type CreateChallengeRoomResponseMutationHookResult = ReturnType<typeof useCreateChallengeRoomResponseMutation>;
export type CreateChallengeRoomResponseMutationResult = Apollo.MutationResult<CreateChallengeRoomResponseMutation>;
export type CreateChallengeRoomResponseMutationOptions = Apollo.BaseMutationOptions<CreateChallengeRoomResponseMutation, CreateChallengeRoomResponseMutationVariables>;
export const GetChallengeDocument = gql`
    query GetChallenge($id: ID!) {
  getChallenge(id: $id) {
    id
    topic
    difficulty
    challenger
    opponent
    participants
    winner
    piPoints
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetChallengeQuery__
 *
 * To run a query within a React component, call `useGetChallengeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChallengeQuery(baseOptions: Apollo.QueryHookOptions<GetChallengeQuery, GetChallengeQueryVariables> & ({ variables: GetChallengeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChallengeQuery, GetChallengeQueryVariables>(GetChallengeDocument, options);
      }
export function useGetChallengeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChallengeQuery, GetChallengeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChallengeQuery, GetChallengeQueryVariables>(GetChallengeDocument, options);
        }
export function useGetChallengeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChallengeQuery, GetChallengeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChallengeQuery, GetChallengeQueryVariables>(GetChallengeDocument, options);
        }
export type GetChallengeQueryHookResult = ReturnType<typeof useGetChallengeQuery>;
export type GetChallengeLazyQueryHookResult = ReturnType<typeof useGetChallengeLazyQuery>;
export type GetChallengeSuspenseQueryHookResult = ReturnType<typeof useGetChallengeSuspenseQuery>;
export type GetChallengeQueryResult = Apollo.QueryResult<GetChallengeQuery, GetChallengeQueryVariables>;
export const ListChallengesDocument = gql`
    query ListChallenges($studentId: ID!) {
  listChallenges(studentId: $studentId) {
    id
    topic
    difficulty
    challenger
    opponent
    participants
    winner
    piPoints
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useListChallengesQuery__
 *
 * To run a query within a React component, call `useListChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListChallengesQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useListChallengesQuery(baseOptions: Apollo.QueryHookOptions<ListChallengesQuery, ListChallengesQueryVariables> & ({ variables: ListChallengesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListChallengesQuery, ListChallengesQueryVariables>(ListChallengesDocument, options);
      }
export function useListChallengesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListChallengesQuery, ListChallengesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListChallengesQuery, ListChallengesQueryVariables>(ListChallengesDocument, options);
        }
export function useListChallengesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListChallengesQuery, ListChallengesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListChallengesQuery, ListChallengesQueryVariables>(ListChallengesDocument, options);
        }
export type ListChallengesQueryHookResult = ReturnType<typeof useListChallengesQuery>;
export type ListChallengesLazyQueryHookResult = ReturnType<typeof useListChallengesLazyQuery>;
export type ListChallengesSuspenseQueryHookResult = ReturnType<typeof useListChallengesSuspenseQuery>;
export type ListChallengesQueryResult = Apollo.QueryResult<ListChallengesQuery, ListChallengesQueryVariables>;
export const GetChallengeRoomDocument = gql`
    query GetChallengeRoom($id: ID!) {
  getChallengeRoom(id: $id) {
    id
    challengeId
    challengerId
    opponentId
    status
    winnerId
    challengerScore
    opponentScore
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetChallengeRoomQuery__
 *
 * To run a query within a React component, call `useGetChallengeRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengeRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengeRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChallengeRoomQuery(baseOptions: Apollo.QueryHookOptions<GetChallengeRoomQuery, GetChallengeRoomQueryVariables> & ({ variables: GetChallengeRoomQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChallengeRoomQuery, GetChallengeRoomQueryVariables>(GetChallengeRoomDocument, options);
      }
export function useGetChallengeRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChallengeRoomQuery, GetChallengeRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChallengeRoomQuery, GetChallengeRoomQueryVariables>(GetChallengeRoomDocument, options);
        }
export function useGetChallengeRoomSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChallengeRoomQuery, GetChallengeRoomQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChallengeRoomQuery, GetChallengeRoomQueryVariables>(GetChallengeRoomDocument, options);
        }
export type GetChallengeRoomQueryHookResult = ReturnType<typeof useGetChallengeRoomQuery>;
export type GetChallengeRoomLazyQueryHookResult = ReturnType<typeof useGetChallengeRoomLazyQuery>;
export type GetChallengeRoomSuspenseQueryHookResult = ReturnType<typeof useGetChallengeRoomSuspenseQuery>;
export type GetChallengeRoomQueryResult = Apollo.QueryResult<GetChallengeRoomQuery, GetChallengeRoomQueryVariables>;
export const ListChallengeRoomsByStudentDocument = gql`
    query ListChallengeRoomsByStudent($studentId: ID!) {
  listChallengeRoomsByStudent(studentId: $studentId) {
    id
    challengeId
    challengerId
    opponentId
    status
    winnerId
    challengerScore
    opponentScore
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useListChallengeRoomsByStudentQuery__
 *
 * To run a query within a React component, call `useListChallengeRoomsByStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useListChallengeRoomsByStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListChallengeRoomsByStudentQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useListChallengeRoomsByStudentQuery(baseOptions: Apollo.QueryHookOptions<ListChallengeRoomsByStudentQuery, ListChallengeRoomsByStudentQueryVariables> & ({ variables: ListChallengeRoomsByStudentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListChallengeRoomsByStudentQuery, ListChallengeRoomsByStudentQueryVariables>(ListChallengeRoomsByStudentDocument, options);
      }
export function useListChallengeRoomsByStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListChallengeRoomsByStudentQuery, ListChallengeRoomsByStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListChallengeRoomsByStudentQuery, ListChallengeRoomsByStudentQueryVariables>(ListChallengeRoomsByStudentDocument, options);
        }
export function useListChallengeRoomsByStudentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListChallengeRoomsByStudentQuery, ListChallengeRoomsByStudentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListChallengeRoomsByStudentQuery, ListChallengeRoomsByStudentQueryVariables>(ListChallengeRoomsByStudentDocument, options);
        }
export type ListChallengeRoomsByStudentQueryHookResult = ReturnType<typeof useListChallengeRoomsByStudentQuery>;
export type ListChallengeRoomsByStudentLazyQueryHookResult = ReturnType<typeof useListChallengeRoomsByStudentLazyQuery>;
export type ListChallengeRoomsByStudentSuspenseQueryHookResult = ReturnType<typeof useListChallengeRoomsByStudentSuspenseQuery>;
export type ListChallengeRoomsByStudentQueryResult = Apollo.QueryResult<ListChallengeRoomsByStudentQuery, ListChallengeRoomsByStudentQueryVariables>;
export const GetChallengeRoomResponseDocument = gql`
    query GetChallengeRoomResponse($id: ID!) {
  getChallengeRoomResponse(id: $id) {
    id
    challengeRoomId
    studentId
    submittedAnswer
    isCorrect
    points
    submittedAt
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetChallengeRoomResponseQuery__
 *
 * To run a query within a React component, call `useGetChallengeRoomResponseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengeRoomResponseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengeRoomResponseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetChallengeRoomResponseQuery(baseOptions: Apollo.QueryHookOptions<GetChallengeRoomResponseQuery, GetChallengeRoomResponseQueryVariables> & ({ variables: GetChallengeRoomResponseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChallengeRoomResponseQuery, GetChallengeRoomResponseQueryVariables>(GetChallengeRoomResponseDocument, options);
      }
export function useGetChallengeRoomResponseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChallengeRoomResponseQuery, GetChallengeRoomResponseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChallengeRoomResponseQuery, GetChallengeRoomResponseQueryVariables>(GetChallengeRoomResponseDocument, options);
        }
export function useGetChallengeRoomResponseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChallengeRoomResponseQuery, GetChallengeRoomResponseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChallengeRoomResponseQuery, GetChallengeRoomResponseQueryVariables>(GetChallengeRoomResponseDocument, options);
        }
export type GetChallengeRoomResponseQueryHookResult = ReturnType<typeof useGetChallengeRoomResponseQuery>;
export type GetChallengeRoomResponseLazyQueryHookResult = ReturnType<typeof useGetChallengeRoomResponseLazyQuery>;
export type GetChallengeRoomResponseSuspenseQueryHookResult = ReturnType<typeof useGetChallengeRoomResponseSuspenseQuery>;
export type GetChallengeRoomResponseQueryResult = Apollo.QueryResult<GetChallengeRoomResponseQuery, GetChallengeRoomResponseQueryVariables>;
export const ListChallengeRoomResponsesDocument = gql`
    query ListChallengeRoomResponses($roomId: ID!) {
  listChallengeRoomResponses(roomId: $roomId) {
    id
    challengeRoomId
    studentId
    submittedAnswer
    isCorrect
    points
    submittedAt
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useListChallengeRoomResponsesQuery__
 *
 * To run a query within a React component, call `useListChallengeRoomResponsesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListChallengeRoomResponsesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListChallengeRoomResponsesQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useListChallengeRoomResponsesQuery(baseOptions: Apollo.QueryHookOptions<ListChallengeRoomResponsesQuery, ListChallengeRoomResponsesQueryVariables> & ({ variables: ListChallengeRoomResponsesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListChallengeRoomResponsesQuery, ListChallengeRoomResponsesQueryVariables>(ListChallengeRoomResponsesDocument, options);
      }
export function useListChallengeRoomResponsesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListChallengeRoomResponsesQuery, ListChallengeRoomResponsesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListChallengeRoomResponsesQuery, ListChallengeRoomResponsesQueryVariables>(ListChallengeRoomResponsesDocument, options);
        }
export function useListChallengeRoomResponsesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListChallengeRoomResponsesQuery, ListChallengeRoomResponsesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListChallengeRoomResponsesQuery, ListChallengeRoomResponsesQueryVariables>(ListChallengeRoomResponsesDocument, options);
        }
export type ListChallengeRoomResponsesQueryHookResult = ReturnType<typeof useListChallengeRoomResponsesQuery>;
export type ListChallengeRoomResponsesLazyQueryHookResult = ReturnType<typeof useListChallengeRoomResponsesLazyQuery>;
export type ListChallengeRoomResponsesSuspenseQueryHookResult = ReturnType<typeof useListChallengeRoomResponsesSuspenseQuery>;
export type ListChallengeRoomResponsesQueryResult = Apollo.QueryResult<ListChallengeRoomResponsesQuery, ListChallengeRoomResponsesQueryVariables>;
export const ListStudentChallengeResponsesDocument = gql`
    query ListStudentChallengeResponses($studentId: ID!) {
  listStudentChallengeResponses(studentId: $studentId) {
    id
    challengeRoomId
    studentId
    submittedAnswer
    isCorrect
    points
    submittedAt
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useListStudentChallengeResponsesQuery__
 *
 * To run a query within a React component, call `useListStudentChallengeResponsesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListStudentChallengeResponsesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListStudentChallengeResponsesQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useListStudentChallengeResponsesQuery(baseOptions: Apollo.QueryHookOptions<ListStudentChallengeResponsesQuery, ListStudentChallengeResponsesQueryVariables> & ({ variables: ListStudentChallengeResponsesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStudentChallengeResponsesQuery, ListStudentChallengeResponsesQueryVariables>(ListStudentChallengeResponsesDocument, options);
      }
export function useListStudentChallengeResponsesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStudentChallengeResponsesQuery, ListStudentChallengeResponsesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStudentChallengeResponsesQuery, ListStudentChallengeResponsesQueryVariables>(ListStudentChallengeResponsesDocument, options);
        }
export function useListStudentChallengeResponsesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListStudentChallengeResponsesQuery, ListStudentChallengeResponsesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListStudentChallengeResponsesQuery, ListStudentChallengeResponsesQueryVariables>(ListStudentChallengeResponsesDocument, options);
        }
export type ListStudentChallengeResponsesQueryHookResult = ReturnType<typeof useListStudentChallengeResponsesQuery>;
export type ListStudentChallengeResponsesLazyQueryHookResult = ReturnType<typeof useListStudentChallengeResponsesLazyQuery>;
export type ListStudentChallengeResponsesSuspenseQueryHookResult = ReturnType<typeof useListStudentChallengeResponsesSuspenseQuery>;
export type ListStudentChallengeResponsesQueryResult = Apollo.QueryResult<ListStudentChallengeResponsesQuery, ListStudentChallengeResponsesQueryVariables>;