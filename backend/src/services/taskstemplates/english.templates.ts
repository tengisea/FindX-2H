import { TopicTemplates } from './index';

export const englishTemplates: TopicTemplates = {
  EASY: {
    "vocabulary-matching": {
      title: 'Vocabulary Matching',
      description: 'Match words with their correct definitions',
      problemStatement: `Match each word with its correct definition.

Instructions:
Read the word and choose the correct definition from the options provided.

Example:
Word: "Benevolent"
Options:
A) Cruel and harsh
B) Kind and generous
C) Confused and lost
D) Angry and upset

Correct Answer: B) Kind and generous

Your task: Match 10 words with their definitions.`
    },
    "sentence-completion": {
      title: 'Sentence Completion',
      description: 'Complete sentences with the correct word',
      problemStatement: `Complete each sentence by choosing the most appropriate word.

Instructions:
Read the incomplete sentence and choose the word that best fits the context.

Example:
"The weather was so _____ that we decided to stay indoors."
Options:
A) beautiful
B) terrible
C) sunny
D) windy

Correct Answer: B) terrible

Your task: Complete 8 sentences with the most appropriate words.`
    },
    "basic-grammar": {
      title: 'Basic Grammar Rules',
      description: 'Identify correct grammar usage',
      problemStatement: `Choose the grammatically correct sentence from the given options.

Instructions:
Read each question and select the sentence that follows proper English grammar rules.

Example:
Which sentence is correct?
A) "She don't like apples."
B) "She doesn't like apples."
C) "She not like apples."
D) "She no like apples."

Correct Answer: B) "She doesn't like apples."

Your task: Identify the correct grammar in 12 sentences.`
    }
  },
  MEDIUM: {
    "reading-comprehension": {
      title: 'Reading Comprehension',
      description: 'Read a passage and answer questions about it',
      problemStatement: `Read the following passage and answer the questions that follow.

Passage:
"The Industrial Revolution was a period of major industrialization and innovation during the late 18th and early 19th centuries. The Industrial Revolution began in Great Britain and quickly spread throughout the world. The American Industrial Revolution commonly referred to as the Second Industrial Revolution, started sometime between 1820 and 1870."

Questions:
1. When did the Industrial Revolution begin?
2. Where did it start?
3. What was the American Industrial Revolution also called?

Your task: Read the passage carefully and answer all questions based on the information provided.`
    },
    "synonym-antonym": {
      title: 'Synonyms and Antonyms',
      description: 'Find synonyms and antonyms for given words',
      problemStatement: `For each given word, provide both a synonym and an antonym.

Instructions:
Read the word and write one synonym and one antonym for it.

Example:
Word: "Happy"
Synonym: Joyful, Cheerful, Delighted
Antonym: Sad, Miserable, Depressed

Your task: Provide synonyms and antonyms for 15 words.`
    },
    "essay-writing": {
      title: 'Essay Writing Practice',
      description: 'Write a short essay on a given topic',
      problemStatement: `Write a 200-word essay on the given topic.

Topic: "The Importance of Education in Modern Society"

Instructions:
- Write a clear introduction, body paragraphs, and conclusion
- Use proper paragraph structure
- Include relevant examples
- Check your grammar and spelling

Your task: Write a well-structured essay that demonstrates your understanding of the topic and your ability to express ideas clearly in English.`
    }
  },
  HARD: {
    "advanced-literature": {
      title: 'Advanced Literature Analysis',
      description: 'Analyze literary devices and themes in a text',
      problemStatement: `Read the following excerpt and analyze the literary devices and themes.

Excerpt:
"The old man and the sea were one. He had fished for eighty-four days without catching a fish, but he was not discouraged. The sea was his friend, his enemy, and his life."

Analysis Questions:
1. Identify the literary devices used in this passage
2. What themes are being explored?
3. How does the author's choice of words contribute to the overall meaning?
4. What is the significance of the number "eighty-four"?

Your task: Provide a detailed literary analysis demonstrating advanced English comprehension and critical thinking skills.`
    },
    "debate-preparation": {
      title: 'Debate Preparation',
      description: 'Prepare arguments for and against a controversial topic',
      problemStatement: `Prepare arguments for both sides of the following debate topic.

Topic: "Should social media platforms be held responsible for the content posted by their users?"

Instructions:
- Prepare 3 strong arguments FOR the motion
- Prepare 3 strong arguments AGAINST the motion
- Include evidence and examples to support each argument
- Consider counter-arguments and how to address them

Your task: Write a comprehensive debate preparation that demonstrates advanced English argumentation skills and critical thinking.`
    },
    "creative-writing": {
      title: 'Creative Writing Challenge',
      description: 'Write a creative story using specific literary techniques',
      problemStatement: `Write a creative short story (300-400 words) that incorporates the following elements:

Required Elements:
- A mysterious character who appears at the beginning
- A plot twist in the middle
- Dialogue that reveals character personality
- Vivid descriptive language
- A surprising ending

Prompt: "The letter arrived on a rainy Tuesday morning, but it wasn't addressed to anyone in the house..."

Your task: Create an engaging short story that demonstrates advanced English writing skills, creativity, and mastery of literary techniques.`
    }
  }
};