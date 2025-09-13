import { TopicTemplates } from './index';

export const algorithmsTemplates: TopicTemplates = {
  EASY: {
    'array-sum': {
      title: 'Array Sum Problem',
      description: 'Find the sum of all elements in an array',
      problemStatement: `Find the sum of all elements in the given array.

Input Format:
First line: n (number of elements)
Second line: n space-separated integers

Output Format:
Single integer representing the sum

Example:
Input:
5
1 2 3 4 5
Output:
15

Constraints:
1 ≤ n ≤ 100
1 ≤ arr[i] ≤ 1000`
    },
    'find-maximum': {
      title: 'Find Maximum Element',
      description: 'Find the maximum element in an array',
      problemStatement: `Given an array of integers, find the maximum element.

Input Format:
First line: n (number of elements)
Second line: n space-separated integers

Output Format:
Single integer representing the maximum element

Example:
Input:
5
3 7 2 9 1
Output:
9

Constraints:
1 ≤ n ≤ 100
1 ≤ arr[i] ≤ 1000`
    },
    'count-even': {
      title: 'Count Even Numbers',
      description: 'Count the number of even numbers in an array',
      problemStatement: `Count the number of even numbers in the given array.

Input Format:
First line: n (number of elements)
Second line: n space-separated integers

Output Format:
Single integer representing the count of even numbers

Example:
Input:
5
1 2 3 4 5
Output:
2

Constraints:
1 ≤ n ≤ 100
1 ≤ arr[i] ≤ 1000`
    }
  },
  MEDIUM: {
    'binary-search': {
      title: 'Binary Search',
      description: 'Find target in sorted array using binary search',
      problemStatement: `Given a sorted array of integers, find the index of a target value using binary search.

Input Format:
First line: n (array size)
Second line: n space-separated sorted integers
Third line: target value

Output Format:
Index of target value, or -1 if not found

Example:
Input:
5
1 3 5 7 9
5
Output:
2

Constraints:
1 ≤ n ≤ 1000
-10^9 ≤ arr[i] ≤ 10^9
-10^9 ≤ target ≤ 10^9`
    },
    'two-sum': {
      title: 'Two Sum',
      description: 'Find two numbers that add up to target',
      problemStatement: `Given an array of integers and a target sum, find two numbers that add up to the target.

Input Format:
First line: n (array size)
Second line: n space-separated integers
Third line: target sum

Output Format:
Two space-separated indices, or -1 -1 if no solution exists

Example:
Input:
4
2 7 11 15
9
Output:
0 1

Constraints:
2 ≤ n ≤ 1000
-10^9 ≤ arr[i] ≤ 10^9
-10^9 ≤ target ≤ 10^9`
    },
    'merge-sorted-arrays': {
      title: 'Merge Sorted Arrays',
      description: 'Merge two sorted arrays into one sorted array',
      problemStatement: `Given two sorted arrays, merge them into one sorted array.

Input Format:
First line: n (size of first array)
Second line: n space-separated integers (first array)
Third line: m (size of second array)
Fourth line: m space-separated integers (second array)

Output Format:
Space-separated integers of the merged array

Example:
Input:
3
1 3 5
3
2 4 6
Output:
1 2 3 4 5 6

Constraints:
1 ≤ n, m ≤ 1000
-10^9 ≤ arr[i] ≤ 10^9`
    }
  },
  HARD: {
    'longest-increasing-subsequence': {
      title: 'Longest Increasing Subsequence',
      description: 'Find the length of the longest increasing subsequence',
      problemStatement: `Given an array of integers, find the length of the longest increasing subsequence.

Input Format:
First line: n (array size)
Second line: n space-separated integers

Output Format:
Single integer representing the length of LIS

Example:
Input:
6
10 9 2 5 3 7 101 18
Output:
4

Constraints:
1 ≤ n ≤ 2500
-10^4 ≤ arr[i] ≤ 10^4`
    },
    'maximum-subarray': {
      title: 'Maximum Subarray Sum',
      description: 'Find the maximum sum of any contiguous subarray',
      problemStatement: `Given an array of integers, find the maximum sum of any contiguous subarray (Kadane's algorithm).

Input Format:
First line: n (array size)
Second line: n space-separated integers

Output Format:
Single integer representing the maximum subarray sum

Example:
Input:
5
-2 1 -3 4 -1 2 1 -5 4
Output:
6

Constraints:
1 ≤ n ≤ 10^5
-10^4 ≤ arr[i] ≤ 10^4`
    },
    'sliding-window-maximum': {
      title: 'Sliding Window Maximum',
      description: 'Find maximum in each sliding window of size k',
      problemStatement: `Given an array and a sliding window of size k, find the maximum element in each window.

Input Format:
First line: n (array size)
Second line: n space-separated integers
Third line: k (window size)

Output Format:
Space-separated integers representing maximum in each window

Example:
Input:
8
1 3 -1 -3 5 3 6 7
3
Output:
3 3 5 5 6 7

Constraints:
1 ≤ k ≤ n ≤ 10^5
-10^4 ≤ arr[i] ≤ 10^4`
    }
  }
};
