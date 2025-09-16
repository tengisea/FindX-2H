export const physicsTemplates = {
    EASY: {
        "kinematics": {
            title: "Basic Kinematics Problem",
            description: "Solve a simple motion problem",
            problemStatement: "A car accelerates from rest at 2.0 m/s² for 10 seconds.\n\nCalculate:\n1. Final velocity\n2. Distance traveled\n3. Average velocity\n\nGiven:\n- Initial velocity (u) = 0 m/s\n- Acceleration (a) = 2.0 m/s²\n- Time (t) = 10 s\n\nUse equations: v = u + at, s = ut + ½at²\n\nAnswers:\n1. v = 20 m/s\n2. s = 100 m\n3. Average velocity = 10 m/s"
        },
        "forces": {
            title: "Newton's Laws Application",
            description: "Apply Newton's laws to solve force problems",
            problemStatement: "A 5.0 kg box is pushed with a force of 20 N across a frictionless surface.\n\n1. What is the acceleration of the box?\n2. If the same force is applied to a 10 kg box, what is its acceleration?\n3. What force would be needed to accelerate the 5.0 kg box at 6.0 m/s²?\n\nUse F = ma\n\nAnswers:\n1. a = 4.0 m/s²\n2. a = 2.0 m/s²\n3. F = 30 N"
        },
        "energy": {
            title: "Energy Conservation",
            description: "Apply conservation of energy principles",
            problemStatement: "A 2.0 kg ball is dropped from a height of 10 m.\n\nCalculate:\n1. Potential energy at the top\n2. Kinetic energy just before hitting the ground\n3. Velocity just before hitting the ground\n\nGiven:\n- Mass (m) = 2.0 kg\n- Height (h) = 10 m\n- Gravitational acceleration (g) = 9.8 m/s²\n\nUse: PE = mgh, KE = ½mv², Conservation of energy\n\nAnswers:\n1. PE = 196 J\n2. KE = 196 J\n3. v = 14 m/s"
        }
    },
    MEDIUM: {
        "waves": {
            title: "Wave Properties and Interference",
            description: "Solve wave interference problems",
            problemStatement: "Two speakers are 3.0 m apart and emit sound waves of frequency 340 Hz.\n\n1. What is the wavelength of the sound?\n2. At what distance from one speaker will constructive interference occur?\n3. At what distance will destructive interference occur?\n4. If the frequency is doubled, what happens to the interference pattern?\n\nGiven:\n- Speed of sound (v) = 340 m/s\n- Frequency (f) = 340 Hz\n- Distance between speakers (d) = 3.0 m\n\nUse: λ = v/f, constructive: path difference = nλ, destructive: path difference = (n+½)λ\n\nAnswers:\n1. λ = 1.0 m\n2. At distances where path difference = nλ\n3. At distances where path difference = (n+½)λ\n4. Wavelength halves, interference pattern becomes more frequent"
        },
        "electricity": {
            title: "Electric Circuits and Ohm's Law",
            description: "Analyze electric circuits with multiple components",
            problemStatement: "In the circuit shown:\n- R₁ = 4.0 Ω\n- R₂ = 6.0 Ω\n- R₃ = 3.0 Ω\n- V = 12 V\n\nCalculate:\n1. Total resistance\n2. Total current\n3. Current through each resistor\n4. Voltage across each resistor\n5. Power dissipated by each resistor\n\nCircuit: R₁ and R₂ in parallel, then in series with R₃\n\nAnswers:\n1. R_total = 5.4 Ω\n2. I_total = 2.22 A\n3. I₁ = 1.33 A, I₂ = 0.89 A, I₃ = 2.22 A\n4. V₁ = V₂ = 5.33 V, V₃ = 6.67 V\n5. P₁ = 7.1 W, P₂ = 4.7 W, P₃ = 14.8 W"
        },
        "optics": {
            title: "Lens and Mirror Problems",
            description: "Solve problems involving lenses and mirrors",
            problemStatement: "A converging lens has a focal length of 20 cm. An object is placed 30 cm from the lens.\n\n1. Calculate the image distance\n2. Determine if the image is real or virtual\n3. Calculate the magnification\n4. Is the image upright or inverted?\n5. Draw a ray diagram\n\nUse lens equation: 1/f = 1/d₀ + 1/dᵢ, magnification = -dᵢ/d₀\n\nAnswers:\n1. dᵢ = 60 cm\n2. Real image (positive distance)\n3. m = -2\n4. Inverted (negative magnification)\n5. Ray diagram shows converging rays forming real, inverted image"
        }
    },
    HARD: {
        "quantum_mechanics": {
            title: "Quantum Mechanical Systems",
            description: "Apply quantum mechanics to solve complex problems",
            problemStatement: "An electron is confined to a one-dimensional box of length L.\n\n1. Write the Schrödinger equation for this system\n2. Find the allowed energy levels\n3. Calculate the ground state energy for L = 1 nm\n4. What is the probability of finding the electron in the left half of the box in the ground state?\n5. Calculate the wavelength of light needed to excite the electron from n=1 to n=2\n\nUse: E_n = n²h²/(8mL²), ψ_n(x) = √(2/L)sin(nπx/L)\n\nAnswers:\n1. -ℏ²/(2m) d²ψ/dx² = Eψ\n2. E_n = n²h²/(8mL²)\n3. E₁ = 0.376 eV\n4. P = 0.5 (equal probability)\n5. λ = 2.07 × 10⁻⁶ m (infrared)"
        },
        "thermodynamics": {
            title: "Statistical Thermodynamics",
            description: "Apply statistical mechanics to thermodynamic systems",
            problemStatement: "A system of N identical particles has energy levels ε₀, ε₁, ε₂, ... with degeneracies g₀, g₁, g₂, ...\n\n1. Write the partition function Z\n2. Derive the expression for average energy ⟨E⟩\n3. Calculate the entropy S\n4. For a two-level system with ε₀ = 0, ε₁ = ε, g₀ = g₁ = 1, find the heat capacity at constant volume\n5. What happens to the heat capacity as T → 0?\n\nUse: Z = Σᵢ gᵢe^(-βεᵢ), ⟨E⟩ = -∂lnZ/∂β, S = k(lnZ + β⟨E⟩)\n\nAnswer: Z = 1 + e^(-βε), ⟨E⟩ = εe^(-βε)/(1 + e^(-βε)), C_V = Nk(βε)²e^(-βε)/(1 + e^(-βε))², C_V → 0 as T → 0"
        },
        "relativity": {
            title: "Special Relativity Applications",
            description: "Solve problems involving relativistic effects",
            problemStatement: "A spaceship travels at 0.8c relative to Earth. The spaceship is 100 m long in its rest frame.\n\n1. What is the length of the spaceship as measured by an observer on Earth?\n2. If the spaceship takes 2 years (spaceship time) to reach a star, how long does the journey take according to Earth observers?\n3. What is the proper time for the journey?\n4. If the spaceship sends a radio signal when it reaches the star, how long does it take for the signal to reach Earth?\n5. Calculate the relativistic momentum of a 1000 kg object on the spaceship\n\nUse: L = L₀/γ, Δt = γΔt₀, p = γmv, where γ = 1/√(1-v²/c²)\n\nAnswers:\n1. L = 60 m\n2. Δt = 3.33 years\n3. Δt₀ = 2 years\n4. Signal time depends on distance to star\n5. p = 1.67 × 10¹¹ kg⋅m/s"
        }
    }
};
