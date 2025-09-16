# Services Architecture

The task generation system has been split into 4 focused services for better maintainability and organization.

## 📁 Service Structure

### 1. **`taskGenerator.service.ts`** - Main Orchestrator
**Purpose**: Main service that coordinates task generation
**Responsibilities**:
- Orchestrates AI and template generation
- Handles both single and multiple task generation
- Manages fallback logic (AI → Templates)
- Provides the main public API

**Key Methods**:
- `generateTask()` - Generate single task
- `generateMultipleTasks()` - Generate 1-10 tasks with uniqueness
- `createFallbackTask()` - Create fallback tasks

### 2. **`ai.service.ts`** - AI Integration
**Purpose**: Handles all OpenAI API interactions
**Responsibilities**:
- OpenAI API communication
- Prompt building and optimization
- AI response parsing and validation
- Error handling for AI failures

**Key Methods**:
- `generateTask()` - Generate content using AI
- `buildPrompt()` - Create optimized prompts
- `callAIService()` - Make OpenAI API calls
- `parseAIResponse()` - Parse and validate AI responses

### 3. **`template.service.ts`** - Template System
**Purpose**: Manages template-based task generation
**Responsibilities**:
- Random template selection
- Unique template generation
- Template fallback logic
- Template system integration

**Key Methods**:
- `generateFromTemplate()` - Get random template
- `generateUniqueTemplate()` - Get unique template (for multiple tasks)

### 4. **`task-utils.service.ts`** - Utilities & Helpers
**Purpose**: Common utilities and helper functions
**Responsibilities**:
- Type mapping (GraphQL ↔ Model)
- Database operations
- Data transformation
- Formatting utilities

**Key Methods**:
- `mapDifficultyToModel()` - Convert GraphQL to Model enums
- `mapTaskTypeToModel()` - Convert GraphQL to Model enums
- `transformToGraphQLTask()` - Convert DB doc to GraphQL type
- `createTaskInDatabase()` - Save task to database
- `formatProblemStatement()` - Format problem statements

## 🔄 Data Flow

```
Request → TaskGeneratorService
    ↓
    ├── Try AI: AIService.generateTask()
    │   ├── Build prompt
    │   ├── Call OpenAI API
    │   └── Parse response
    │
    └── Fallback: TemplateService.generateFromTemplate()
        ├── Select random template
        └── Ensure uniqueness (for multiple tasks)
    ↓
TaskUtilsService
    ├── Map types (GraphQL ↔ Model)
    ├── Create database record
    └── Transform to GraphQL response
```

## 🎯 Benefits of This Structure

### **Separation of Concerns**
- Each service has a single responsibility
- Easy to test individual components
- Clear boundaries between functionality

### **Maintainability**
- Changes to AI logic don't affect templates
- Template changes don't affect AI
- Utility functions are centralized

### **Scalability**
- Easy to add new AI providers
- Easy to add new template sources
- Easy to add new utility functions

### **Reusability**
- Services can be used independently
- Easy to create new combinations
- Clear interfaces between services

## 🔧 Usage Examples

### **Single Task Generation**
```typescript
const task = await TaskGeneratorService.generateTask({
  topic: "english",
  difficulty: GraphQLDifficulty.Medium,
  type: GraphQLTaskType.Challenge,
  piPoints: 100
});
```

### **Multiple Task Generation**
```typescript
const tasks = await TaskGeneratorService.generateMultipleTasks({
  topic: "algorithms",
  difficulty: GraphQLDifficulty.Hard,
  type: GraphQLTaskType.Tournament,
  piPoints: 150,
  taskCount: 5
});
```

### **Direct AI Generation**
```typescript
const content = await AIService.generateTask({
  topic: "math",
  difficulty: "Medium",
  type: "CHALLENGE",
  piPoints: 100
});
```

### **Direct Template Generation**
```typescript
const content = TemplateService.generateFromTemplate({
  topic: "english",
  difficulty: "MEDIUM"
});
```

## 📊 Service Dependencies

```
TaskGeneratorService
    ├── AIService
    ├── TemplateService
    └── TaskUtilsService
            ├── TaskModel (Mongoose)
            └── Generated Types (GraphQL)
```

This architecture provides a clean, maintainable, and scalable foundation for the task generation system! 🚀
