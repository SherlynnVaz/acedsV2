"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function QueuesPage() {
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
          <h1 className="text-3xl font-bold mb-2">Queue Data Structure</h1>
          <p className="text-white mb-6">
            A Queue is a linear data structure that follows the First In First Out (FIFO) principle.
            Elements are added at the rear (enqueue) and removed from the front (dequeue).
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <h2 className="text-2xl font-bold">Queue Overview</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Characteristics</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>FIFO (First In First Out) principle</li>
                  <li>Elements are added at the rear (enqueue)</li>
                  <li>Elements are removed from the front (dequeue)</li>
                  <li>Can be implemented using arrays or linked lists</li>
                  <li>Common operations: enqueue, dequeue, front, isEmpty</li>
                </ul>

                <h3 className="text-xl font-semibold">Types of Queues</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Simple Queue (Linear Queue)</li>
                  <li>Circular Queue</li>
                  <li>Priority Queue</li>
                  <li>Double-ended Queue (Deque)</li>
                </ul>

                <h3 className="text-xl font-semibold">Time Complexity</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-background">
                        <th className="border border-gray-300 px-4 py-2">Operation</th>
                        <th className="border border-gray-300 px-4 py-2">Array Implementation</th>
                        <th className="border border-gray-300 px-4 py-2">Linked List Implementation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Enqueue</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Dequeue</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Front</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">isEmpty</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                        <td className="border border-gray-300 px-4 py-2">O(1)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-4">
              <h2 className="text-2xl font-bold">Queue Implementation</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Array Implementation</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Queue implementation using array
typedef struct {
    int* array;
    int front;
    int rear;
    int capacity;
    int size;
} Queue;

Queue* createQueue(int capacity) {
    Queue* queue = (Queue*)malloc(sizeof(Queue));
    queue->array = (int*)malloc(capacity * sizeof(int));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    return queue;
}`}
                </pre>

                <h3 className="text-xl font-semibold">Linked List Implementation</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Queue implementation using linked list
typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* front;
    Node* rear;
} Queue;

Queue* createQueue() {
    Queue* queue = (Queue*)malloc(sizeof(Queue));
    queue->front = queue->rear = NULL;
    return queue;
}`}
                </pre>

                <h3 className="text-xl font-semibold">Common Operations</h3>
                <div className="space-y-2">
                  <h4 className="font-semibold">Enqueue Operation</h4>
                  <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                    {`void enqueue(Queue* queue, int item) {
    if (isFull(queue)) return;
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size++;
}`}
                  </pre>

                  <h4 className="font-semibold">Dequeue Operation</h4>
                  <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                    {`int dequeue(Queue* queue) {
    if (isEmpty(queue)) return INT_MIN;
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size--;
    return item;
}`}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <h2 className="text-2xl font-bold">Queue Applications</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Real-world Applications</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>CPU Scheduling in Operating Systems</li>
                  <li>Printer Job Scheduling</li>
                  <li>Call Center Phone Systems</li>
                  <li>Breadth First Search in Graphs</li>
                  <li>Message Queues in System Design</li>
                  <li>Buffering in Computer Networks</li>
                </ul>

                <h3 className="text-xl font-semibold">Example: BFS using Queue</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`void BFS(Graph* graph, int startVertex) {
    Queue* queue = createQueue(graph->V);
    bool* visited = (bool*)calloc(graph->V, sizeof(bool));
    
    visited[startVertex] = true;
    enqueue(queue, startVertex);
    
    while (!isEmpty(queue)) {
        int vertex = dequeue(queue);
        printf("%d ", vertex);
        
        // Add all adjacent unvisited vertices
        for (int i = 0; i < graph->V; i++) {
            if (graph->adj[vertex][i] && !visited[i]) {
                visited[i] = true;
                enqueue(queue, i);
            }
        }
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
                  <span>Queue Basics</span>
                  <span className="text-white">Not Started</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-border h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Implementation</span>
                  <span className="text-white">Not Started</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-border h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Advanced Topics</span>
                  <span className="text-white">Not Started</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-border h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Related Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/topics/arrays" className="text-green-400 hover:underline">
                  Arrays
                </Link>
              </li>
              <li>
                <Link href="/topics/linked-lists" className="text-green-400 hover:underline">
                  Linked Lists
                </Link>
              </li>
              <li>
                <Link href="/topics/stacks" className="text-green-400 hover:underline">
                  Stacks
                </Link>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Practice</h3>
            <Link href="/topics/queues/lab">
              <Button className="w-full">
                Try Queue Lab
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
} 