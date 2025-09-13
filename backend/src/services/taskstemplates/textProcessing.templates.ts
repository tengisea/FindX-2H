import { TopicTemplates } from './index';

export const textProcessingTemplates: TopicTemplates = {
  EASY: {
    "word-count": {
      title: 'Word Count',
      description: 'Count the number of words in a text',
      problemStatement: `Given a text, count the number of words. Words are separated by spaces.

Input Format:
Single line: text

Output Format:
Single integer representing number of words

Example:
Input:
Hello world this is a test
Output:
6

Constraints:
1 ≤ text length ≤ 1000`
    },
    "vowel-count": {
      title: 'Vowel Count',
      description: 'Count the number of vowels in a string',
      problemStatement: `Given a string, count the number of vowels (a, e, i, o, u, both uppercase and lowercase).

Input Format:
Single line: string

Output Format:
Single integer representing number of vowels

Example:
Input:
Hello World
Output:
3

Constraints:
1 ≤ string length ≤ 1000`
    }
  },
  MEDIUM: {
    "anagram-check": {
      title: 'Anagram Check',
      description: 'Check if two strings are anagrams',
      problemStatement: `Given two strings, check if they are anagrams of each other.

Input Format:
First line: string1
Second line: string2

Output Format:
"YES" if anagrams, "NO" if not

Example:
Input:
listen
silent
Output:
YES

Input:
hello
world
Output:
NO

Constraints:
1 ≤ string length ≤ 1000`
    },
    "longest-word": {
      title: 'Longest Word',
      description: 'Find the longest word in a sentence',
      problemStatement: `Given a sentence, find the longest word. If there are multiple words with the same maximum length, return the first one.

Input Format:
Single line: sentence

Output Format:
Longest word

Example:
Input:
The quick brown fox jumps over the lazy dog
Output:
quick

Constraints:
1 ≤ sentence length ≤ 1000`
    }
  },
  HARD: {
    "text-compression": {
      title: 'Text Compression',
      description: 'Implement basic text compression using run-length encoding',
      problemStatement: `Given a string, compress it using run-length encoding. For example, "aaabbbcc" becomes "a3b3c2".

Input Format:
Single line: string

Output Format:
Compressed string

Example:
Input:
aaabbbcc
Output:
a3b3c2

Input:
abcd
Output:
a1b1c1d1

Constraints:
1 ≤ string length ≤ 1000`
    },
    "palindrome-substrings": {
      title: 'Palindrome Substrings',
      description: 'Count the number of palindromic substrings',
      problemStatement: `Given a string, count the number of palindromic substrings.

Input Format:
Single line: string

Output Format:
Single integer representing number of palindromic substrings

Example:
Input:
abc
Output:
3

Input:
aaa
Output:
6

Constraints:
1 ≤ string length ≤ 1000`
    }
  }
};
