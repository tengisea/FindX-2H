#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const generatedTypesPath = path.join(__dirname, '../src/types/generated.ts');

console.log('🔧 Fixing enum order in generated types...');

try {
  let content = fs.readFileSync(generatedTypesPath, 'utf8');
  
  // Fix Difficulty enum order
  content = content.replace(
    /export enum Difficulty \{\s*Easy = 'EASY',\s*Hard = 'HARD',\s*Medium = 'MEDIUM'\s*\}/,
    `export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Hard = 'HARD'
}`
  );
  
  // Fix DifficultyDistribution order
  content = content.replace(
    /export type DifficultyDistribution = \{\s*easy\?: InputMaybe<Scalars\['Int'\]\['input'\]>;\s*hard\?: InputMaybe<Scalars\['Int'\]\['input'\]>;\s*medium\?: InputMaybe<Scalars\['Int'\]\['input'\]>;\s*\};/,
    `export type DifficultyDistribution = {
  easy?: InputMaybe<Scalars['Int']['input']>;
  medium?: InputMaybe<Scalars['Int']['input']>;
  hard?: InputMaybe<Scalars['Int']['input']>;
};`
  );
  
  fs.writeFileSync(generatedTypesPath, content);
  console.log('✅ Enum order fixed successfully!');
  
} catch (error) {
  console.error('❌ Error fixing enum order:', error.message);
  process.exit(1);
}
