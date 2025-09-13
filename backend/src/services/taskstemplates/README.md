# Task Templates System

This directory contains a comprehensive template system for generating competitive programming problems when AI generation is not available.

## 📁 Structure

- `index.ts` - Main template system with random selection logic
- `algorithms.templates.ts` - Algorithm-based problems
- `dataStructures.templates.ts` - Data structure problems
- `math.templates.ts` - Mathematical problems
- `string.templates.ts` - String manipulation problems
- `graph.templates.ts` - Graph theory problems
- `dynamicProgramming.templates.ts` - DP problems
- `greedy.templates.ts` - Greedy algorithm problems
- `english.templates.ts` - English/Text processing problems

## 🎯 Available Topics

1. **algorithms** - Basic to advanced algorithmic problems
2. **data-structures** - Stack, queue, heap, tree problems
3. **math** - Mathematical and number theory problems
4. **string** - String manipulation and pattern matching
5. **graph** - Graph traversal, shortest path, MST
6. **dynamic-programming** - DP problems of varying complexity
7. **greedy** - Greedy algorithm problems
8. **english** - English language learning and literature problems
9. **text-processing** - Text processing and string algorithms

## 📊 Difficulty Levels

Each topic has problems in three difficulty levels:
- **EASY** - Basic concepts, simple implementations
- **MEDIUM** - Intermediate algorithms, moderate complexity
- **HARD** - Advanced algorithms, complex problem solving

## 🔄 Random Selection

The system automatically:
- Selects a random problem from the appropriate topic and difficulty
- Provides variety across multiple requests
- Falls back to 'algorithms' topic if the requested topic doesn't exist
- Falls back to 'EASY' difficulty if the requested difficulty doesn't exist

## 📝 Problem Format

Each template includes:
- **Title** - Clear, descriptive problem name
- **Description** - One-sentence summary
- **Problem Statement** - Complete problem with:
  - Problem description
  - Input format specification
  - Output format specification
  - Example test cases with explanations
  - Constraints

## 🚀 Usage

The template system is automatically used when:
- AI generation fails (API errors, quota exceeded, etc.)
- OpenAI API key is not configured
- AI service is unavailable

## 📈 Statistics

- **Total Templates**: 50+ problems across all topics
- **Topics**: 8 different programming domains
- **Difficulties**: 3 levels per topic
- **Coverage**: Comprehensive competitive programming curriculum
