export const linguisticsTemplates = {
  EASY: {
    "phonetics": {
      title: "Phonetic Analysis",
      description: "Analyze sounds and phonetic features",
      problemStatement: "Analyze the phonetic features of these sounds:\n\n1. /p/ in 'pat'\n2. /i/ in 'beat'\n3. /θ/ in 'think'\n4. /ŋ/ in 'sing'\n\nFor each sound, identify:\n- Place of articulation\n- Manner of articulation\n- Voicing\n- Additional features\n\nAnswers:\n1. /p/ - bilabial, stop, voiceless\n2. /i/ - high front, tense, unrounded\n3. /θ/ - dental, fricative, voiceless\n4. /ŋ/ - velar, nasal, voiced"
    },
    "morphology": {
      title: "Word Structure Analysis",
      description: "Break down words into morphemes",
      problemStatement: "Analyze the morphological structure of these words:\n\n1. 'unhappiness'\n2. 'reconstruction'\n3. 'antidisestablishmentarianism'\n4. 'children'\n5. 'went'\n\nIdentify:\n- Root morpheme\n- Affixes (prefixes/suffixes)\n- Word formation process\n- Grammatical category\n\nAnswers:\n1. un- + happy + -ness (prefix + root + suffix)\n2. re- + construct + -ion (prefix + root + suffix)\n3. anti- + dis- + establish + -ment + -arian + -ism\n4. child + -ren (root + irregular plural)\n5. go + -ed (root + irregular past tense)"
    },
    "syntax": {
      title: "Sentence Structure Analysis",
      description: "Analyze sentence structure and grammar",
      problemStatement: "Draw phrase structure trees for these sentences:\n\n1. 'The cat sat on the mat'\n2. 'I think that she is coming'\n3. 'The book that I read was interesting'\n\nIdentify:\n- Noun phrases\n- Verb phrases\n- Prepositional phrases\n- Clauses\n\nAnswer: Use X-bar theory to show hierarchical structure with heads, complements, and specifiers."
    }
  },
  MEDIUM: {
    "semantics": {
      title: "Meaning and Reference",
      description: "Analyze meaning relationships and reference",
      problemStatement: "Analyze the semantic relationships in these sentences:\n\n1. 'All bachelors are unmarried men'\n2. 'The morning star is the evening star'\n3. 'John believes that the Earth is flat'\n\nQuestions:\n1. What is the difference between sense and reference?\n2. What is the difference between extension and intension?\n3. How do you handle propositional attitudes?\n4. What is the problem of empty names?\n5. How do you analyze presuppositions?\n\nAnswer: Sense is meaning, reference is what it points to. Extension is the set of things, intension is the concept. Propositional attitudes require possible worlds. Empty names refer to nothing. Presuppositions are background assumptions."
    },
    "pragmatics": {
      title: "Language in Context",
      description: "Analyze language use in context",
      problemStatement: "Analyze these conversational exchanges:\n\nA: 'Can you pass the salt?'\nB: 'I'm busy right now.'\n\n1. What is the literal meaning vs. intended meaning?\n2. What speech acts are being performed?\n3. What conversational implicatures are present?\n4. How does context affect interpretation?\n5. What are the Gricean maxims?\n\nAnswer: Literal meaning is question about ability, intended meaning is request. Speech acts: question and refusal. Implicature: B is too busy to help. Context determines politeness and urgency. Gricean maxims: quality, quantity, relation, manner."
    },
    "language_acquisition": {
      title: "First Language Acquisition",
      description: "Understand how children acquire language",
      problemStatement: "A 3-year-old says: 'I goed to the store'\n\n1. What linguistic phenomenon is this?\n2. What does it tell us about language acquisition?\n3. What is the critical period hypothesis?\n4. How do children learn grammar?\n5. What is the poverty of stimulus argument?\n6. How do you test language acquisition?\n\nAnswer: Overgeneralization of past tense rule. Shows rule-based learning. Critical period suggests limited time window. Children learn through exposure and innate mechanisms. Poverty of stimulus argues input is insufficient. Testing uses production and comprehension tasks."
    }
  },
  HARD: {
    "generative_grammar": {
      title: "Generative Grammar and Universal Grammar",
      description: "Apply generative grammar to linguistic analysis",
      problemStatement: "Analyze these sentences using generative grammar:\n\n1. 'What did John say that Mary bought?'\n2. 'John seems to be happy'\n3. 'The man who I saw yesterday left'\n\n1. Draw the deep structure and surface structure\n2. What transformations are involved?\n3. How do you handle movement constraints?\n4. What is the difference between competence and performance?\n5. How do you account for cross-linguistic variation?\n6. What is the minimalist program?\n\nAnswer: Deep structure shows underlying relationships, surface structure shows final form. Transformations include wh-movement, raising, relative clause formation. Movement constraints include subjacency, empty category principle. Competence is knowledge, performance is use. Variation comes from parameter setting. Minimalist program seeks to minimize theoretical apparatus."
    },
    "computational_linguistics": {
      title: "Natural Language Processing",
      description: "Apply computational methods to linguistic problems",
      problemStatement: "Design a natural language processing system for machine translation:\n\n1. What are the main challenges in MT?\n2. How do you handle word alignment?\n3. What is the role of syntax in MT?\n4. How do you evaluate translation quality?\n5. What are the differences between rule-based and statistical MT?\n6. How do you handle low-resource languages?\n\nAnswer: Challenges include ambiguity, cultural differences, idiomatic expressions. Word alignment uses statistical models. Syntax helps with word order and agreement. Evaluation uses BLEU, human judgments. Rule-based uses linguistic rules, statistical uses data. Low-resource languages need transfer learning, unsupervised methods."
    },
    "neurolinguistics": {
      title: "Language and the Brain",
      description: "Understand the neural basis of language",
      problemStatement: "A patient with Broca's aphasia can understand language but has difficulty speaking:\n\n1. What brain regions are involved in language?\n2. What is the difference between Broca's and Wernicke's aphasia?\n3. How do you study language in the brain?\n4. What is the role of the corpus callosum?\n5. How do you account for language recovery?\n6. What are the implications for language evolution?\n\nAnswer: Broca's area (production), Wernicke's area (comprehension), arcuate fasciculus (connection). Broca's affects production, Wernicke's affects comprehension. Study methods include fMRI, EEG, lesion studies. Corpus callosum connects hemispheres. Recovery involves plasticity and reorganization. Language evolution may involve gesture, vocalization, and social cooperation."
    }
  }
};
