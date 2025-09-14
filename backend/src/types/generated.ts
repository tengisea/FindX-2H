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

export type Answer = {
  __typename?: 'Answer';
  aiGenerated: Scalars['Boolean']['output'];
  answer: Scalars['String']['output'];
  answerValidation: AnswerValidation;
  createdAt: Scalars['DateTime']['output'];
  generatedAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  solution: Scalars['String']['output'];
  taskId: Scalars['ID']['output'];
  testCases?: Maybe<Array<TestCase>>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AnswerFormat {
  CodeSolution = 'CODE_SOLUTION',
  Drawing = 'DRAWING',
  LongText = 'LONG_TEXT',
  MultipleChoice = 'MULTIPLE_CHOICE',
  ShortText = 'SHORT_TEXT',
  SingleNumber = 'SINGLE_NUMBER',
  SingleWord = 'SINGLE_WORD',
  TrueFalse = 'TRUE_FALSE'
}

export type AnswerValidation = {
  __typename?: 'AnswerValidation';
  correctAnswers: Array<Scalars['String']['output']>;
  format: AnswerFormat;
  multipleChoiceOptions?: Maybe<Array<MultipleChoiceOption>>;
  partialCreditAnswers?: Maybe<Array<Scalars['String']['output']>>;
  validationRules?: Maybe<Scalars['String']['output']>;
};

export enum ClassType {
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

export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}

export type DifficultyDistribution = {
  easy?: InputMaybe<Scalars['Int']['input']>;
  medium?: InputMaybe<Scalars['Int']['input']>;
  hard?: InputMaybe<Scalars['Int']['input']>;
};

export type GenerateMultipleTasksInput = {
  classType: ClassType;
  difficultyDistribution?: InputMaybe<DifficultyDistribution>;
  piPoints: Scalars['Int']['input'];
  taskCount: Scalars['Int']['input'];
  topic: Topic;
  type: TaskType;
};

export type GenerateTaskInput = {
  classType: ClassType;
  difficulty: Difficulty;
  piPoints: Scalars['Int']['input'];
  taskCount?: InputMaybe<Scalars['Int']['input']>;
  topic: Topic;
  type: TaskType;
};

export type MultipleChoiceOption = {
  __typename?: 'MultipleChoiceOption';
  isCorrect: Scalars['Boolean']['output'];
  letter: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  generateMultipleTasks: Array<Task>;
  generateTask: Task;
  generateTaskAnswer: Answer;
};


export type MutationGenerateMultipleTasksArgs = {
  input: GenerateMultipleTasksInput;
};


export type MutationGenerateTaskArgs = {
  input: GenerateTaskInput;
};


export type MutationGenerateTaskAnswerArgs = {
  taskId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  answer?: Maybe<Answer>;
  task?: Maybe<Task>;
  tasks: Array<Task>;
  tasksByDifficulty: Array<Task>;
  tasksByTopic: Array<Task>;
};


export type QueryAnswerArgs = {
  taskId: Scalars['ID']['input'];
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
  classType: ClassType;
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

export type TestCase = {
  __typename?: 'TestCase';
  expectedOutput: Scalars['String']['output'];
  explanation?: Maybe<Scalars['String']['output']>;
  input: Scalars['String']['output'];
};

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
  Answer: ResolverTypeWrapper<Answer>;
  AnswerFormat: AnswerFormat;
  AnswerValidation: ResolverTypeWrapper<AnswerValidation>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ClassType: ClassType;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Difficulty: Difficulty;
  DifficultyDistribution: DifficultyDistribution;
  GenerateMultipleTasksInput: GenerateMultipleTasksInput;
  GenerateTaskInput: GenerateTaskInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MultipleChoiceOption: ResolverTypeWrapper<MultipleChoiceOption>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Response: Response;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskType: TaskType;
  TestCase: ResolverTypeWrapper<TestCase>;
  Topic: Topic;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  AnswerValidation: AnswerValidation;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  DifficultyDistribution: DifficultyDistribution;
  GenerateMultipleTasksInput: GenerateMultipleTasksInput;
  GenerateTaskInput: GenerateTaskInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  MultipleChoiceOption: MultipleChoiceOption;
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Task: Task;
  TestCase: TestCase;
};

export type AnswerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  aiGenerated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  answerValidation?: Resolver<ResolversTypes['AnswerValidation'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  generatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  solution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taskId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  testCases?: Resolver<Maybe<Array<ResolversTypes['TestCase']>>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type AnswerValidationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AnswerValidation'] = ResolversParentTypes['AnswerValidation']> = {
  correctAnswers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  format?: Resolver<ResolversTypes['AnswerFormat'], ParentType, ContextType>;
  multipleChoiceOptions?: Resolver<Maybe<Array<ResolversTypes['MultipleChoiceOption']>>, ParentType, ContextType>;
  partialCreditAnswers?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  validationRules?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MultipleChoiceOptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MultipleChoiceOption'] = ResolversParentTypes['MultipleChoiceOption']> = {
  isCorrect?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  letter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  generateMultipleTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationGenerateMultipleTasksArgs, 'input'>>;
  generateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationGenerateTaskArgs, 'input'>>;
  generateTaskAnswer?: Resolver<ResolversTypes['Answer'], ParentType, ContextType, RequireFields<MutationGenerateTaskAnswerArgs, 'taskId'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  answer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<QueryAnswerArgs, 'taskId'>>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  tasksByDifficulty?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTasksByDifficultyArgs, 'difficulty'>>;
  tasksByTopic?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTasksByTopicArgs, 'topic'>>;
};

export type TaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  aiGenerated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  classType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType>;
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

export type TestCaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TestCase'] = ResolversParentTypes['TestCase']> = {
  expectedOutput?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  input?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Answer?: AnswerResolvers<ContextType>;
  AnswerValidation?: AnswerValidationResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  MultipleChoiceOption?: MultipleChoiceOptionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TestCase?: TestCaseResolvers<ContextType>;
};

