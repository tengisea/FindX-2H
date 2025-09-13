export const philosophyTemplates = {
  EASY: {
    "logic_basics": {
      title: "Basic Logical Reasoning",
      description: "Understand basic logical concepts and fallacies",
      problemStatement: "Identify the logical fallacy in each argument:\n\n1. 'All birds can fly. Penguins are birds. Therefore, penguins can fly.'\n2. 'You can't prove that God doesn't exist, so God must exist.'\n3. 'Everyone is doing it, so it must be right.'\n4. 'If you don't support the war, you don't support our troops.'\n5. 'The weather is bad because I forgot my umbrella.'\n\nIdentify the fallacy type and explain why it's invalid.\n\nAnswers:\n1. False premise (not all birds can fly)\n2. Argument from ignorance\n3. Bandwagon fallacy\n4. False dilemma\n5. Post hoc fallacy"
    },
    "ethics_introduction": {
      title: "Introduction to Ethics",
      description: "Understand basic ethical theories and concepts",
      problemStatement: "Analyze this ethical dilemma:\n\nA doctor has five patients who will die without organ transplants, and one healthy patient who could provide all needed organs. Should the doctor kill the healthy patient to save the five?\n\n1. What would a utilitarian say?\n2. What would a deontologist say?\n3. What would a virtue ethicist say?\n4. What are the key differences between these approaches?\n5. What other factors should be considered?\n\nAnswers:\n1. Utilitarian: Kill one to save five (greatest good)\n2. Deontologist: Never kill innocent person (duty-based)\n3. Virtue ethicist: Focus on character and practical wisdom\n4. Utilitarian: consequences, Deontologist: rules, Virtue: character\n5. Legal, medical, psychological factors"
    },
    "epistemology_basics": {
      title: "Knowledge and Truth",
      description: "Understand basic concepts of knowledge and truth",
      problemStatement: "Answer these questions about knowledge:\n\n1. What is the difference between knowledge and belief?\n2. What is the traditional definition of knowledge?\n3. What is the Gettier problem?\n4. What is the difference between a priori and a posteriori knowledge?\n5. What is skepticism?\n\nAnswers:\n1. Knowledge requires justification, belief doesn't\n2. Justified true belief\n3. Cases where you have justified true belief but not knowledge\n4. A priori: independent of experience, A posteriori: based on experience\n5. Doubt about the possibility of knowledge"
    }
  },
  MEDIUM: {
    "metaphysics": {
      title: "Metaphysics and Reality",
      description: "Explore fundamental questions about reality",
      problemStatement: "Analyze these metaphysical questions:\n\n1. What is the nature of time? Is it real or an illusion?\n2. What is the relationship between mind and body?\n3. Do abstract objects (numbers, concepts) exist?\n4. What is personal identity? What makes you the same person over time?\n5. What is the nature of causation?\n\nFor each question, provide:\n- Different philosophical positions\n- Arguments for each position\n- Potential objections\n- Your own analysis\n\nAnswer: Time could be real (A-theory) or illusion (B-theory). Mind-body: dualism, materialism, idealism. Abstract objects: platonism vs nominalism. Personal identity: psychological continuity, physical continuity, soul theory. Causation: regularity, counterfactual, or power theories."
    },
    "political_philosophy": {
      title: "Political Philosophy and Justice",
      description: "Analyze political theories and concepts of justice",
      problemStatement: "Design a just society considering these questions:\n\n1. What is the role of government?\n2. How should resources be distributed?\n3. What rights should individuals have?\n4. How should conflicts between individual and collective good be resolved?\n5. What is the relationship between liberty and equality?\n\nConsider these theories:\n- Social contract theory\n- Utilitarianism\n- Rawls' theory of justice\n- Libertarianism\n- Communitarianism\n\nAnswer: Government protects rights and promotes welfare. Resources distributed according to desert, need, or equality. Rights include life, liberty, property, but limits exist. Conflicts resolved through democratic process and constitutional principles. Liberty and equality can conflict but both are important values."
    },
    "philosophy_of_mind": {
      title: "Consciousness and the Mind",
      description: "Explore questions about consciousness and mental states",
      problemStatement: "Analyze the hard problem of consciousness:\n\n1. What is the hard problem of consciousness?\n2. What is the difference between easy and hard problems?\n3. What are the main theories of consciousness?\n4. What is the knowledge argument?\n5. What is the zombie argument?\n6. How do you explain qualia?\n\nAnswer: Hard problem: why and how physical processes give rise to subjective experience. Easy problems: cognitive functions, hard problem: subjective experience. Theories: dualism, materialism, panpsychism, integrated information theory. Knowledge argument: physical knowledge insufficient for phenomenal knowledge. Zombie argument: conceivable but impossible. Qualia: subjective qualities of experience."
    }
  },
  HARD: {
    "philosophy_of_language": {
      title: "Language, Meaning, and Reference",
      description: "Analyze complex issues in philosophy of language",
      problemStatement: "Analyze these puzzles in philosophy of language:\n\n1. What is the meaning of 'meaning'?\n2. How do proper names refer?\n3. What is the difference between sense and reference?\n4. How do you handle empty names?\n5. What is the problem of propositional attitudes?\n6. How do you account for context sensitivity?\n\nConsider these theories:\n- Fregean sense and reference\n- Russell's theory of descriptions\n- Kripke's causal theory of reference\n- Davidson's truth-conditional semantics\n- Grice's theory of meaning\n\nAnswer: Meaning could be reference, sense, use, or truth conditions. Names refer through causal chains or descriptions. Sense is meaning, reference is what it points to. Empty names refer to nothing or have no reference. Propositional attitudes require possible worlds or mental representations. Context sensitivity requires pragmatic enrichment."
    },
    "philosophy_of_science": {
      title: "Scientific Method and Knowledge",
      description: "Analyze the nature of scientific knowledge and method",
      problemStatement: "Analyze the problem of induction and scientific realism:\n\n1. What is the problem of induction?\n2. How do you justify scientific inference?\n3. What is the difference between realism and anti-realism?\n4. What is the underdetermination problem?\n5. How do you account for scientific change?\n6. What is the role of observation in science?\n\nConsider these approaches:\n- Popper's falsificationism\n- Kuhn's paradigm theory\n- Lakatos's research programs\n- Bayesian confirmation theory\n- Inference to the best explanation\n\nAnswer: Problem of induction: past doesn't guarantee future. Justification through probability, falsification, or best explanation. Realism: theories describe reality, anti-realism: theories are tools. Underdetermination: multiple theories fit data. Scientific change through paradigm shifts or progressive research programs. Observation theory-laden but still important."
    },
    "philosophy_of_mathematics": {
      title: "Mathematical Knowledge and Reality",
      description: "Explore the nature of mathematical knowledge",
      problemStatement: "Analyze the nature of mathematical truth:\n\n1. Do mathematical objects exist independently of minds?\n2. How do we know mathematical truths?\n3. What is the relationship between mathematics and logic?\n4. How do you account for mathematical intuition?\n5. What is the role of proof in mathematics?\n6. How do you handle mathematical disagreement?\n\nConsider these positions:\n- Platonism: mathematical objects exist independently\n- Formalism: mathematics is symbol manipulation\n- Intuitionism: mathematics is mental construction\n- Fictionalism: mathematical statements are false but useful\n- Structuralism: mathematics studies structures\n\nAnswer: Platonism: objects exist independently, known through intuition. Formalism: symbols manipulated according to rules. Intuitionism: constructed through mental processes. Fictionalism: useful fictions. Structuralism: studies abstract structures. Proof provides certainty but intuition guides discovery."
    }
  }
};
