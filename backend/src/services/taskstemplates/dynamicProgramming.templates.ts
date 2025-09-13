import { TopicTemplates } from './index';

export const dynamicProgrammingTemplates: TopicTemplates = {
  EASY: {
    'fibonacci': {
      title: 'Fibonacci Sequence',
      description: 'Calculate nth Fibonacci number using DP',
      problemStatement: `Calculate the nth Fibonacci number using dynamic programming.

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
0 ≤ n ≤ 1000`
    },
    'climbing-stairs': {
      title: 'Climbing Stairs',
      description: 'Find number of ways to climb stairs',
      problemStatement: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Input Format:
Single line: n (number of steps)

Output Format:
Single integer representing number of ways

Example:
Input:
5
Output:
8

Constraints:
1 ≤ n ≤ 1000`
    }
  },
  MEDIUM: {
    'knapsack': {
      title: '0/1 Knapsack',
      description: 'Solve 0/1 knapsack problem using DP',
      problemStatement: `Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value.

Input Format:
First line: n W (number of items and knapsack capacity)
Next n lines: weight value (weight and value of each item)

Output Format:
Single integer representing maximum value

Example:
Input:
3 50
10 60
20 100
30 120
Output:
220

Constraints:
1 ≤ n ≤ 1000
1 ≤ W ≤ 10000
1 ≤ weight, value ≤ 1000`
    },
    'longest-common-subsequence': {
      title: 'Longest Common Subsequence',
      description: 'Find LCS using dynamic programming',
      problemStatement: `Given two strings, find the length of their longest common subsequence.

Input Format:
First line: string1
Second line: string2

Output Format:
Single integer representing LCS length

Example:
Input:
ABCDGH
AEDFHR
Output:
3

Constraints:
1 ≤ string length ≤ 1000`
    }
  },
  HARD: {
    'edit-distance': {
      title: 'Edit Distance',
      description: 'Find minimum edit distance between two strings',
      problemStatement: `Given two strings, find the minimum number of operations (insert, delete, replace) to convert one string to another.

Input Format:
First line: string1
Second line: string2

Output Format:
Single integer representing minimum edit distance

Example:
Input:
kitten
sitting
Output:
3

Constraints:
1 ≤ string length ≤ 1000`
    },
    'matrix-chain-multiplication': {
      title: 'Matrix Chain Multiplication',
      description: 'Find optimal way to multiply matrices',
      problemStatement: `Given a sequence of matrices, find the most efficient way to multiply them.

Input Format:
First line: n (number of matrices)
Second line: n+1 space-separated integers (dimensions)

Output Format:
Single integer representing minimum number of multiplications

Example:
Input:
4
1 2 3 4 5
Output:
38

Constraints:
1 ≤ n ≤ 100
1 ≤ dimension ≤ 1000`
    }
  }
};
