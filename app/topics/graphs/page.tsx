"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function GraphsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/topics">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Topics
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Graph Data Structure</h1>
          <p className="text-white mb-6">
            A Graph is a non-linear data structure consisting of vertices (nodes) and edges that connect these vertices.
            It is used to represent relationships between objects and model real-world networks.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <h2 className="text-2xl font-bold">Graph Overview</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Characteristics</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Vertices (nodes) connected by edges</li>
                  <li>Can be directed or undirected</li>
                  <li>Edges can have weights</li>
                  <li>Can contain cycles</li>
                  <li>No hierarchical relationship between nodes</li>
                </ul>

                <h3 className="text-xl font-semibold">Types of Graphs</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Directed Graphs (Digraphs)</li>
                  <li>Undirected Graphs</li>
                  <li>Weighted Graphs</li>
                  <li>Connected vs Disconnected Graphs</li>
                  <li>Cyclic vs Acyclic Graphs</li>
                  <li>Complete Graphs</li>
                </ul>

                <h3 className="text-xl font-semibold">Time Complexity</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-background">
                        <th className="border border-gray-300 px-4 py-2">Operation</th>
                        <th className="border border-gray-300 px-4 py-2">Adjacency List</th>
                        <th className="border border-gray-300 px-4 py-2">Adjacency Matrix</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Add Vertex</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                        <td className="border border-gray-300 px-4 py-2">O(V²)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Add Edge</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Remove Vertex</td>
                        <td className="border border-gray-300 px-4 py-2">O(V + E)</td>
                        <td className="border border-gray-300 px-4 py-2">O(V²)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Remove Edge</td>
                        <td className="border border-gray-300 px-4 py-2">O(E)</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-4">
              <h2 className="text-2xl font-bold">Graph Implementation</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Adjacency List</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Graph implementation using adjacency list
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int vertex;
    struct Node* next;
} Node;

typedef struct Graph {
    int numVertices;
    Node** adjLists;
    int* visited;
} Graph;

// Create a new node
Node* createNode(int v) {
    Node* newNode = malloc(sizeof(Node));
    newNode->vertex = v;
    newNode->next = NULL;
    return newNode;
}

// Create a graph
Graph* createGraph(int vertices) {
    Graph* graph = malloc(sizeof(Graph));
    graph->numVertices = vertices;
    
    graph->adjLists = malloc(vertices * sizeof(Node*));
    graph->visited = malloc(vertices * sizeof(int));
    
    for (int i = 0; i < vertices; i++) {
        graph->adjLists[i] = NULL;
        graph->visited[i] = 0;
    }
    
    return graph;
}`}
                </pre>

                <h3 className="text-xl font-semibold">Graph Traversal</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// BFS implementation
void BFS(Graph* graph, int startVertex) {
    // Create a queue
    int queue[1000];
    int front = 0;
    int rear = 0;
    
    // Mark the start vertex as visited and enqueue it
    graph->visited[startVertex] = 1;
    queue[rear++] = startVertex;
    
    while (front < rear) {
        // Dequeue a vertex and print it
        int currentVertex = queue[front++];
        printf("%d ", currentVertex);
        
        // Get all adjacent vertices
        Node* temp = graph->adjLists[currentVertex];
        while (temp) {
            int adjVertex = temp->vertex;
            if (graph->visited[adjVertex] == 0) {
                graph->visited[adjVertex] = 1;
                queue[rear++] = adjVertex;
            }
            temp = temp->next;
        }
    }
}

// DFS implementation
void DFS(Graph* graph, int vertex) {
    graph->visited[vertex] = 1;
    printf("%d ", vertex);
    
    Node* temp = graph->adjLists[vertex];
    while (temp) {
        int adjVertex = temp->vertex;
        if (graph->visited[adjVertex] == 0) {
            DFS(graph, adjVertex);
        }
        temp = temp->next;
    }
}`}
                </pre>

                <h3 className="text-xl font-semibold">Shortest Path (Dijkstra's)</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Dijkstra's Algorithm implementation
#define INF 99999

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    int sptSet[V];
    
    // Initialize distances and sptSet
    for (int i = 0; i < V; i++) {
        dist[i] = INF;
        sptSet[i] = 0;
    }
    
    dist[src] = 0;
    
    // Find shortest path for all vertices
    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = 1;
        
        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && graph[u][v] && 
                dist[u] != INF && 
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
}`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <h2 className="text-2xl font-bold">Graph Applications</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Real-world Applications</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Social Networks</li>
                  <li>GPS and Navigation Systems</li>
                  <li>Network Routing</li>
                  <li>Dependency Resolution</li>
                  <li>Circuit Design</li>
                  <li>Game Development (Path Finding)</li>
                </ul>

                <h3 className="text-xl font-semibold">Example: Social Network</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Social Network Graph implementation
typedef struct User {
    int id;
    char* name;
    struct Connection* friends;
} User;

typedef struct Connection {
    User* user;
    struct Connection* next;
} Connection;

// Add friend connection
void addFriend(User* user1, User* user2) {
    // Add user2 to user1's friends list
    Connection* conn1 = malloc(sizeof(Connection));
    conn1->user = user2;
    conn1->next = user1->friends;
    user1->friends = conn1;
    
    // Add user1 to user2's friends list (undirected)
    Connection* conn2 = malloc(sizeof(Connection));
    conn2->user = user1;
    conn2->next = user2->friends;
    user2->friends = conn2;
}

// Find friends of friends
void findFriendsOfFriends(User* user) {
    Connection* friend = user->friends;
    while (friend) {
        Connection* friendOfFriend = friend->user->friends;
        while (friendOfFriend) {
            if (friendOfFriend->user != user) {
                printf("%s is a friend of %s\\n",
                    friendOfFriend->user->name,
                    friend->user->name);
            }
            friendOfFriend = friendOfFriend->next;
        }
        friend = friend->next;
    }
}`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Learning Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Graph Basics</span>
                  <span className="text-green-600">Completed</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Implementation</span>
                  <span className="text-yellow-600">In Progress</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Advanced Topics</span>
                  <span className="text-white">Not Started</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Related Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topics/trees" className="text-green-400 hover:underline">
                  Trees
                </Link>
              </li>
              <li>
                <Link href="/topics/sorting" className="text-green-400 hover:underline">
                  Sorting Algorithms
                </Link>
              </li>
              <li>
                <Link href="/topics/dynamic-programming" className="text-green-400 hover:underline">
                  Dynamic Programming
                </Link>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Practice</h3>
            <Link href="/topics/graphs/lab">
              <Button className="w-full">
                Try Graph Lab
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
} 