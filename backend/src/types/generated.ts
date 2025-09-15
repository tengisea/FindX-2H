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
  organizer: Scalars['ID']['output'];
  scoreOfAward?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
};

export type Organizer = {
  __typename?: 'Organizer';
  Olympiads?: Maybe<Array<Scalars['ID']['output']>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organizationName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allClassTypes: Array<ClassType>;
  allOlympiads: Array<Olympiad>;
  allStudentAnswers: Array<StudentAnswer>;
  approvedOlympiads: Array<Olympiad>;
  classType: ClassType;
  classTypesByClassYear: Array<ClassType>;
  classTypesByOlympiad: Array<ClassType>;
  getAllOrganizer: Array<Organizer>;
  getAllStudent: Array<Student>;
  getOrganizer: Organizer;
  olympiad: Olympiad;
  participantsByClassType: Array<Scalars['ID']['output']>;
  pendingOlympiads: Array<Olympiad>;
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
  AnswerInput: AnswerInput;
  ApproveOlympiadInput: ApproveOlympiadInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ClassType: ResolverTypeWrapper<ClassType>;
  ClassYear: ClassYear;
  CreateClassTypeInput: CreateClassTypeInput;
  CreateOlympiadRequestInput: CreateOlympiadRequestInput;
  CreateOrganizerInput: CreateOrganizerInput;
  CreateQuestionInput: CreateQuestionInput;
  CreateStudentAnswerInput: CreateStudentAnswerInput;
  CreateStudentInput: CreateStudentInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Olympiad: ResolverTypeWrapper<Olympiad>;
  Organizer: ResolverTypeWrapper<Organizer>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Question: ResolverTypeWrapper<Question>;
  Response: Response;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Student: ResolverTypeWrapper<Student>;
  StudentAnswer: ResolverTypeWrapper<StudentAnswer>;
  UpdateClassTypeInput: UpdateClassTypeInput;
  UpdateOlympiadInput: UpdateOlympiadInput;
  UpdateQuestionInput: UpdateQuestionInput;
  UpdateStudentAnswerInput: UpdateStudentAnswerInput;
  UpdateStudentInput: UpdateStudentInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  AnswerInput: AnswerInput;
  ApproveOlympiadInput: ApproveOlympiadInput;
  Boolean: Scalars['Boolean']['output'];
  ClassType: ClassType;
  CreateClassTypeInput: CreateClassTypeInput;
  CreateOlympiadRequestInput: CreateOlympiadRequestInput;
  CreateOrganizerInput: CreateOrganizerInput;
  CreateQuestionInput: CreateQuestionInput;
  CreateStudentAnswerInput: CreateStudentAnswerInput;
  CreateStudentInput: CreateStudentInput;
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  Olympiad: Olympiad;
  Organizer: Organizer;
  Query: Record<PropertyKey, never>;
  Question: Question;
  String: Scalars['String']['output'];
  Student: Student;
  StudentAnswer: StudentAnswer;
  UpdateClassTypeInput: UpdateClassTypeInput;
  UpdateOlympiadInput: UpdateOlympiadInput;
  UpdateQuestionInput: UpdateQuestionInput;
  UpdateStudentAnswerInput: UpdateStudentAnswerInput;
  UpdateStudentInput: UpdateStudentInput;
};

export type AnswerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  questionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ClassTypeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ClassType'] = ResolversParentTypes['ClassType']> = {
  classYear?: Resolver<ResolversTypes['ClassYear'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  medalists?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  olympiadId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  studentsResults?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addOlympiad?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationAddOlympiadArgs, 'id' | 'olympiadId'>>;
  approveOlympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<MutationApproveOlympiadArgs, 'id' | 'input'>>;
  createClassType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, RequireFields<MutationCreateClassTypeArgs, 'input'>>;
  createOrganizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType, RequireFields<MutationCreateOrganizerArgs, 'input'>>;
  createQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationCreateQuestionArgs, 'input'>>;
  createStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationCreateStudentArgs, 'input'>>;
  createStudentAnswer?: Resolver<ResolversTypes['StudentAnswer'], ParentType, ContextType, RequireFields<MutationCreateStudentAnswerArgs, 'input'>>;
  deleteClassType?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteClassTypeArgs, 'id'>>;
  deleteOlympiad?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteOlympiadArgs, 'id'>>;
  deleteQuestion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteQuestionArgs, 'id'>>;
  deleteStudent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteStudentArgs, 'id'>>;
  deleteStudentAnswer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteStudentAnswerArgs, 'id'>>;
  requestOlympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<MutationRequestOlympiadArgs, 'input'>>;
  updateClassType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, RequireFields<MutationUpdateClassTypeArgs, 'id' | 'input'>>;
  updateOlympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<MutationUpdateOlympiadArgs, 'id' | 'input'>>;
  updateOrganizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType, RequireFields<MutationUpdateOrganizerArgs, 'id' | 'input'>>;
  updatePiPoints?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationUpdatePiPointsArgs, 'id' | 'piPoints'>>;
  updateQuestion?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<MutationUpdateQuestionArgs, 'id' | 'input'>>;
  updateStudent?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationUpdateStudentArgs, 'id' | 'input'>>;
  updateStudentAnswer?: Resolver<ResolversTypes['StudentAnswer'], ParentType, ContextType, RequireFields<MutationUpdateStudentAnswerArgs, 'id' | 'input'>>;
  updateTotalScore?: Resolver<ResolversTypes['Student'], ParentType, ContextType, RequireFields<MutationUpdateTotalScoreArgs, 'id' | 'totalScore'>>;
};

