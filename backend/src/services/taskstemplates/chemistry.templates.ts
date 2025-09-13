export const chemistryTemplates = {
  EASY: {
    "balancing_equations": {
      title: "Chemical Equation Balancing",
      description: "Balance the given chemical equation",
      problemStatement: "Balance the following chemical equation:\n\nH₂ + O₂ → H₂O\n\nInstructions:\n- Write the balanced equation\n- Show your work step by step\n- Ensure all atoms are conserved\n\nAnswer: 2H₂ + O₂ → 2H₂O"
    },
    "molar_mass": {
      title: "Molar Mass Calculation",
      description: "Calculate the molar mass of a compound",
      problemStatement: "Calculate the molar mass of glucose (C₆H₁₂O₆).\n\nGiven atomic masses:\n- C = 12.01 g/mol\n- H = 1.008 g/mol\n- O = 16.00 g/mol\n\nShow your calculation:\nMolar mass = (6 × 12.01) + (12 × 1.008) + (6 × 16.00)\nMolar mass = 72.06 + 12.096 + 96.00 = 180.156 g/mol"
    },
    "acid_base_identification": {
      title: "Acid-Base Identification",
      description: "Identify whether a substance is an acid or base",
      problemStatement: "Classify the following substances as acids or bases:\n\n1. HCl (hydrochloric acid)\n2. NaOH (sodium hydroxide)\n3. H₂SO₄ (sulfuric acid)\n4. NH₃ (ammonia)\n5. CH₃COOH (acetic acid)\n\nAnswers:\n1. Acid\n2. Base\n3. Acid\n4. Base\n5. Acid"
    }
  },
  MEDIUM: {
    "stoichiometry": {
      title: "Stoichiometry Problem",
      description: "Solve a stoichiometry problem with limiting reagent",
      problemStatement: "If 10.0 g of aluminum reacts with 15.0 g of oxygen gas, how many grams of aluminum oxide will be produced?\n\nBalanced equation: 4Al + 3O₂ → 2Al₂O₃\n\nGiven:\n- Molar mass of Al = 26.98 g/mol\n- Molar mass of O₂ = 32.00 g/mol\n- Molar mass of Al₂O₃ = 101.96 g/mol\n\nFind the limiting reagent and calculate the theoretical yield.\n\nAnswer: Al is limiting reagent, theoretical yield = 18.9 g Al₂O₃"
    },
    "ph_calculation": {
      title: "pH and pOH Calculations",
      description: "Calculate pH and pOH of solutions",
      problemStatement: "Calculate the pH and pOH of a 0.01 M solution of HCl.\n\nGiven:\n- [HCl] = 0.01 M\n- HCl is a strong acid, so [H⁺] = 0.01 M\n\nCalculate:\n1. pH = -log[H⁺]\n2. pOH = 14 - pH\n3. [OH⁻] = 10^(-pOH)\n\nAnswers:\n1. pH = 2\n2. pOH = 12\n3. [OH⁻] = 1 × 10⁻¹² M"
    },
    "gas_laws": {
      title: "Ideal Gas Law Application",
      description: "Apply the ideal gas law to solve problems",
      problemStatement: "A gas occupies 2.5 L at 25°C and 1.0 atm. What volume will it occupy at 50°C and 2.0 atm?\n\nGiven:\n- V₁ = 2.5 L\n- T₁ = 25°C = 298 K\n- P₁ = 1.0 atm\n- T₂ = 50°C = 323 K\n- P₂ = 2.0 atm\n\nUse the combined gas law: P₁V₁/T₁ = P₂V₂/T₂\n\nAnswer: V₂ = 1.35 L"
    }
  },
  HARD: {
    "thermodynamics": {
      title: "Thermodynamic Calculations",
      description: "Calculate enthalpy, entropy, and Gibbs free energy",
      problemStatement: "For the reaction: N₂(g) + 3H₂(g) → 2NH₃(g)\n\nGiven thermodynamic data at 298 K:\n- ΔH°f(NH₃) = -46.1 kJ/mol\n- ΔS°f(NH₃) = 192.3 J/mol·K\n- ΔS°f(N₂) = 191.6 J/mol·K\n- ΔS°f(H₂) = 130.7 J/mol·K\n\nCalculate:\n1. ΔH°rxn\n2. ΔS°rxn\n3. ΔG°rxn at 298 K\n4. Is the reaction spontaneous at 298 K?\n\nAnswers:\n1. ΔH°rxn = -92.2 kJ/mol\n2. ΔS°rxn = -198.7 J/mol·K\n3. ΔG°rxn = -32.9 kJ/mol\n4. Yes, spontaneous (ΔG < 0)"
    },
    "electrochemistry": {
      title: "Electrochemical Cell Calculations",
      description: "Calculate cell potential and equilibrium constants",
      problemStatement: "Consider the cell: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)\n\nGiven standard reduction potentials:\n- Zn²⁺ + 2e⁻ → Zn(s), E° = -0.76 V\n- Cu²⁺ + 2e⁻ → Cu(s), E° = +0.34 V\n\nCalculate:\n1. Standard cell potential (E°cell)\n2. Standard Gibbs free energy change (ΔG°)\n3. Equilibrium constant (K) at 298 K\n4. Cell potential when [Zn²⁺] = 0.1 M and [Cu²⁺] = 0.01 M\n\nAnswers:\n1. E°cell = 1.10 V\n2. ΔG° = -212.3 kJ/mol\n3. K = 1.6 × 10³⁷\n4. Ecell = 1.07 V"
    },
    "organic_synthesis": {
      title: "Organic Reaction Mechanism",
      description: "Propose a synthesis pathway for organic compounds",
      problemStatement: "Propose a synthesis pathway to convert benzene to p-nitrobenzoic acid.\n\nRequirements:\n1. Show all intermediate compounds\n2. Include necessary reagents and conditions\n3. Explain the mechanism for each step\n4. Consider regioselectivity and stereochemistry\n\nSynthesis pathway:\n1. Benzene → Nitrobenzene (HNO₃/H₂SO₄)\n2. Nitrobenzene → p-Nitrobenzoic acid (KMnO₄, heat)\n\nMechanism involves electrophilic aromatic substitution followed by oxidation."
    }
  }
};
