import { TopicTemplates } from './index';

export const stringTemplates: TopicTemplates = {
  EASY: {
    'palindrome-check': {
      title: 'Palindrome Check',
      description: 'Check if a string is a palindrome',
      problemStatement: `Given a string, check if it is a palindrome (reads the same forwards and backwards).

Input Format:
Single line: string

Output Format:
"YES" if palindrome, "NO" if not

Example:
Input:
racecar
Output:
YES

Input:
hello
Output:
NO

Constraints:
1 ≤ string length ≤ 1000`
    },
    'string-reverse': {
      title: 'String Reverse',
      description: 'Reverse a string',
      problemStatement: `Given a string, reverse it.

Input Format:
Single line: string

Output Format:
Reversed string

Example:
Input:
hello
Output:
olleh

Constraints:
1 ≤ string length ≤ 1000`
    }
  },
  MEDIUM: {
    'longest-common-subsequence': {
      title: 'Longest Common Subsequence',
      description: 'Find length of LCS between two strings',
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
    },
    'kmp-pattern-matching': {
      title: 'KMP Pattern Matching',
      description: 'Find all occurrences of pattern in text using KMP',
      problemStatement: `Given a text and a pattern, find all starting positions where the pattern occurs in the text.

Input Format:
First line: text
Second line: pattern

Output Format:
Space-separated integers representing starting positions (0-indexed)

Example:
Input:
ABABDABACDABABCABAB
ABABCABAB
Output:
10

Constraints:
1 ≤ text length ≤ 10^6
1 ≤ pattern length ≤ 10^6`
    }
  },
  HARD: {
    'suffix-array': {
      title: 'Suffix Array Construction',
      description: 'Build suffix array for string matching',
      problemStatement: `Given a string, construct its suffix array.

Input Format:
Single line: string

Output Format:
Space-separated integers representing starting positions of sorted suffixes

Example:
Input:
banana
Output:
5 3 1 0 4 2

Constraints:
1 ≤ string length ≤ 10^5`
    },
    'manacher-algorithm': {
      title: 'Manacher\'s Algorithm',
      description: 'Find longest palindromic substring using Manacher\'s algorithm',
      problemStatement: `Given a string, find the length of the longest palindromic substring.

Input Format:
Single line: string

Output Format:
Single integer representing length of longest palindromic substring

Example:
Input:
babad
Output:
3

Constraints:
1 ≤ string length ≤ 10^6`
    }
  }
};
