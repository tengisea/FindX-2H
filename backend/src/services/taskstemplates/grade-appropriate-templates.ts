import { TopicTemplates } from './index';
import { ClassType as GraphQLClassType, Topic as GraphQLTopic } from "@/types/generated";

// Simple grade-appropriate templates for allowed topics only
export const gradeAppropriateTemplates: Record<string, Record<string, TopicTemplates>> = {
  // Grades 1-3: Basic concepts
  'GRADE_1_3': {
    'math': {
      EASY: {
        'counting-apples': {
          title: 'Counting Apples',
          description: 'Count the apples in the basket',
          problemStatement: `Sarah has a basket with apples. Count how many apples she has.

Sarah's basket has 5 red apples and 3 green apples.

How many apples does Sarah have in total?

Write your answer as a number.`
        }
      },
      MEDIUM: {
        'sharing-cookies': {
          title: 'Sharing Cookies',
          description: 'Share cookies and count what\'s left',
          problemStatement: `Emma has 8 cookies. She gives 3 cookies to her friend.

How many cookies does Emma have left?

Write your answer as a number.`
        }
      },
      HARD: {
        'birthday-party': {
          title: 'The Birthday Party',
          description: 'Solve a multi-step counting problem',
          problemStatement: `At the birthday party, there are 10 balloons. 2 balloons pop, and then 4 new balloons are added.

How many balloons are there now?

Write your answer as a number.`
        }
      }
    },
    'english': {
      EASY: {
        'alphabet-recognition': {
          title: 'Alphabet Recognition',
          description: 'Identify letters of the alphabet',
          problemStatement: `What letter comes after 'A' in the alphabet?

Write your answer as a single letter.`
        }
      },
      MEDIUM: {
        'word-rhyming': {
          title: 'Word Rhyming',
          description: 'Find words that rhyme',
          problemStatement: `Which word rhymes with 'cat'?

A) dog
B) bat
C) fish
D) bird

Write your answer as the letter (A, B, C, or D).`
        }
      },
      HARD: {
        'simple-sentence': {
          title: 'Simple Sentence',
          description: 'Complete a simple sentence',
          problemStatement: `Complete this sentence: "The sun is _____."

Write your answer as a single word.`
        }
      }
    }
  },

  // Grades 4-5: Intermediate concepts
  'GRADE_4_5': {
    'math': {
      EASY: {
        'multiplication': {
          title: 'Multiplication Practice',
          description: 'Multiply two numbers',
          problemStatement: `What is 6 × 4?

Write your answer as a number.`
        }
      },
      MEDIUM: {
        'division': {
          title: 'Sharing Equally',
          description: 'Divide items equally',
          problemStatement: `Lisa has 12 stickers and wants to share them equally among 3 friends.

How many stickers does each friend get?

Write your answer as a number.`
        }
      },
      HARD: {
        'word-problem': {
          title: 'The School Store',
          description: 'Solve a complex word problem',
          problemStatement: `A notebook costs $4 and a pen costs $2. If you buy 3 notebooks and 2 pens, how much do you spend in total?

Write your answer as a number.`
        }
      }
    },
    'english': {
      EASY: {
        'grammar-basics': {
          title: 'Grammar Basics',
          description: 'Identify parts of speech',
          problemStatement: `In the sentence "The cat runs quickly," what part of speech is "quickly"?

A) noun
B) verb
C) adjective
D) adverb

Write your answer as the letter (A, B, C, or D).`
        }
      },
      MEDIUM: {
        'reading-comprehension': {
          title: 'Reading Comprehension',
          description: 'Answer questions about a story',
          problemStatement: `Read this sentence: "The brave knight saved the princess from the dragon."

Who did the knight save?

Write your answer as a single word.`
        }
      },
      HARD: {
        'creative-writing': {
          title: 'Creative Writing',
          description: 'Complete a story',
          problemStatement: `Complete this story: "Once upon a time, there was a magical..."

Write your answer as a short phrase (2-3 words).`
        }
      }
    }
  },

  // Grades 6-8: Pre-algebra and advanced concepts
  'GRADE_6_8': {
    'math': {
      EASY: {
        'algebra-basics': {
          title: 'Simple Equations',
          description: 'Solve for x in simple equations',
          problemStatement: `Solve for x: x + 5 = 12

What is the value of x?

Write your answer as a number.`
        }
      },
      MEDIUM: {
        'geometry': {
          title: 'Rectangle Perimeter',
          description: 'Calculate the perimeter of a rectangle',
          problemStatement: `A rectangle has a length of 8 cm and a width of 5 cm.

What is the perimeter of the rectangle?

Write your answer as a number.`
        }
      },
      HARD: {
        'age-problems': {
          title: 'Age Problems',
          description: 'Solve age-related algebra problems',
          problemStatement: `Sarah is 3 years older than her brother. If Sarah is 15 years old, how old is her brother?

Write your answer as a number.`
        }
      }
    },
    'english': {
      EASY: {
        'literature-analysis': {
          title: 'Literature Analysis',
          description: 'Analyze literary elements',
          problemStatement: `What is the main theme of a story about a character who overcomes their fears?

A) friendship
B) courage
C) adventure
D) mystery

Write your answer as the letter (A, B, C, or D).`
        }
      },
      MEDIUM: {
        'poetry-devices': {
          title: 'Poetry Devices',
          description: 'Identify poetic devices',
          problemStatement: `In the line "The stars danced playfully in the moonlit sky," what literary device is used?

Write your answer as a single word.`
        }
      },
      HARD: {
        'essay-writing': {
          title: 'Essay Writing',
          description: 'Structure an argument',
          problemStatement: `What should be included in the introduction paragraph of an argumentative essay?

Write your answer as a short phrase (2-3 words).`
        }
      }
    },
    'biology': {
      EASY: {
        'cell-basics': {
          title: 'Cell Basics',
          description: 'Identify basic cell parts',
          problemStatement: `What is the control center of a cell called?

A) cytoplasm
B) nucleus
C) cell wall
D) membrane

Write your answer as the letter (A, B, C, or D).`
        }
      },
      MEDIUM: {
        'ecosystem': {
          title: 'Ecosystem',
          description: 'Understand ecosystem relationships',
          problemStatement: `In a food chain, what do plants represent?

Write your answer as a single word.`
        }
      },
      HARD: {
        'genetics': {
          title: 'Basic Genetics',
          description: 'Understand basic genetic concepts',
          problemStatement: `If both parents have brown eyes (dominant trait), what is the probability their child will have brown eyes?

Write your answer as a percentage (e.g., "75%").`
        }
      }
    },
    'physics': {
      EASY: {
        'motion-basics': {
          title: 'Motion Basics',
          description: 'Understand basic motion concepts',
          problemStatement: `What happens to the speed of a ball when it rolls down a hill?

A) increases
B) decreases
C) stays the same
D) stops

Write your answer as the letter (A, B, C, or D).`
        }
      },
      MEDIUM: {
        'force-gravity': {
          title: 'Force and Gravity',
          description: 'Understand force and gravity',
          problemStatement: `What force pulls objects toward the center of the Earth?

Write your answer as a single word.`
        }
      },
      HARD: {
        'energy-transformation': {
          title: 'Energy Transformation',
          description: 'Understand energy changes',
          problemStatement: `When you turn on a light bulb, electrical energy is transformed into what type of energy?

Write your answer as a single word.`
        }
      }
    },
    'chemistry': {
      EASY: {
        'states-matter': {
          title: 'States of Matter',
          description: 'Identify states of matter',
          problemStatement: `What state of matter has a definite shape and volume?

A) solid
B) liquid
C) gas
D) plasma

Write your answer as the letter (A, B, C, or D).`
        }
      },
      MEDIUM: {
        'elements-compounds': {
          title: 'Elements and Compounds',
          description: 'Distinguish elements from compounds',
          problemStatement: `Is water (H2O) an element or a compound?

Write your answer as a single word.`
        }
      },
      HARD: {
        'chemical-reactions': {
          title: 'Chemical Reactions',
          description: 'Understand chemical changes',
          problemStatement: `When iron rusts, what type of change occurs?

A) physical change
B) chemical change
C) no change
D) reversible change

Write your answer as the letter (A, B, C, or D).`
        }
      }
    },
    'history': {
      EASY: {
        'ancient-civilizations': {
          title: 'Ancient Civilizations',
          description: 'Identify ancient civilizations',
          problemStatement: `Which ancient civilization built the pyramids?

A) Greeks
B) Romans
C) Egyptians
D) Chinese

Write your answer as the letter (A, B, C, or D).`
        }
      },
      MEDIUM: {
        'historical-periods': {
          title: 'Historical Periods',
          description: 'Understand historical time periods',
          problemStatement: `What period came after the Middle Ages in Europe?

Write your answer as a single word.`
        }
      },
      HARD: {
        'historical-analysis': {
          title: 'Historical Analysis',
          description: 'Analyze historical events',
          problemStatement: `What was a major cause of World War I?

Write your answer as a short phrase (2-3 words).`
        }
      }
    },
    'linguistics': {
      EASY: {
        'language-families': {
          title: 'Language Families',
          description: 'Identify language families',
          problemStatement: `Which language family does English belong to?

A) Romance
B) Germanic
C) Slavic
D) Celtic

Write your answer as the letter (A, B, C, or D).`
        }
      },
      MEDIUM: {
        'phonetics': {
          title: 'Phonetics',
          description: 'Understand sound systems',
          problemStatement: `How many vowels are in the English alphabet?

Write your answer as a number.`
        }
      },
      HARD: {
        'syntax': {
          title: 'Syntax',
          description: 'Understand sentence structure',
          problemStatement: `In the sentence "The cat sat on the mat," what is the subject?

Write your answer as a single word.`
        }
      }
    }
  },

  // Grades 9-12: Advanced concepts (can use original templates)
  'GRADE_9_12': {
    'math': {
      EASY: {
        'factorial': {
          title: 'Factorial Calculation',
          description: 'Calculate factorial of a number',
          problemStatement: `Calculate the factorial of a given number.

Input Format:
Single line: n (number)

Output Format:
Single integer representing n!

Example:
Input:
5
Output:
120

Constraints:
0 ≤ n ≤ 20`
        }
      },
      MEDIUM: {
        'modular-exponentiation': {
          title: 'Modular Exponentiation',
          description: 'Calculate (base^exponent) mod m efficiently',
          problemStatement: `Calculate (base^exponent) mod m using fast modular exponentiation.

Input Format:
Single line: base exponent m

Output Format:
Single integer representing (base^exponent) mod m

Example:
Input:
2 10 1000
Output:
24

Constraints:
1 ≤ base, exponent, m ≤ 10^9`
        }
      },
      HARD: {
        'complex-algorithm': {
          title: 'Complex Algorithm',
          description: 'Solve a complex algorithmic problem',
          problemStatement: `This is a complex problem suitable for high school students.

[Complex problem statement here]`
        }
      }
    },
    'english': {
      EASY: {
        'advanced-literature': {
          title: 'Advanced Literature',
          description: 'Analyze complex literary works',
          problemStatement: `Analyze the symbolism in Shakespeare's works.

[Advanced literature question here]`
        }
      },
      MEDIUM: {
        'advanced-writing': {
          title: 'Advanced Writing',
          description: 'Write complex essays and analysis',
          problemStatement: `Write a thesis statement for an argumentative essay.

[Advanced writing prompt here]`
        }
      },
      HARD: {
        'critical-analysis': {
          title: 'Critical Analysis',
          description: 'Perform critical analysis of texts',
          problemStatement: `Perform a critical analysis of a literary text.

[Critical analysis prompt here]`
        }
      }
    },
    'biology': {
      EASY: {
        'advanced-biology': {
          title: 'Advanced Biology',
          description: 'Study advanced biological concepts',
          problemStatement: `[Advanced biology question here]`
        }
      },
      MEDIUM: {
        'molecular-biology': {
          title: 'Molecular Biology',
          description: 'Understand molecular processes',
          problemStatement: `[Molecular biology question here]`
        }
      },
      HARD: {
        'evolution': {
          title: 'Evolution',
          description: 'Study evolutionary biology',
          problemStatement: `[Evolution question here]`
        }
      }
    },
    'physics': {
      EASY: {
        'advanced-physics': {
          title: 'Advanced Physics',
          description: 'Study advanced physics concepts',
          problemStatement: `[Advanced physics question here]`
        }
      },
      MEDIUM: {
        'quantum-physics': {
          title: 'Quantum Physics',
          description: 'Understand quantum mechanics',
          problemStatement: `[Quantum physics question here]`
        }
      },
      HARD: {
        'relativity': {
          title: 'Relativity',
          description: 'Study Einstein\'s theories',
          problemStatement: `[Relativity question here]`
        }
      }
    },
    'chemistry': {
      EASY: {
        'advanced-chemistry': {
          title: 'Advanced Chemistry',
          description: 'Study advanced chemistry concepts',
          problemStatement: `[Advanced chemistry question here]`
        }
      },
      MEDIUM: {
        'organic-chemistry': {
          title: 'Organic Chemistry',
          description: 'Study organic compounds',
          problemStatement: `[Organic chemistry question here]`
        }
      },
      HARD: {
        'physical-chemistry': {
          title: 'Physical Chemistry',
          description: 'Study chemical physics',
          problemStatement: `[Physical chemistry question here]`
        }
      }
    },
    'history': {
      EASY: {
        'advanced-history': {
          title: 'Advanced History',
          description: 'Study advanced historical concepts',
          problemStatement: `[Advanced history question here]`
        }
      },
      MEDIUM: {
        'historical-analysis': {
          title: 'Historical Analysis',
          description: 'Analyze historical events',
          problemStatement: `[Historical analysis question here]`
        }
      },
      HARD: {
        'historiography': {
          title: 'Historiography',
          description: 'Study historical methodology',
          problemStatement: `[Historiography question here]`
        }
      }
    },
    'linguistics': {
      EASY: {
        'advanced-linguistics': {
          title: 'Advanced Linguistics',
          description: 'Study advanced linguistic concepts',
          problemStatement: `[Advanced linguistics question here]`
        }
      },
      MEDIUM: {
        'phonology': {
          title: 'Phonology',
          description: 'Study sound patterns',
          problemStatement: `[Phonology question here]`
        }
      },
      HARD: {
        'syntax-semantics': {
          title: 'Syntax and Semantics',
          description: 'Study language structure and meaning',
          problemStatement: `[Syntax and semantics question here]`
        }
      }
    }
  }
};

