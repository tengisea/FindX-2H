export const biologyTemplates = {
  EASY: {
    "cell_structure": {
      title: "Cell Organelle Identification",
      description: "Identify and describe cell organelles",
      problemStatement: "Identify the following cell organelles and describe their functions:\n\n1. Mitochondria\n2. Nucleus\n3. Ribosomes\n4. Endoplasmic Reticulum\n5. Golgi Apparatus\n\nAnswers:\n1. Mitochondria - Powerhouse of the cell, produces ATP\n2. Nucleus - Contains genetic material, controls cell activities\n3. Ribosomes - Site of protein synthesis\n4. ER - Protein and lipid synthesis, transport\n5. Golgi - Modifies, packages, and ships proteins"
    },
    "dna_basics": {
      title: "DNA Structure and Replication",
      description: "Understand basic DNA structure and replication",
      problemStatement: "Given the DNA sequence: 5'-ATGCGATCG-3'\n\n1. Write the complementary strand\n2. Identify the base pairs\n3. Explain the direction of DNA synthesis\n4. What enzyme is responsible for DNA replication?\n\nAnswers:\n1. 3'-TACGCTAGC-5'\n2. A-T, T-A, G-C, C-G\n3. 5' to 3' direction\n4. DNA polymerase"
    },
    "photosynthesis": {
      title: "Photosynthesis Process",
      description: "Understand the process of photosynthesis",
      problemStatement: "Write the overall equation for photosynthesis and identify:\n\n1. The reactants and products\n2. Where photosynthesis occurs in plants\n3. The two main stages of photosynthesis\n4. What gas is released as a byproduct?\n\nAnswers:\n1. 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n2. Chloroplasts (specifically thylakoids)\n3. Light-dependent reactions and Calvin cycle\n4. Oxygen (O₂)"
    }
  },
  MEDIUM: {
    "genetics": {
      title: "Mendelian Genetics Problem",
      description: "Solve a Punnett square genetics problem",
      problemStatement: "In pea plants, tall (T) is dominant over short (t), and yellow seeds (Y) are dominant over green seeds (y).\n\nA heterozygous tall, yellow-seeded plant (TtYy) is crossed with a short, green-seeded plant (ttyy).\n\n1. Create a Punnett square for this cross\n2. What are the genotypic ratios?\n3. What are the phenotypic ratios?\n4. What is the probability of getting a tall, green-seeded plant?\n\nAnswers:\n1. Punnett square shows 4 possible combinations\n2. Genotypic ratio: 1:1:1:1 (TtYy:Ttyy:ttYy:ttyy)\n3. Phenotypic ratio: 1:1:1:1 (tall yellow:tall green:short yellow:short green)\n4. 25% (1/4)"
    },
    "ecosystem": {
      title: "Ecosystem Energy Flow",
      description: "Analyze energy flow in an ecosystem",
      problemStatement: "In a grassland ecosystem:\n- Primary producers: 10,000 kcal/m²/year\n- Primary consumers: 1,000 kcal/m²/year\n- Secondary consumers: 100 kcal/m²/year\n- Tertiary consumers: 10 kcal/m²/year\n\n1. Calculate the efficiency of energy transfer between each trophic level\n2. Why is energy transfer inefficient?\n3. What happens to the 'lost' energy?\n4. Draw an energy pyramid\n\nAnswers:\n1. 10% efficiency at each level\n2. Energy is lost as heat, used for metabolism, not all biomass is consumed\n3. Lost as heat during cellular respiration\n4. Pyramid shows decreasing energy at each level"
    },
    "evolution": {
      title: "Natural Selection and Evolution",
      description: "Apply concepts of natural selection",
      problemStatement: "A population of beetles has two color variants: green and brown. In a forest environment:\n- Green beetles are better camouflaged\n- Predators eat 60% of brown beetles but only 20% of green beetles\n- Each beetle produces 4 offspring on average\n\n1. Which variant has higher fitness?\n2. Predict the change in allele frequency over time\n3. What type of selection is this?\n4. How might the environment change to favor brown beetles?\n\nAnswers:\n1. Green beetles (higher survival rate)\n2. Green allele frequency will increase\n3. Directional selection\n4. If forest becomes brown/autumn colored, brown beetles would be favored"
    }
  },
  HARD: {
    "molecular_biology": {
      title: "Gene Expression Regulation",
      description: "Understand complex gene regulation mechanisms",
      problemStatement: "In E. coli, the lac operon controls lactose metabolism:\n\nGiven:\n- lacI gene produces repressor protein\n- lacZ, lacY, lacA are structural genes\n- Lactose acts as an inducer\n- Glucose presence inhibits cAMP production\n\n1. Explain how the lac operon works in the presence of lactose but absence of glucose\n2. What happens when both lactose and glucose are present?\n3. How does cAMP-CAP complex affect transcription?\n4. Draw a diagram showing the regulation\n\nAnswer: In presence of lactose (no glucose), lactose binds repressor, cAMP-CAP complex binds promoter, transcription occurs. With both present, glucose reduces cAMP, less CAP binding, reduced transcription."
    },
    "immunology": {
      title: "Immune System Response",
      description: "Analyze complex immune system interactions",
      problemStatement: "A patient is infected with a new strain of influenza virus:\n\n1. Describe the innate immune response (first 0-4 hours)\n2. Explain the adaptive immune response (4+ hours)\n3. How do memory cells provide long-term protection?\n4. Why might this patient be susceptible to a different influenza strain?\n5. What role do cytokines play in the immune response?\n\nAnswer: Innate response includes physical barriers, NK cells, complement system. Adaptive response involves B-cells (antibodies) and T-cells (cell-mediated). Memory cells provide rapid response to re-infection. Different strains have different antigens, requiring new immune response. Cytokines coordinate immune cell communication and response."
    },
    "biotechnology": {
      title: "CRISPR-Cas9 Gene Editing",
      description: "Apply modern biotechnology techniques",
      problemStatement: "You want to use CRISPR-Cas9 to edit a gene in human cells:\n\n1. Design a guide RNA sequence for the target gene\n2. Explain how Cas9 creates double-strand breaks\n3. What are the two main repair mechanisms?\n4. How would you verify successful editing?\n5. What are potential off-target effects and how to minimize them?\n\nAnswer: Guide RNA targets specific DNA sequence. Cas9 creates DSBs at target site. NHEJ (non-homologous end joining) or HDR (homology-directed repair) repair the break. Verification by sequencing, PCR, or functional assays. Off-target effects minimized by careful guide design and using high-fidelity Cas9 variants."
    }
  }
};
