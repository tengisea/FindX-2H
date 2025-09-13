import { TopicTemplates } from './index';

export const graphTemplates: TopicTemplates = {
  EASY: {
    'graph-traversal': {
      title: 'Graph Traversal',
      description: 'Implement BFS and DFS traversal',
      problemStatement: `Given a graph, perform BFS and DFS traversal starting from node 0.

Input Format:
First line: n m (number of nodes and edges)
Next m lines: u v (edge between nodes u and v)

Output Format:
First line: BFS traversal order
Second line: DFS traversal order

Example:
Input:
4 3
0 1
1 2
2 3
Output:
0 1 2 3
0 1 2 3

Constraints:
1 ≤ n ≤ 1000
0 ≤ m ≤ n*(n-1)/2`
    },
    'connected-components': {
      title: 'Connected Components',
      description: 'Find number of connected components in undirected graph',
      problemStatement: `Given an undirected graph, find the number of connected components.

Input Format:
First line: n m (number of nodes and edges)
Next m lines: u v (edge between nodes u and v)

Output Format:
Single integer representing number of connected components

Example:
Input:
5 3
0 1
1 2
3 4
Output:
2

Constraints:
1 ≤ n ≤ 1000
0 ≤ m ≤ n*(n-1)/2`
    }
  },
  MEDIUM: {
    'shortest-path': {
      title: 'Shortest Path',
      description: 'Find shortest path using Dijkstra\'s algorithm',
      problemStatement: `Given a weighted graph, find the shortest path from source to all other nodes.

Input Format:
First line: n m (number of nodes and edges)
Next m lines: u v w (edge from u to v with weight w)
Last line: source (starting node)

Output Format:
Space-separated integers representing shortest distances to all nodes

Example:
Input:
4 5
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
0
Output:
0 1 3 4

Constraints:
1 ≤ n ≤ 1000
0 ≤ m ≤ 10000
1 ≤ w ≤ 1000`
    },
    'topological-sort': {
      title: 'Topological Sort',
      description: 'Find topological ordering of DAG',
      problemStatement: `Given a directed acyclic graph, find its topological ordering.

Input Format:
First line: n m (number of nodes and edges)
Next m lines: u v (directed edge from u to v)

Output Format:
Space-separated integers representing topological order

Example:
Input:
4 4
0 1
1 2
2 3
0 3
Output:
0 1 2 3

Constraints:
1 ≤ n ≤ 1000
0 ≤ m ≤ n*(n-1)`
    }
  },
  HARD: {
    'minimum-spanning-tree': {
      title: 'Minimum Spanning Tree',
      description: 'Find MST using Kruskal\'s algorithm',
      problemStatement: `Given a weighted undirected graph, find the minimum spanning tree.

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
    'strongly-connected-components': {
      title: 'Strongly Connected Components',
      description: 'Find SCCs using Kosaraju\'s algorithm',
      problemStatement: `Given a directed graph, find all strongly connected components.

Input Format:
First line: n m (number of nodes and edges)
Next m lines: u v (directed edge from u to v)

Output Format:
For each SCC, output space-separated nodes in that component

Example:
Input:
5 5
0 1
1 2
2 0
1 3
3 4
Output:
0 1 2
3
4

Constraints:
1 ≤ n ≤ 1000
0 ≤ m ≤ n*(n-1)`
    }
  }
};