export const getGradeAppropriateTemplate = (
  topic: string, 
  difficulty: string, 
  classType: GraphQLClassType
): any => {
  const gradeNumber = getGradeNumber(classType);
  
  // Determine grade range
  let gradeRange: string;
  if (gradeNumber <= 3) {
    gradeRange = 'GRADE_1_3';
  } else if (gradeNumber <= 5) {
    gradeRange = 'GRADE_4_5';
  } else if (gradeNumber <= 8) {
    gradeRange = 'GRADE_6_8';
  } else {
    gradeRange = 'GRADE_9_12';
  }

  // Get templates for this grade range and topic
  const templates = gradeAppropriateTemplates[gradeRange]?.[topic];
  
  if (!templates || !templates[difficulty]) {
    // Fallback to easy templates for the grade range and topic
    const fallbackTemplates = templates?.EASY || gradeAppropriateTemplates['GRADE_1_3']['math']?.EASY;
    if (!fallbackTemplates) {
      // Ultimate fallback
      return {
        title: 'Basic Problem',
        description: 'A basic problem for your grade level',
        problemStatement: 'This is a basic problem appropriate for your grade level. Write your answer below.'
      };
    }
    const fallbackKeys = Object.keys(fallbackTemplates);
    const randomKey = fallbackKeys[Math.floor(Math.random() * fallbackKeys.length)];
    return fallbackTemplates[randomKey];
  }

  // Get all available templates for this difficulty
  const availableTemplates = Object.values(templates[difficulty]);
  
  // Return a random template
  const randomIndex = Math.floor(Math.random() * availableTemplates.length);
  return availableTemplates[randomIndex];
};

const getGradeNumber = (classType: GraphQLClassType): number => {
  switch (classType) {
    case GraphQLClassType.Grade_1: return 1;
    case GraphQLClassType.Grade_2: return 2;
    case GraphQLClassType.Grade_3: return 3;
    case GraphQLClassType.Grade_4: return 4;
    case GraphQLClassType.Grade_5: return 5;
    case GraphQLClassType.Grade_6: return 6;
    case GraphQLClassType.Grade_7: return 7;
    case GraphQLClassType.Grade_8: return 8;
    case GraphQLClassType.Grade_9: return 9;
    case GraphQLClassType.Grade_10: return 10;
    case GraphQLClassType.Grade_11: return 11;
    case GraphQLClassType.Grade_12: return 12;
    default: return 5;
  }
};
