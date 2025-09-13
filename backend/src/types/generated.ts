import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export enum Difficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type DifficultyDistribution = {
  easy?: InputMaybe<Scalars['Int']['input']>;
  hard?: InputMaybe<Scalars['Int']['input']>;
  medium?: InputMaybe<Scalars['Int']['input']>;
};

export type GenerateMultipleTasksInput = {
  difficultyDistribution?: InputMaybe<DifficultyDistribution>;
  piPoints: Scalars['Int']['input'];
  taskCount: Scalars['Int']['input'];
  topic: Topic;
  type: TaskType;
};

export type GenerateTaskInput = {
  difficulty: Difficulty;
  piPoints: Scalars['Int']['input'];
  taskCount?: InputMaybe<Scalars['Int']['input']>;
  topic: Topic;
  type: TaskType;
};

export type Mutation = {
  __typename?: 'Mutation';
  generateMultipleTasks: Array<Task>;
  generateTask: Task;
};


export type MutationGenerateMultipleTasksArgs = {
  input: GenerateMultipleTasksInput;
};


export type MutationGenerateTaskArgs = {
  input: GenerateTaskInput;
};

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  tasks: Array<Task>;
  tasksByDifficulty: Array<Task>;
  tasksByTopic: Array<Task>;
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTasksByDifficultyArgs = {
  difficulty: Difficulty;
};


export type QueryTasksByTopicArgs = {
  topic: Topic;
};

export enum Response {
  NotFound = 'NOT_FOUND',
  Success = 'Success'
}

export type Task = {
  __typename?: 'Task';
  aiGenerated: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  difficulty: Difficulty;
  generatedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  piPoints: Scalars['Int']['output'];
  problemStatement: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topic: Topic;
  type: TaskType;
  updatedAt: Scalars['DateTime']['output'];
  usageCount: Scalars['Int']['output'];
};

export enum TaskType {
  Challenge = 'CHALLENGE',
  Tournament = 'TOURNAMENT'
}

export enum Topic {
  Algorithms = 'ALGORITHMS',
  Astronomy = 'ASTRONOMY',
  Biology = 'BIOLOGY',
  Chemistry = 'CHEMISTRY',
  ComputerScience = 'COMPUTER_SCIENCE',
  DataStructures = 'DATA_STRUCTURES',
  DynamicProgramming = 'DYNAMIC_PROGRAMMING',
  EarthScience = 'EARTH_SCIENCE',
  Economics = 'ECONOMICS',
  English = 'ENGLISH',
  Geography = 'GEOGRAPHY',
  Graph = 'GRAPH',
  Greedy = 'GREEDY',
  History = 'HISTORY',
  Linguistics = 'LINGUISTICS',
  Math = 'MATH',
  Philosophy = 'PHILOSOPHY',
  Physics = 'PHYSICS',
  String = 'STRING',
  TextProcessing = 'TEXT_PROCESSING'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Difficulty: Difficulty;
  DifficultyDistribution: DifficultyDistribution;
  GenerateMultipleTasksInput: GenerateMultipleTasksInput;
  GenerateTaskInput: GenerateTaskInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Response: Response;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskType: TaskType;
  Topic: Topic;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  DifficultyDistribution: DifficultyDistribution;
  GenerateMultipleTasksInput: GenerateMultipleTasksInput;
  GenerateTaskInput: GenerateTaskInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Task: Task;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  generateMultipleTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationGenerateMultipleTasksArgs, 'input'>>;
  generateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationGenerateTaskArgs, 'input'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  tasksByDifficulty?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTasksByDifficultyArgs, 'difficulty'>>;
  tasksByTopic?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTasksByTopicArgs, 'topic'>>;
};

export type TaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  aiGenerated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['Difficulty'], ParentType, ContextType>;
  generatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  piPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  problemStatement?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['Topic'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TaskType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  usageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
};

