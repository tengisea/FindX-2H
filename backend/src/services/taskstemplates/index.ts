import { algorithmsTemplates } from './algorithms.templates';
import { dataStructuresTemplates } from './dataStructures.templates';
import { mathTemplates } from './math.templates';
import { stringTemplates } from './string.templates';
import { graphTemplates } from './graph.templates';
import { dynamicProgrammingTemplates } from './dynamicProgramming.templates';
import { greedyTemplates } from './greedy.templates';
import { englishTemplates } from './english.templates';
import { textProcessingTemplates } from './textProcessing.templates';
import { chemistryTemplates } from './chemistry.templates';
import { biologyTemplates } from './biology.templates';
import { physicsTemplates } from './physics.templates';
import { computerScienceTemplates } from './computer-science.templates';
import { astronomyTemplates } from './astronomy.templates';
import { earthScienceTemplates } from './earth-science.templates';
import { linguisticsTemplates } from './linguistics.templates';
import { philosophyTemplates } from './philosophy.templates';
import { historyTemplates } from './history.templates';
import { geographyTemplates } from './geography.templates';
import { economicsTemplates } from './economics.templates';

export interface TaskTemplate {
  title: string;
  description: string;
  problemStatement: string;
}

export interface TopicTemplates {
  [key: string]: {
    [key: string]: TaskTemplate;
  };
}

export const allTemplates: Record<string, TopicTemplates> = {
  algorithms: algorithmsTemplates,
  'data-structures': dataStructuresTemplates,
  math: mathTemplates,
  string: stringTemplates,
  graph: graphTemplates,
  'dynamic-programming': dynamicProgrammingTemplates,
  greedy: greedyTemplates,
  english: englishTemplates,
  'text-processing': textProcessingTemplates,
  chemistry: chemistryTemplates,
  biology: biologyTemplates,
  physics: physicsTemplates,
  'computer-science': computerScienceTemplates,
  astronomy: astronomyTemplates,
  'earth-science': earthScienceTemplates,
  linguistics: linguisticsTemplates,
  philosophy: philosophyTemplates,
  history: historyTemplates,
  geography: geographyTemplates,
  economics: economicsTemplates,
};

export const getRandomTemplate = (topic: string, difficulty: string): TaskTemplate => {
  const topicTemplates = allTemplates[topic.toLowerCase()] || allTemplates['algorithms'];
  const difficultyTemplates = topicTemplates[difficulty] || topicTemplates['EASY'];
  
  // Get all available templates for this difficulty
  const availableTemplates = Object.values(difficultyTemplates);
  
  // Return a random template
  const randomIndex = Math.floor(Math.random() * availableTemplates.length);
  return availableTemplates[randomIndex];
};

export const getAvailableTopics = (): string[] => {
  return Object.keys(allTemplates);
};

export const getAvailableDifficulties = (topic: string): string[] => {
  const topicTemplates = allTemplates[topic.toLowerCase()] || allTemplates['algorithms'];
  return Object.keys(topicTemplates);
};
