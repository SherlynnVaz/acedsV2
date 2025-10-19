"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function QueueLabPage() {
  const [code, setCode] = useState(`// Implement a Queue in C
// Required functions:
// - createQueue(capacity): Create a new queue with given capacity
// - enqueue(queue, item): Add an item to the rear of queue
// - dequeue(queue): Remove and return item from front of queue
// - front(queue): Get front item without removing
// - isEmpty(queue): Check if queue is empty

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    return 0;
}`)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("code")

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    try {
      // This is a simulation of C code execution
      let outputText = ""

      // Check if the code contains the required functions
      const hasQueueStruct = code.includes("struct Queue") || code.includes("typedef struct")
      const hasCreateQueue = code.includes("createQueue")
      const hasEnqueue = code.includes("enqueue")
      const hasDequeue = code.includes("dequeue")
      const hasFront = code.includes("front")
      const hasIsEmpty = code.includes("isEmpty")

      if (!hasQueueStruct || !hasCreateQueue || !hasEnqueue || !hasDequeue || !hasFront || !hasIsEmpty) {
        outputText = "Error: Missing required Queue components.\nMake sure you have implemented:\n- Queue structure\n- createQueue()\n- enqueue()\n- dequeue()\n- front()\n- isEmpty()\n"
        setIsSuccess(false)
      } else {
        // Check if the implementation seems reasonable
        const hasPointers = code.includes("front") && code.includes("rear")
        const hasMemoryAlloc = code.includes("malloc(") && code.includes("free(")
        const hasTestCases = code.includes("printf") && code.includes("enqueue") && code.includes("dequeue")

        if (hasPointers && hasMemoryAlloc && hasTestCases) {
          outputText = "Your implementation looks good! Make sure to test with different cases:\n"
          outputText += "1. Empty queue operations\n"
          outputText += "2. Enqueue until full\n"
          outputText += "3. Dequeue until empty\n"
          outputText += "4. Check front element after operations\n"
          setIsSuccess(true)
        } else {
          outputText = "Implementation incomplete. Check if you have:\n"
          outputText += "- Front and rear pointers in Queue structure\n"
          outputText += "- Proper memory management\n"
          outputText += "- Test cases for all operations\n"
          setIsSuccess(false)
        }
      }

      setOutput(outputText)
    } catch (error) {
      setOutput(`Error: ${String(error)}`)
      setIsSuccess(false)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCode(`// Implement a Queue in C
// Required functions:
// - createQueue(capacity): Create a new queue with given capacity
// - enqueue(queue, item): Add an item to the rear of queue
// - dequeue(queue): Remove and return item from front of queue
// - front(queue): Get front item without removing
// - isEmpty(queue): Check if queue is empty

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    return 0;
}`)
    setOutput("")
    setIsSuccess(false)
  }

  const solutionCode = `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Define the Queue structure
typedef struct Queue {
    int front, rear, size;
    unsigned capacity;
    int* array;
} Queue;

// Function to create a queue
Queue* createQueue(unsigned capacity) {
    Queue* queue = (Queue*)malloc(sizeof(Queue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = (int*)malloc(queue->capacity * sizeof(int));
    return queue;
}

// Function to check if queue is full
bool isFull(Queue* queue) {
    return (queue->size == queue->capacity);
}

// Function to check if queue is empty
bool isEmpty(Queue* queue) {
    return (queue->size == 0);
}

// Function to add an item to the queue
void enqueue(Queue* queue, int item) {
    if (isFull(queue)) {
        printf("Queue is full!\\n");
        return;
    }
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("%d enqueued to queue\\n", item);
}

// Function to remove an item from queue
int dequeue(Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty!\\n");
        return INT_MIN;
    }
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size = queue->size - 1;
    printf("%d dequeued from queue\\n", item);
    return item;
}

// Function to get front of queue
int front(Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty!\\n");
        return INT_MIN;
    }
    return queue->array[queue->front];
}

// Function to get rear of queue
int rear(Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty!\\n");
        return INT_MIN;
    }
    return queue->array[queue->rear];
}

int main() {
    Queue* queue = createQueue(5);
    
    // Test enqueue
    printf("\\nEnqueueing elements:\\n");
    enqueue(queue, 10);
    enqueue(queue, 20);
    enqueue(queue, 30);
    
    // Test dequeue
    printf("\\nDequeueing elements:\\n");
    dequeue(queue);
    
    // Test front
    printf("\\nFront element is %d\\n", front(queue));
    
    // Test enqueue more
    printf("\\nEnqueueing more elements:\\n");
    enqueue(queue, 40);
    enqueue(queue, 50);
    
    // Test dequeue all
    printf("\\nDequeueing all elements:\\n");
    while (!isEmpty(queue)) {
        dequeue(queue);
    }
    
    // Free memory
    free(queue->array);
    free(queue);
    return 0;
}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/topics/queues">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Queues
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Queue Implementation Lab</h1>
          <p className="text-white mb-6">
            Practice implementing a Queue with its core operations.
          </p>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implement the following Queue operations:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>
                    <code>createQueue(capacity)</code> - Create a new queue
                  </li>
                  <li>
                    <code>enqueue(queue, item)</code> - Add an element
                  </li>
                  <li>
                    <code>dequeue(queue)</code> - Remove an element
                  </li>
                  <li>
                    <code>front(queue)</code> - Get front element
                  </li>
                  <li>
                    <code>isEmpty(queue)</code> - Check if empty
                  </li>
                </ul>
                <li>Handle edge cases:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>Empty queue operations</li>
                  <li>Full queue operations</li>
                  <li>Circular array implementation</li>
                  <li>Memory management</li>
                </ul>
                <li>Write test cases in main() to verify your implementation</li>
                <li>Run the code to check if all operations work correctly</li>
              </ol>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="code">Your Code</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
            </TabsList>

            <TabsContent value="code">
              <div className="border rounded-lg overflow-hidden mb-4">
                <div className="bg-background p-2 border-b flex justify-between items-center">
                  <span className="font-medium">Queue Implementation</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={resetCode} className="h-8">
                      <RefreshCw className="h-4 w-4 mr-1" /> Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={runCode}
                      disabled={isRunning}
                      className="h-8 bg-green-600 hover:bg-green-700"
                    >
                      <Play className="h-4 w-4 mr-1" /> Run
                    </Button>
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm focus:outline-none bg-background text-white"
                  spellCheck="false"
                />
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-background p-2 border-b">
                  <span className="font-medium">Output</span>
                </div>
                <pre className="p-4 font-mono text-sm h-48 overflow-auto bg-background text-white">
                  {output || "// Run your code to see the output here"}
                </pre>
              </div>

              {isSuccess && (
                <Alert className="mt-4 bg-green-50 border-green-200">
                  <AlertTitle className="text-green-800">Success!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your Queue implementation looks good! Try testing edge cases and different scenarios.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="solution">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-background p-2 border-b">
                  <span className="font-medium">Solution</span>
                </div>
                <pre className="p-4 font-mono text-sm overflow-auto">{solutionCode}</pre>
              </div>
              <p className="mt-4 text-white">
                This solution demonstrates a complete Queue implementation using a circular array
                with proper memory management and handling of all edge cases. Study how it
                maintains the FIFO property and handles queue overflow/underflow.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Queue Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background p-4 rounded-lg text-white">
                <div className="space-y-2">
                  {output.split('\n').map((line, index) => {
                    if (!line.includes(":")) return null;
                    const [operation, value] = line.split(":");
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <span className="font-medium">{operation}:</span>
                        <span>{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="font-medium">Structure:</span> Use circular array with front and rear pointers
              </p>
              <p>
                <span className="font-medium">Enqueue:</span> Update rear pointer and handle overflow
              </p>
              <p>
                <span className="font-medium">Dequeue:</span> Update front pointer and handle underflow
              </p>
              <p>
                <span className="font-medium">Memory:</span> Free array and queue structure
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/topics/queues/circular" className="text-green-600 hover:underline">
                    Try Circular Queue
                  </Link>
                </li>
                <li>
                  <Link href="/topics/queues/priority" className="text-green-600 hover:underline">
                    Try Priority Queue
                  </Link>
                </li>
                <li>
                  <Link href="/topics/trees" className="text-green-600 hover:underline">
                    Implement BFS using Queue
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 