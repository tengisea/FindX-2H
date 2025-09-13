export const computerScienceTemplates = {
  EASY: {
    "binary_arithmetic": {
      title: "Binary Number Operations",
      description: "Perform arithmetic operations in binary",
      problemStatement: "Perform the following operations in binary:\n\n1. Convert 25 to binary\n2. Add 1101₂ + 1011₂\n3. Subtract 1010₂ - 0111₂\n4. Multiply 101₂ × 11₂\n5. Convert 101101₂ to decimal\n\nShow your work step by step.\n\nAnswers:\n1. 25₁₀ = 11001₂\n2. 1101₂ + 1011₂ = 11000₂\n3. 1010₂ - 0111₂ = 0011₂\n4. 101₂ × 11₂ = 1111₂\n5. 101101₂ = 45₁₀"
    },
    "logic_gates": {
      title: "Boolean Logic and Gates",
      description: "Work with basic logic gates and boolean algebra",
      problemStatement: "Given the boolean expression: F = (A + B) · (A' + C)\n\n1. Create a truth table for F\n2. Simplify the expression using boolean algebra\n3. Draw the logic circuit\n4. What is the output when A=1, B=0, C=1?\n\nTruth table:\nA B C | A' | A+B | A'+C | F\n0 0 0 | 1  | 0   | 1    | 0\n0 0 1 | 1  | 0   | 1    | 0\n0 1 0 | 1  | 1   | 1    | 1\n0 1 1 | 1  | 1   | 1    | 1\n1 0 0 | 0  | 1   | 0    | 0\n1 0 1 | 0  | 1   | 1    | 1\n1 1 0 | 0  | 1   | 0    | 0\n1 1 1 | 0  | 1   | 1    | 1"
    },
    "data_types": {
      title: "Programming Data Types",
      description: "Understand different data types and their usage",
      problemStatement: "For each scenario, choose the most appropriate data type:\n\n1. Storing a person's age\n2. Storing a person's name\n3. Storing whether a student passed an exam\n4. Storing a student's GPA\n5. Storing a list of student IDs\n\nExplain your choices and provide examples in a programming language of your choice.\n\nAnswers:\n1. int (integer) - whole numbers only\n2. string - text data\n3. boolean - true/false values\n4. float/double - decimal numbers\n5. array/list - collection of integers"
    }
  },
  MEDIUM: {
    "algorithm_analysis": {
      title: "Algorithm Complexity Analysis",
      description: "Analyze time and space complexity of algorithms",
      problemStatement: "Analyze the following algorithm:\n\n```\nfunction findMax(arr):\n    max = arr[0]\n    for i = 1 to arr.length-1:\n        if arr[i] > max:\n            max = arr[i]\n    return max\n```\n\n1. What is the time complexity? Justify your answer\n2. What is the space complexity?\n3. What is the best-case scenario?\n4. What is the worst-case scenario?\n5. How would you modify it to find the second largest element?\n\nAnswers:\n1. O(n) - single pass through array\n2. O(1) - constant extra space\n3. O(n) - still need to check all elements\n4. O(n) - same as best case\n5. Keep track of both max and second max"
    },
    "database_design": {
      title: "Database Normalization",
      description: "Design and normalize database schemas",
      problemStatement: "Design a database for a library management system with the following requirements:\n\n- Track books (ISBN, title, author, publication year)\n- Track members (ID, name, email, phone)\n- Track loans (book, member, checkout date, return date)\n\n1. Create the initial unnormalized table\n2. Identify functional dependencies\n3. Normalize to 3NF\n4. Write SQL CREATE statements\n5. Write a query to find all books currently on loan\n\nAnswer: Separate tables for Books, Members, and Loans with proper foreign key relationships. Normalization eliminates redundancy and ensures data integrity."
    },
    "networking": {
      title: "Network Protocol Analysis",
      description: "Understand network protocols and communication",
      problemStatement: "A client wants to access a webpage at http://example.com/page.html\n\n1. Describe the complete process from typing the URL to displaying the page\n2. What protocols are involved at each layer?\n3. What happens if the DNS server is down?\n4. How does HTTPS differ from HTTP?\n5. What is the purpose of TCP vs UDP in this scenario?\n\nAnswer: DNS lookup → TCP connection → HTTP request → HTTP response → page rendering. Protocols: DNS, TCP, HTTP. DNS failure prevents name resolution. HTTPS adds encryption. TCP ensures reliable delivery."
    }
  },
  HARD: {
    "compiler_design": {
      title: "Compiler Construction",
      description: "Design and implement compiler components",
      problemStatement: "Design a simple compiler for arithmetic expressions:\n\nGrammar:\nE → E + T | E - T | T\nT → T * F | T / F | F\nF → (E) | number\n\n1. Construct the parse table for LL(1) parsing\n2. Show the parsing process for expression: 2 + 3 * 4\n3. Generate intermediate code (three-address code)\n4. Optimize the intermediate code\n5. Generate target assembly code\n\nAnswer: Parse table shows production rules for each (nonterminal, terminal) pair. Parsing follows leftmost derivation. Intermediate code uses temporary variables. Optimization eliminates redundant operations. Assembly code uses registers and memory operations."
    },
    "distributed_systems": {
      title: "Distributed System Design",
      description: "Design scalable distributed systems",
      problemStatement: "Design a distributed key-value store that can handle 1 million requests per second:\n\n1. What are the main challenges?\n2. How would you handle data partitioning?\n3. How would you ensure consistency?\n4. How would you handle node failures?\n5. How would you scale horizontally?\n\nAnswer: Challenges include consistency, availability, partition tolerance (CAP theorem). Use consistent hashing for partitioning. Implement eventual consistency or strong consistency based on requirements. Use replication and consensus algorithms for fault tolerance. Scale by adding more nodes and rebalancing data."
    },
    "machine_learning": {
      title: "Machine Learning Algorithm Implementation",
      description: "Implement and optimize ML algorithms",
      problemStatement: "Implement a neural network for image classification:\n\n1. Design the network architecture\n2. Choose appropriate activation functions\n3. Implement forward propagation\n4. Implement backpropagation algorithm\n5. Discuss optimization techniques (SGD, Adam, etc.)\n6. How would you prevent overfitting?\n\nAnswer: Use convolutional layers for image features, ReLU activation, softmax for output. Forward pass computes predictions. Backpropagation computes gradients using chain rule. Use mini-batch gradient descent with momentum. Regularization techniques include dropout, weight decay, and data augmentation."
    }
  }
};
