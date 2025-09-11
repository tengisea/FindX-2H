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

export type CreateExampleInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type Example = {
  __typename?: 'Example';
  age?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createExample: Response;
};


export type MutationCreateExampleArgs = {
  input: CreateExampleInput;
};

export type Query = {
  __typename?: 'Query';
  example?: Maybe<Example>;
};

export enum Response {
  NotFound = 'NOT_FOUND',
  Success = 'Success'
}

export type ExampleQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQuery = { __typename?: 'Query', example?: { __typename?: 'Example', id?: string | null, age?: number | null, phoneNumber?: string | null } | null };


export const ExampleDocument = gql`
    query Example {
  example {
    id
    age
    phoneNumber
  }
}
    `;

/**
 * __useExampleQuery__
 *
 * To run a query within a React component, call `useExampleQuery` and pass it any options that fit your needs.
 * When your component renders, `useExampleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExampleQuery({
 *   variables: {
 *   },
 * });
 */
export function useExampleQuery(baseOptions?: Apollo.QueryHookOptions<ExampleQuery, ExampleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExampleQuery, ExampleQueryVariables>(ExampleDocument, options);
      }
export function useExampleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExampleQuery, ExampleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExampleQuery, ExampleQueryVariables>(ExampleDocument, options);
        }
export function useExampleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExampleQuery, ExampleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExampleQuery, ExampleQueryVariables>(ExampleDocument, options);
        }
export type ExampleQueryHookResult = ReturnType<typeof useExampleQuery>;
export type ExampleLazyQueryHookResult = ReturnType<typeof useExampleLazyQuery>;
export type ExampleSuspenseQueryHookResult = ReturnType<typeof useExampleSuspenseQuery>;
export type ExampleQueryResult = Apollo.QueryResult<ExampleQuery, ExampleQueryVariables>;