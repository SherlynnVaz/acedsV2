"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LinkedListLabPage() {
  const [code, setCode] = useState(`// Implement a Singly Linked List in C
// Required functions: createNode(), insertAtBeginning(), insertAtEnd(), deleteNode(), printList()

#include <stdio.h>
#include <stdlib.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create an empty list
    // 2. Insert elements at beginning: 10, 20, 30
    // 3. Insert elements at end: 40, 50
    // 4. Delete node with value 20
    // 5. Print the list
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
      const hasNodeStruct = code.includes("struct Node") || code.includes("typedef struct")
      const hasCreateNode = code.includes("createNode")
      const hasInsertAtBeginning = code.includes("insertAtBeginning")
      const hasInsertAtEnd = code.includes("insertAtEnd")
      const hasDeleteNode = code.includes("deleteNode")
      const hasPrintList = code.includes("printList")

      if (!hasNodeStruct || !hasCreateNode || !hasInsertAtBeginning || !hasInsertAtEnd || !hasDeleteNode || !hasPrintList) {
        outputText = "Error: Missing required Linked List components.\nMake sure you have implemented:\n- Node structure\n- createNode()\n- insertAtBeginning()\n- insertAtEnd()\n- deleteNode()\n- printList()\n"
        setIsSuccess(false)
      } else {
        // Check if the implementation seems reasonable
        const hasPointers = code.includes("next")
        const hasMemoryAlloc = code.includes("malloc(") && code.includes("free(")
        const hasTestCases = code.includes("printf") && code.includes("insert") && code.includes("delete")

        if (hasPointers && hasMemoryAlloc && hasTestCases) {
          outputText = "Your implementation looks good! Make sure to test with different cases:\n"
          outputText += "1. Empty list operations\n"
          outputText += "2. Inserting at beginning and end\n"
          outputText += "3. Deleting first, last, and middle nodes\n"
          outputText += "4. Memory management (no leaks)\n"
          setIsSuccess(true)
        } else {
          outputText = "Implementation incomplete. Check if you have:\n"
          outputText += "- Next pointer in Node structure\n"
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
    setCode(`// Implement a Singly Linked List in C
// Required functions: createNode(), insertAtBeginning(), insertAtEnd(), deleteNode(), printList()

#include <stdio.h>
#include <stdlib.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create an empty list
    // 2. Insert elements at beginning: 10, 20, 30
    // 3. Insert elements at end: 40, 50
    // 4. Delete node with value 20
    // 5. Print the list
    return 0;
}`)
    setOutput("")
    setIsSuccess(false)
  }

  const solutionCode = `#include <stdio.h>
#include <stdlib.h>

// Define the Node structure
typedef struct Node {
    int data;
    struct Node* next;
} Node;

// Function to create a new node
Node* createNode(int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        exit(1);
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

// Function to insert at beginning
Node* insertAtBeginning(Node* head, int value) {
    Node* newNode = createNode(value);
    newNode->next = head;
    return newNode;
}

// Function to insert at end
Node* insertAtEnd(Node* head, int value) {
    Node* newNode = createNode(value);
    
    if (head == NULL) {
        return newNode;
    }
    
    Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = newNode;
    return head;
}

// Function to delete a node
Node* deleteNode(Node* head, int value) {
    if (head == NULL) {
        return NULL;
    }
    
    if (head->data == value) {
        Node* temp = head->next;
        free(head);
        return temp;
    }
    
    Node* current = head;
    while (current->next != NULL && current->next->data != value) {
        current = current->next;
    }
    
    if (current->next != NULL) {
        Node* temp = current->next;
        current->next = current->next->next;
        free(temp);
    }
    
    return head;
}

// Function to print the list
void printList(Node* head) {
    Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

// Function to free the list
void freeList(Node* head) {
    Node* current = head;
    while (current != NULL) {
        Node* temp = current;
        current = current->next;
        free(temp);
    }
}

int main() {
    Node* head = NULL;
    
    // Test insertion at beginning
    printf("Inserting at beginning: 10, 20, 30\\n");
    head = insertAtBeginning(head, 30);
    head = insertAtBeginning(head, 20);
    head = insertAtBeginning(head, 10);
    printList(head);
    
    // Test insertion at end
    printf("\\nInserting at end: 40, 50\\n");
    head = insertAtEnd(head, 40);
    head = insertAtEnd(head, 50);
    printList(head);
    
    // Test deletion
    printf("\\nDeleting node with value 20\\n");
    head = deleteNode(head, 20);
    printList(head);
    
    // Free the list
    freeList(head);
    return 0;
}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/topics/linked-lists">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Linked Lists
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Linked List Implementation Lab</h1>
          <p className="text-white mb-6">
            Practice implementing a Singly Linked List with its core operations.
          </p>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implement the following Linked List operations:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>
                    <code>createNode(value)</code> - Create a new node
                  </li>
                  <li>
                    <code>insertAtBeginning(head, value)</code> - Insert at start
                  </li>
                  <li>
                    <code>insertAtEnd(head, value)</code> - Insert at end
                  </li>
                  <li>
                    <code>deleteNode(head, value)</code> - Delete a node
                  </li>
                  <li>
                    <code>printList(head)</code> - Print the list
                  </li>
                </ul>
                <li>Handle edge cases:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>Empty list operations</li>
                  <li>Inserting at beginning and end</li>
                  <li>Deleting first, last, and middle nodes</li>
                  <li>Memory management (allocation and deallocation)</li>
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
                  <span className="font-medium">Linked List Implementation</span>
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
                    Your Linked List implementation looks good! Try testing edge cases and different scenarios.
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
                This solution demonstrates a complete Singly Linked List implementation with proper memory management
                and handling of all edge cases. Study how it handles node insertion, deletion, and memory cleanup.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Linked List Visualization</CardTitle>
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
                <span className="font-medium">Structure:</span> Node with data and next pointer
              </p>
              <p>
                <span className="font-medium">Insert:</span> Handle empty list and non-empty list cases
              </p>
              <p>
                <span className="font-medium">Delete:</span> Handle first node, last node, and middle node cases
              </p>
              <p>
                <span className="font-medium">Memory:</span> Free nodes when deleting and at program end
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
                  <Link href="/topics/linked-lists/doubly" className="text-green-600 hover:underline">
                    Try Doubly Linked Lists
                  </Link>
                </li>
                <li>
                  <Link href="/topics/linked-lists/circular" className="text-green-600 hover:underline">
                    Try Circular Linked Lists
                  </Link>
                </li>
                <li>
                  <Link href="/topics/stacks" className="text-green-600 hover:underline">
                    Implement Stack using Linked List
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