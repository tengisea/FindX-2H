import { TopicTemplates } from './index';

export const mathTemplates: TopicTemplates = {
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
    },
    'prime-check': {
      title: 'Prime Number Check',
      description: 'Check if a number is prime',
      problemStatement: `Given a number, check if it is prime.

Input Format:
Single line: n (number)

Output Format:
"YES" if prime, "NO" if not

Example:
Input:
17
Output:
YES

Input:
15
Output:
NO

Constraints:
1 ≤ n ≤ 10^6`
    }
  },
  MEDIUM: {
    'gcd-lcm': {
      title: 'GCD and LCM',
      description: 'Find GCD and LCM of two numbers',
      problemStatement: `Given two numbers, find their GCD and LCM.

Input Format:
Single line: a b (two numbers)

Output Format:
Two space-separated integers: GCD LCM

Example:
Input:
12 18
Output:
6 36

Constraints:
1 ≤ a, b ≤ 10^9`
    },
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
    'matrix-exponentiation': {
      title: 'Matrix Exponentiation',
      description: 'Calculate nth Fibonacci using matrix exponentiation',
      problemStatement: `Calculate the nth Fibonacci number using matrix exponentiation.

Input Format:
Single line: n (position in Fibonacci sequence)

Output Format:
Single integer representing F(n)

Example:
Input:
10
Output:
55

Constraints:
1 ≤ n ≤ 10^18`
    },
    'chinese-remainder-theorem': {
      title: 'Chinese Remainder Theorem',
      description: 'Solve system of congruences using CRT',
      problemStatement: `Given a system of congruences, find the smallest positive solution.

Input Format:
First line: n (number of congruences)
Next n lines: remainder modulus

Output Format:
Single integer representing the smallest positive solution

Example:
Input:
3
2 3
3 5
2 7
Output:
23

Constraints:
1 ≤ n ≤ 10
1 ≤ remainder < modulus ≤ 10^9`
    }
  }
};
