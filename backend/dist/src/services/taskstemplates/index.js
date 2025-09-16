import { mathTemplates } from './math.templates';
import { englishTemplates } from './english.templates';
import { historyTemplates } from './history.templates';
import { biologyTemplates } from './biology.templates';
import { physicsTemplates } from './physics.templates';
import { chemistryTemplates } from './chemistry.templates';
import { linguisticsTemplates } from './linguistics.templates';
export const allTemplates = {
    math: mathTemplates,
    english: englishTemplates,
    history: historyTemplates,
    biology: biologyTemplates,
    physics: physicsTemplates,
    chemistry: chemistryTemplates,
    linguistics: linguisticsTemplates,
};
export const getRandomTemplate = (topic, difficulty) => {
    const topicTemplates = allTemplates[topic.toLowerCase()] || allTemplates['math'];
    const difficultyTemplates = topicTemplates[difficulty] || topicTemplates['EASY'];
    // Get all available templates for this difficulty
    const availableTemplates = Object.values(difficultyTemplates);
    // Return a random template
    const randomIndex = Math.floor(Math.random() * availableTemplates.length);
    return availableTemplates[randomIndex];
};
export const getAvailableTopics = () => {
    return Object.keys(allTemplates);
};
export const getAvailableDifficulties = (topic) => {
    const topicTemplates = allTemplates[topic.toLowerCase()] || allTemplates['math'];
    return Object.keys(topicTemplates);
};
