# Multiple Tasks Generation Guide

## 🎯 **New Feature: Difficulty Distribution**

The `generateMultipleTasks` mutation now supports generating tasks with different difficulty levels in a single request!

## 📋 **New Schema**

### **Input Types:**
```graphql
input DifficultyDistribution {
  easy: Int
  medium: Int
  hard: Int
}

input GenerateMultipleTasksInput {
  topic: Topic!
  type: TaskType!
  piPoints: Int!
  taskCount: Int
  difficultyDistribution: DifficultyDistribution
}
```

## 🚀 **Usage Examples**

### **1. Equal Distribution (Default)**
```graphql
mutation {
  generateMultipleTasks(input: {
    topic: CHEMISTRY
    type: CHALLENGE
    piPoints: 100
    taskCount: 9
  }) {
    id
    title
    difficulty
    problemStatement
  }
}
```
**Result:** 3 Easy + 3 Medium + 3 Hard tasks

### **2. Custom Distribution**
```graphql
mutation {
  generateMultipleTasks(input: {
    topic: BIOLOGY
    type: TOURNAMENT
    piPoints: 150
    taskCount: 10
    difficultyDistribution: {
      easy: 2
      medium: 5
      hard: 3
    }
  }) {
    id
    title
    difficulty
    problemStatement
  }
}
```
**Result:** 2 Easy + 5 Medium + 3 Hard tasks

### **3. Only Easy Tasks**
```graphql
mutation {
  generateMultipleTasks(input: {
    topic: PHYSICS
    type: CHALLENGE
    piPoints: 50
    taskCount: 5
    difficultyDistribution: {
      easy: 5
      medium: 0
      hard: 0
    }
  }) {
    id
    title
    difficulty
  }
}
```
**Result:** 5 Easy tasks only

### **4. Mixed Difficulties**
```graphql
mutation {
  generateMultipleTasks(input: {
    topic: MATHEMATICS
    type: TOURNAMENT
    piPoints: 200
    taskCount: 8
    difficultyDistribution: {
      easy: 1
      medium: 2
      hard: 5
    }
  }) {
    id
    title
    difficulty
  }
}
```
**Result:** 1 Easy + 2 Medium + 5 Hard tasks

## ⚙️ **How It Works**

### **1. Distribution Calculation**
- If no `difficultyDistribution` provided → Equal distribution
- If `difficultyDistribution` provided → Use specified counts
- If counts don't match `taskCount` → Scale proportionally
- If total = 0 → Fall back to equal distribution

### **2. Task Generation Process**
1. Calculate difficulty distribution
2. Generate tasks for each difficulty level
3. Use AI generation first, fallback to templates
4. Ensure uniqueness within each difficulty level
5. Return all tasks in a single array

### **3. Validation Rules**
- `taskCount`: 1-20 (increased from 10)
- `piPoints`: ≥ 1
- Difficulty counts: ≥ 0
- If distribution provided: total must equal `taskCount`

## 📊 **Distribution Examples**

| Task Count | Easy | Medium | Hard | Notes |
|------------|------|--------|------|-------|
| 6 | 2 | 2 | 2 | Equal distribution |
| 7 | 3 | 2 | 2 | Remainder goes to Easy |
| 10 | 5 | 0 | 5 | Only Easy and Hard |
| 15 | 0 | 15 | 0 | Only Medium |
| 20 | 7 | 6 | 7 | Custom distribution |

## 🎯 **Use Cases**

### **Educational Progression**
```graphql
# Beginner course: mostly easy tasks
difficultyDistribution: { easy: 8, medium: 2, hard: 0 }

# Intermediate course: balanced
difficultyDistribution: { easy: 3, medium: 4, hard: 3 }

# Advanced course: mostly hard tasks
difficultyDistribution: { easy: 1, medium: 2, hard: 7 }
```

### **Olympiad Preparation**
```graphql
# Training session: focus on weak areas
difficultyDistribution: { easy: 2, medium: 5, hard: 3 }

# Competition simulation: all difficulties
difficultyDistribution: { easy: 4, medium: 4, hard: 4 }
```

### **Assessment Creation**
```graphql
# Diagnostic test: easy start
difficultyDistribution: { easy: 5, medium: 3, hard: 2 }

# Final exam: challenging
difficultyDistribution: { easy: 1, medium: 4, hard: 5 }
```

## 🔧 **Technical Details**

### **Service Changes**
- `TaskGeneratorService.generateMultipleTasks()` now accepts `MultipleTaskGenerationRequest`
- Added `TaskUtilsService.calculateDifficultyDistribution()` helper
- Increased task limit from 10 to 20
- Enhanced logging for difficulty distribution

### **Error Handling**
- Validates difficulty distribution totals
- Ensures non-negative difficulty counts
- Provides clear error messages for invalid inputs
- Graceful fallback to equal distribution

### **Performance**
- Generates tasks in parallel for each difficulty level
- Maintains uniqueness across all generated tasks
- Efficient template selection and AI generation

## 🎉 **Benefits**

✅ **Flexible Difficulty Control** - Generate exactly the mix you need  
✅ **Educational Progression** - Support different learning levels  
✅ **Assessment Creation** - Create balanced or focused tests  
✅ **Olympiad Training** - Practice specific difficulty ranges  
✅ **Efficient Generation** - Get multiple difficulties in one request  
✅ **Smart Distribution** - Automatic scaling and validation  

This feature makes your task generation system much more powerful and flexible for educational use cases! 🚀
