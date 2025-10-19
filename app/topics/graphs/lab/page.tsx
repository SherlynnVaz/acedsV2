"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function GraphLabPage() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("code")

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running code...\n")

    try {
      // Check if required functions are implemented
      const requiredFunctions = [
        "createGraph",
        "addEdge",
        "BFS",
        "DFS",
        "printGraph"
      ]

      let missingFunctions = requiredFunctions.filter(
        func => !code.includes(func)
      )

      if (missingFunctions.length > 0) {
        setOutput(
          `Error: The following required functions are missing:\n${missingFunctions.join(
            "\n"
          )}`
        )
        return
      }

      // Simulate code execution
      const output = []
      output.push("Creating graph with 5 vertices...")
      output.push("Adding edges: (0,1), (0,4), (1,2), (1,3), (1,4), (2,3), (3,4)")
      output.push("\nBFS starting from vertex 0:")
      output.push("0 1 4 2 3")
      output.push("\nDFS starting from vertex 0:")
      output.push("0 1 2 3 4")
      output.push("\nGraph representation:")
      output.push("0 -> 1 -> 4")
      output.push("1 -> 0 -> 2 -> 3 -> 4")
      output.push("2 -> 1 -> 3")
      output.push("3 -> 1 -> 2 -> 4")
      output.push("4 -> 0 -> 1 -> 3")

      setOutput(output.join("\n"))
    } catch (error) {
      setOutput(`Error: ${String(error)}`)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/topics/graphs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Graphs
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Graph Lab</h1>
            <p className="text-white">
              Implement a graph data structure using adjacency list representation.
              Complete the required functions to create, modify, and traverse the graph.
            </p>
          </div>

          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="code">Your Code</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
              </TabsList>
              <TabsContent value="code" className="space-y-4">
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-[500px] font-mono p-4 bg-background text-white rounded-lg"
                    spellCheck="false"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={runCode}
                    disabled={isRunning}
                    className="w-full"
                  >
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>
                  <Button
                    onClick={resetCode}
                    variant="outline"
                    className="w-full"
                  >
                    Reset Code
                  </Button>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Output:</h3>
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
              </TabsContent>
              <TabsContent value="solution" className="space-y-4">
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {solutionCode}
                </pre>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Instructions</h3>
            <div className="space-y-4">
              <p>
                Implement the following functions for a graph using adjacency list
                representation:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>createGraph(int vertices)</li>
                <li>addEdge(Graph* graph, int src, int dest)</li>
                <li>BFS(Graph* graph, int startVertex)</li>
                <li>DFS(Graph* graph, int vertex)</li>
                <li>printGraph(Graph* graph)</li>
              </ul>
              <p>
                The graph should support both directed and undirected edges. Make
                sure to handle memory allocation and deallocation properly.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Tips</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Use dynamic memory allocation for the adjacency lists</li>
              <li>Initialize the visited array for traversal algorithms</li>
              <li>Remember to handle edge cases (empty graph, invalid vertices)</li>
              <li>Free allocated memory to prevent memory leaks</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Next Steps</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topics/graphs" className="text-green-400 hover:underline">
                  Review Graph Theory
                </Link>
              </li>
              <li>
                <Link href="/topics/trees" className="text-green-400 hover:underline">
                  Learn about Trees
                </Link>
              </li>
              <li>
                <Link href="/topics/shortest-path" className="text-green-400 hover:underline">
                  Explore Shortest Path Algorithms
                </Link>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

const initialCode = `#include <stdio.h>
#include <stdlib.h>

// Node structure for adjacency list
typedef struct Node {
    int vertex;
    struct Node* next;
} Node;

// Graph structure
typedef struct Graph {
    int numVertices;
    Node** adjLists;
    int* visited;
} Graph;

// TODO: Implement createGraph function
Graph* createGraph(int vertices) {
    // Your code here
}

// TODO: Implement addEdge function
void addEdge(Graph* graph, int src, int dest) {
    // Your code here
}

// TODO: Implement BFS function
void BFS(Graph* graph, int startVertex) {
    // Your code here
}

// TODO: Implement DFS function
void DFS(Graph* graph, int vertex) {
    // Your code here
}

// TODO: Implement printGraph function
void printGraph(Graph* graph) {
    // Your code here
}

int main() {
    // Create a graph with 5 vertices
    Graph* graph = createGraph(5);
    
    // Add edges
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 4);
    addEdge(graph, 1, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 1, 4);
    addEdge(graph, 2, 3);
    addEdge(graph, 3, 4);
    
    printf("Graph representation:\\n");
    printGraph(graph);
    
    printf("\\nBFS starting from vertex 0:\\n");
    BFS(graph, 0);
    
    // Reset visited array
    for(int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = 0;
    }
    
    printf("\\nDFS starting from vertex 0:\\n");
    DFS(graph, 0);
    
    return 0;
}`

const solutionCode = `#include <stdio.h>
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

Node* createNode(int v) {
    Node* newNode = malloc(sizeof(Node));
    newNode->vertex = v;
    newNode->next = NULL;
    return newNode;
}

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
}

void addEdge(Graph* graph, int src, int dest) {
    // Add edge from src to dest
    Node* newNode = createNode(dest);
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;
    
    // Add edge from dest to src (undirected graph)
    newNode = createNode(src);
    newNode->next = graph->adjLists[dest];
    graph->adjLists[dest] = newNode;
}

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
}

void printGraph(Graph* graph) {
    for (int i = 0; i < graph->numVertices; i++) {
        Node* temp = graph->adjLists[i];
        printf("%d", i);
        while (temp) {
            printf(" -> %d", temp->vertex);
            temp = temp->next;
        }
        printf("\\n");
    }
}

int main() {
    // Create a graph with 5 vertices
    Graph* graph = createGraph(5);
    
    // Add edges
    addEdge(graph, 0, 1);
    addEdge(graph, 0, 4);
    addEdge(graph, 1, 2);
    addEdge(graph, 1, 3);
    addEdge(graph, 1, 4);
    addEdge(graph, 2, 3);
    addEdge(graph, 3, 4);
    
    printf("Graph representation:\\n");
    printGraph(graph);
    
    printf("\\nBFS starting from vertex 0:\\n");
    BFS(graph, 0);
    
    // Reset visited array
    for(int i = 0; i < graph->numVertices; i++) {
        graph->visited[i] = 0;
    }
    
    printf("\\nDFS starting from vertex 0:\\n");
    DFS(graph, 0);
    
    return 0;
}` 