import { TopicTemplates } from './index';

export const greedyTemplates: TopicTemplates = {
  EASY: {
    'activity-selection': {
      title: 'Activity Selection',
      description: 'Select maximum number of non-overlapping activities',
      problemStatement: `Given n activities with start and end times, select the maximum number of activities that don't overlap.

Input Format:
First line: n (number of activities)
Next n lines: start end (start and end time of each activity)

Output Format:
Single integer representing maximum number of activities

Example:
Input:
6
1 2
3 4
0 6
5 7
8 9
5 9
Output:
4

Constraints:
1 ≤ n ≤ 1000
0 ≤ start < end ≤ 10^6`
    },
    'fractional-knapsack': {
      title: 'Fractional Knapsack',
      description: 'Solve fractional knapsack using greedy approach',
      problemStatement: `Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. You can take fractions of items.

Input Format:
First line: n W (number of items and knapsack capacity)
Next n lines: weight value (weight and value of each item)

Output Format:
Single decimal number representing maximum value (rounded to 2 decimal places)

Example:
Input:
3 50
10 60
20 100
30 120
Output:
240.00

Constraints:
1 ≤ n ≤ 1000
1 ≤ W ≤ 10000
1 ≤ weight, value ≤ 1000`
    }
  },
  MEDIUM: {
    'huffman-coding': {
      title: 'Huffman Coding',
      description: 'Implement Huffman coding for data compression',
      problemStatement: `Given characters and their frequencies, construct a Huffman tree and find the total bits needed for encoding.

Input Format:
First line: n (number of characters)
Next n lines: character frequency

Output Format:
Single integer representing total bits needed

Example:
Input:
5
a 5
b 9
c 12
d 13
e 16
Output:
224

Constraints:
1 ≤ n ≤ 1000
1 ≤ frequency ≤ 1000`
    },
    'job-scheduling': {
      title: 'Job Scheduling',
      description: 'Schedule jobs to maximize profit using greedy approach',
      problemStatement: `Given n jobs with deadlines and profits, schedule jobs to maximize total profit.

Input Format:
First line: n (number of jobs)
Next n lines: deadline profit (deadline and profit of each job)

Output Format:
Single integer representing maximum profit

Example:
Input:
4
2 100
1 19
2 27
1 25
Output:
127

Constraints:
1 ≤ n ≤ 1000
1 ≤ deadline ≤ 1000
1 ≤ profit ≤ 1000`
    }
  },
  HARD: {
    'minimum-spanning-tree-prim': {
      title: 'Prim\'s MST Algorithm',
      description: 'Find MST using Prim\'s greedy algorithm',
      problemStatement: `Given a weighted undirected graph, find the minimum spanning tree using Prim's algorithm.

Input Format:
First line: n m (number of nodes and edges)
Next m lines: u v w (edge from u to v with weight w)

Output Format:
Total weight of the minimum spanning tree

Example:
Input:
4 5
0 1 10
0 2 6
0 3 5
1 3 15
2 3 4
Output:
19

Constraints:
1 ≤ n ≤ 1000
0 ≤ m ≤ 10000
1 ≤ w ≤ 1000`
    },
    'set-cover': {
      title: 'Set Cover Problem',
      description: 'Solve set cover problem using greedy approximation',
      problemStatement: `Given a universe U and a collection of sets, find the minimum number of sets that cover all elements of U.

Input Format:
First line: n m (number of elements and sets)
Next m lines: k followed by k elements (each set)

Output Format:
Single integer representing minimum number of sets needed

Example:
Input:
5 3
3 1 2 3
2 2 4
2 3 5
Output:
2

Constraints:
1 ≤ n ≤ 1000
1 ≤ m ≤ 1000
1 ≤ k ≤ 1000`
    }
  }
};
