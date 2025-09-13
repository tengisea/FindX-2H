import { TopicTemplates } from './index';

export const dataStructuresTemplates: TopicTemplates = {
  EASY: {
    'stack-operations': {
      title: 'Stack Operations',
      description: 'Implement basic stack operations',
      problemStatement: `Implement a stack with push, pop, and top operations.

Input Format:
First line: n (number of operations)
Next n lines: operation (push x, pop, or top)

Output Format:
For each 'top' operation, output the top element
For each 'pop' operation, output the popped element
If stack is empty, output -1

Example:
Input:
5
push 1
push 2
top
pop
top
Output:
2
2
1

Constraints:
1 ≤ n ≤ 1000
-10^9 ≤ x ≤ 10^9`
    },
    'queue-operations': {
      title: 'Queue Operations',
      description: 'Implement basic queue operations',
      problemStatement: `Implement a queue with enqueue, dequeue, and front operations.

Input Format:
First line: n (number of operations)
Next n lines: operation (enqueue x, dequeue, or front)

Output Format:
For each 'front' operation, output the front element
For each 'dequeue' operation, output the dequeued element
If queue is empty, output -1

Example:
Input:
5
enqueue 1
enqueue 2
front
dequeue
front
Output:
1
1
2

Constraints:
1 ≤ n ≤ 1000
-10^9 ≤ x ≤ 10^9`
    }
  },
  MEDIUM: {
    'balanced-parentheses': {
      title: 'Balanced Parentheses',
      description: 'Check if parentheses are balanced using stack',
      problemStatement: `Given a string containing only '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

Input Format:
Single line: string of parentheses

Output Format:
"YES" if balanced, "NO" if not

Example:
Input:
()[]{}
Output:
YES

Input:
([)]
Output:
NO

Constraints:
1 ≤ string length ≤ 10^4`
    },
    'next-greater-element': {
      title: 'Next Greater Element',
      description: 'Find next greater element for each element using stack',
      problemStatement: `Given an array, find the next greater element for each element.

Input Format:
First line: n (array size)
Second line: n space-separated integers

Output Format:
Space-separated integers representing next greater element for each position
If no greater element exists, output -1

Example:
Input:
4
4 5 2 25
Output:
5 25 25 -1

Constraints:
1 ≤ n ≤ 10^5
1 ≤ arr[i] ≤ 10^9`
    }
  },
  HARD: {
    'largest-rectangle-histogram': {
      title: 'Largest Rectangle in Histogram',
      description: 'Find largest rectangle area in histogram using stack',
      problemStatement: `Given an array representing heights of bars in a histogram, find the area of the largest rectangle.

Input Format:
First line: n (number of bars)
Second line: n space-separated integers (heights)

Output Format:
Single integer representing the largest rectangle area

Example:
Input:
6
2 1 5 6 2 3
Output:
10

Constraints:
1 ≤ n ≤ 10^5
1 ≤ heights[i] ≤ 10^4`
    },
    'sliding-window-median': {
      title: 'Sliding Window Median',
      description: 'Find median in each sliding window using two heaps',
      problemStatement: `Given an array and a sliding window of size k, find the median in each window.

Input Format:
First line: n (array size)
Second line: n space-separated integers
Third line: k (window size)

Output Format:
Space-separated integers representing median in each window

Example:
Input:
7
1 3 -1 -3 5 3 6
3
Output:
1 -1 -1 3 5 6

Constraints:
1 ≤ k ≤ n ≤ 10^5
-10^5 ≤ arr[i] ≤ 10^5`
    }
  }
};
