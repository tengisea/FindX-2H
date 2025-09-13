export const astronomyTemplates = {
  EASY: {
    "solar_system": {
      title: "Solar System Basics",
      description: "Identify and understand solar system components",
      problemStatement: "Answer the following questions about our solar system:\n\n1. What is the order of planets from the Sun?\n2. Which planet is closest to the Sun?\n3. Which planet is the largest?\n4. What is the asteroid belt?\n5. Name the four gas giants\n\nAnswers:\n1. Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune\n2. Mercury\n3. Jupiter\n4. Region between Mars and Jupiter containing many asteroids\n5. Jupiter, Saturn, Uranus, Neptune"
    },
    "constellations": {
      title: "Constellation Identification",
      description: "Learn about major constellations and their significance",
      problemStatement: "Identify these constellations and their brightest stars:\n\n1. The Big Dipper (part of which constellation?)\n2. Orion's brightest star\n3. The North Star (Polaris) is in which constellation?\n4. What is the zodiac?\n5. Name three constellations visible in winter\n\nAnswers:\n1. Ursa Major (Big Bear)\n2. Betelgeuse\n3. Ursa Minor (Little Bear)\n4. 12 constellations along the ecliptic path\n5. Orion, Taurus, Gemini, Canis Major, etc."
    },
    "moon_phases": {
      title: "Lunar Phases and Eclipses",
      description: "Understand moon phases and eclipse phenomena",
      problemStatement: "Explain the following:\n\n1. What causes the phases of the Moon?\n2. How long does it take for the Moon to complete one cycle of phases?\n3. What is the difference between a solar and lunar eclipse?\n4. Why don't we have eclipses every month?\n5. What phase of the Moon is needed for a solar eclipse?\n\nAnswers:\n1. Relative positions of Earth, Moon, and Sun\n2. 29.5 days (synodic month)\n3. Solar: Moon blocks Sun; Lunar: Earth blocks Sun from Moon\n4. Moon's orbit is tilted 5° relative to Earth's orbit\n5. New Moon phase"
    }
  },
  MEDIUM: {
    "stellar_evolution": {
      title: "Star Life Cycle and Evolution",
      description: "Understand how stars form, evolve, and die",
      problemStatement: "Describe the life cycle of a star like our Sun:\n\n1. What is a protostar?\n2. What happens in the main sequence phase?\n3. What will happen to the Sun in about 5 billion years?\n4. What determines a star's fate?\n5. What is a white dwarf?\n6. How do massive stars end their lives?\n\nAnswers:\n1. Collapsing cloud of gas and dust\n2. Hydrogen fusion in core, stable for billions of years\n3. Become red giant, then white dwarf\n4. Mass - determines fusion rate and final state\n5. Dense core of a dead low-mass star\n6. Supernova explosion, leaving neutron star or black hole"
    },
    "galaxy_classification": {
      title: "Galaxy Types and Properties",
      description: "Classify and analyze different galaxy types",
      problemStatement: "Classify these galaxies and explain their characteristics:\n\n1. Spiral galaxy with prominent central bulge\n2. Galaxy with no spiral structure, elliptical shape\n3. Galaxy with irregular, chaotic appearance\n4. What is the Hubble classification system?\n5. Which type is most common in the universe?\n6. What causes the different shapes?\n\nAnswers:\n1. Sa spiral (tightly wound arms)\n2. Elliptical galaxy (E0-E7)\n3. Irregular galaxy (Irr)\n4. E0-E7, S0, Sa-Sc, SBa-SBc, Irr\n5. Elliptical galaxies\n6. Formation history, mergers, and angular momentum"
    },
    "cosmology": {
      title: "Big Bang and Universe Expansion",
      description: "Understand cosmological theories and evidence",
      problemStatement: "Explain the evidence for the Big Bang theory:\n\n1. What is cosmic microwave background radiation?\n2. What does Hubble's law tell us?\n3. What is the age of the universe?\n4. What is dark energy?\n5. What is the fate of the universe?\n6. What is inflation theory?\n\nAnswers:\n1. Remnant radiation from early universe (2.7K)\n2. Universe is expanding, more distant galaxies recede faster\n3. ~13.8 billion years\n4. Mysterious force causing accelerated expansion\n5. Depends on dark energy - continued expansion or contraction\n6. Rapid exponential expansion in first fraction of second"
    }
  },
  HARD: {
    "general_relativity": {
      title: "General Relativity in Astrophysics",
      description: "Apply general relativity to astronomical phenomena",
      problemStatement: "A black hole has a mass of 10 solar masses:\n\n1. Calculate the Schwarzschild radius\n2. What happens to time near the event horizon?\n3. Explain gravitational lensing\n4. What is the Penrose process?\n5. How do gravitational waves form?\n6. What is the information paradox?\n\nGiven: Schwarzschild radius = 2GM/c²\n\nAnswers:\n1. Rs = 30 km\n2. Time dilation - time slows down\n3. Light bends around massive objects\n4. Energy extraction from rotating black holes\n5. Accelerating masses create ripples in spacetime\n6. Information loss when matter falls into black holes"
    },
    "quantum_cosmology": {
      title: "Quantum Effects in Early Universe",
      description: "Apply quantum mechanics to cosmological problems",
      problemStatement: "In the very early universe (Planck era):\n\n1. What is the Planck time and length?\n2. How does quantum gravity affect spacetime?\n3. What is the multiverse theory?\n4. Explain string theory's role in cosmology\n5. What is the anthropic principle?\n6. How might quantum fluctuations create structure?\n\nAnswers:\n1. tp = 5.4×10⁻⁴⁴s, lp = 1.6×10⁻³⁵m\n2. Spacetime becomes quantized and fluctuating\n3. Multiple universes with different physical constants\n4. Unified theory including gravity and quantum mechanics\n5. Universe must allow for observers to exist\n6. Quantum fluctuations amplified by inflation"
    },
    "exoplanet_detection": {
      title: "Exoplanet Detection and Analysis",
      description: "Analyze methods for detecting and characterizing exoplanets",
      problemStatement: "Design an exoplanet detection mission:\n\n1. Compare transit and radial velocity methods\n2. What is the habitable zone?\n3. How do you determine atmospheric composition?\n4. What is the significance of the Drake equation?\n5. How would you detect biosignatures?\n6. What are the challenges of direct imaging?\n\nAnswer: Transit measures brightness dips, RV measures stellar wobble. Habitable zone allows liquid water. Spectroscopy reveals atmospheric gases. Drake equation estimates intelligent civilizations. Biosignatures include oxygen, methane, water. Direct imaging requires blocking starlight and advanced optics."
    }
  }
};