export type OlympiadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Olympiad'] = ResolversParentTypes['Olympiad']> = {
  classtypes?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organizer?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  scoreOfAward?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type OrganizerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Organizer'] = ResolversParentTypes['Organizer']> = {
  Olympiads?: Resolver<Maybe<Array<ResolversTypes['ID']>>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  organizationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allClassTypes?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType>;
  allOlympiads?: Resolver<Array<ResolversTypes['Olympiad']>, ParentType, ContextType>;
  allStudentAnswers?: Resolver<Array<ResolversTypes['StudentAnswer']>, ParentType, ContextType>;
  approvedOlympiads?: Resolver<Array<ResolversTypes['Olympiad']>, ParentType, ContextType>;
  classType?: Resolver<ResolversTypes['ClassType'], ParentType, ContextType, RequireFields<QueryClassTypeArgs, 'id'>>;
  classTypesByClassYear?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType, RequireFields<QueryClassTypesByClassYearArgs, 'classYear'>>;
  classTypesByOlympiad?: Resolver<Array<ResolversTypes['ClassType']>, ParentType, ContextType, RequireFields<QueryClassTypesByOlympiadArgs, 'olympiadId'>>;
  getAllOrganizer?: Resolver<Array<ResolversTypes['Organizer']>, ParentType, ContextType>;
  getAllStudent?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType>;
  getOrganizer?: Resolver<ResolversTypes['Organizer'], ParentType, ContextType, RequireFields<QueryGetOrganizerArgs, 'id'>>;
  olympiad?: Resolver<ResolversTypes['Olympiad'], ParentType, ContextType, RequireFields<QueryOlympiadArgs, 'id'>>;
  participantsByClassType?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<QueryParticipantsByClassTypeArgs, 'classTypeId'>>;
  pendingOlympiads?: Resolver<Array<ResolversTypes['Olympiad']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['Question'], ParentType, ContextType, RequireFields<QueryQuestionArgs, 'id'>>;
  questionsByClassType?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryQuestionsByClassTypeArgs, 'classTypeId'>>;
  student?: Resolver<Maybe<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentArgs, 'id'>>;
  studentAnswer?: Resolver<Maybe<ResolversTypes['StudentAnswer']>, ParentType, ContextType, RequireFields<QueryStudentAnswerArgs, 'id'>>;
  studentAnswersByClassType?: Resolver<Array<ResolversTypes['StudentAnswer']>, ParentType, ContextType, RequireFields<QueryStudentAnswersByClassTypeArgs, 'classTypeId'>>;
  studentsByClass?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByClassArgs, 'class'>>;
  studentsByClassType?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByClassTypeArgs, 'classTypeId'>>;
  studentsByLocation?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByLocationArgs, 'location'>>;
  studentsByOlympiad?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsByOlympiadArgs, 'olympiadId'>>;
  studentsBySchool?: Resolver<Array<ResolversTypes['Student']>, ParentType, ContextType, RequireFields<QueryStudentsBySchoolArgs, 'school'>>;
  studentsResultsByClassType?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<QueryStudentsResultsByClassTypeArgs, 'classTypeId'>>;
};

export type QuestionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  classTypeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  questionName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type StudentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Student'] = ResolversParentTypes['Student']> = {
  class?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participatedOlympiads?: Resolver<Array<ResolversTypes['ID']>, ParentType, ContextType>;
  piPoints?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profilePicture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  school?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type StudentAnswerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['StudentAnswer'] = ResolversParentTypes['StudentAnswer']> = {
  answers?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType>;
  classTypeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  studentId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalScoreofOlympiad?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Answer?: AnswerResolvers<ContextType>;
  ClassType?: ClassTypeResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Olympiad?: OlympiadResolvers<ContextType>;
  Organizer?: OrganizerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  StudentAnswer?: StudentAnswerResolvers<ContextType>;
};

