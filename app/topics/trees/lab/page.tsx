"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TreeLabPage() {
  const [code, setCode] = useState(`// Implement a Binary Search Tree in C
// Required functions: createNode(), insert(), search(), delete(), inorderTraversal()

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create an empty BST
    // 2. Insert elements: 50, 30, 70, 20, 40, 60, 80
    // 3. Print inorder traversal (should be sorted)
    // 4. Search for elements: 40 (exists) and 90 (doesn't exist)
    // 5. Delete elements and verify tree structure
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
      const hasInsert = code.includes("insert")
      const hasSearch = code.includes("search")
      const hasDelete = code.includes("delete")
      const hasInorder = code.includes("inorderTraversal")

      if (!hasNodeStruct || !hasCreateNode || !hasInsert || !hasSearch || !hasDelete || !hasInorder) {
        outputText = "Error: Missing required BST components.\nMake sure you have implemented:\n- Node structure\n- createNode()\n- insert()\n- search()\n- delete()\n- inorderTraversal()\n"
        setIsSuccess(false)
      } else {
        // Check if the implementation seems reasonable
        const hasPointers = code.includes("left") && code.includes("right")
        const hasMemoryAlloc = code.includes("malloc(") && code.includes("free(")
        const hasRecursion = (code.match(/insert[\s\S]*insert/) || []).length > 0 ||
          (code.match(/search[\s\S]*search/) || []).length > 0 ||
          (code.match(/delete[\s\S]*delete/) || []).length > 0
        const hasTestCases = code.includes("printf") && code.includes("insert") && code.includes("search")

        if (hasPointers && hasMemoryAlloc && hasRecursion && hasTestCases) {
          outputText = "Your implementation looks good! Make sure to test with different cases:\n"
          outputText += "1. Empty tree operations\n"
          outputText += "2. Inserting duplicates\n"
          outputText += "3. Deleting nodes with 0, 1, and 2 children\n"
          outputText += "4. Searching for non-existent elements\n"
          setIsSuccess(true)
        } else {
          outputText = "Implementation incomplete. Check if you have:\n"
          outputText += "- Left and right pointers in Node structure\n"
          outputText += "- Proper memory management\n"
          outputText += "- Recursive implementation of operations\n"
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
    setCode(`// Implement a Binary Search Tree in C
// Required functions: createNode(), insert(), search(), delete(), inorderTraversal()

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create an empty BST
    // 2. Insert elements: 50, 30, 70, 20, 40, 60, 80
    // 3. Print inorder traversal (should be sorted)
    // 4. Search for elements: 40 (exists) and 90 (doesn't exist)
    // 5. Delete elements and verify tree structure
    return 0;
}`)
    setOutput("")
    setIsSuccess(false)
  }

  const solutionCode = `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Define the Node structure
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

// Function to create a new node
Node* createNode(int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\\n");
        exit(1);
    }
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Function to insert a value into BST
Node* insert(Node* root, int value) {
    if (root == NULL) {
        return createNode(value);
    }
    
    if (value < root->data) {
        root->left = insert(root->left, value);
    } else if (value > root->data) {
        root->right = insert(root->right, value);
    }
    // If value equals root->data, ignore duplicate
    
    return root;
}

// Function to search for a value
Node* search(Node* root, int value) {
    if (root == NULL || root->data == value) {
        return root;
    }
    
    if (value < root->data) {
        return search(root->left, value);
    }
    return search(root->right, value);
}

// Function to find minimum value node
Node* minValueNode(Node* node) {
    Node* current = node;
    while (current && current->left != NULL) {
        current = current->left;
    }
    return current;
}

// Function to delete a node
Node* deleteNode(Node* root, int value) {
    if (root == NULL) {
        return root;
    }
    
    if (value < root->data) {
        root->left = deleteNode(root->left, value);
    } else if (value > root->data) {
        root->right = deleteNode(root->right, value);
    } else {
        // Node with only one child or no child
        if (root->left == NULL) {
            Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            Node* temp = root->left;
            free(root);
            return temp;
        }
        
        // Node with two children
        Node* temp = minValueNode(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}

// Function for inorder traversal
void inorderTraversal(Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        printf("%d ", root->data);
        inorderTraversal(root->right);
    }
}

// Function to free the tree
void freeTree(Node* root) {
    if (root != NULL) {
        freeTree(root->left);
        freeTree(root->right);
        free(root);
    }
}

int main() {
    Node* root = NULL;
    
    // Test insertion
    printf("Inserting elements: 50, 30, 70, 20, 40, 60, 80\\n");
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);
    insert(root, 40);
    insert(root, 60);
    insert(root, 80);
    
    // Test inorder traversal
    printf("Inorder traversal (should be sorted): ");
    inorderTraversal(root);
    printf("\\n");
    
    // Test search
    printf("\\nSearching for 40: ");
    Node* found = search(root, 40);
    if (found != NULL) {
        printf("Found!\\n");
    } else {
        printf("Not found!\\n");
    }
    
    printf("Searching for 90: ");
    found = search(root, 90);
    if (found != NULL) {
        printf("Found!\\n");
    } else {
        printf("Not found!\\n");
    }
    
    // Test deletion
    printf("\\nDeleting 30 (node with two children)\\n");
    root = deleteNode(root, 30);
    printf("Inorder traversal after deletion: ");
    inorderTraversal(root);
    printf("\\n");
    
    printf("\\nDeleting 20 (leaf node)\\n");
    root = deleteNode(root, 20);
    printf("Inorder traversal after deletion: ");
    inorderTraversal(root);
    printf("\\n");
    
    // Free the tree
    freeTree(root);
    return 0;
}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/topics/trees">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Trees
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Binary Search Tree Implementation Lab</h1>
          <p className="text-white mb-6">
            Practice implementing a Binary Search Tree with its core operations.
          </p>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implement the following BST operations:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>
                    <code>createNode(value)</code> - Create a new node
                  </li>
                  <li>
                    <code>insert(root, value)</code> - Insert a new value
                  </li>
                  <li>
                    <code>search(root, value)</code> - Search for a value
                  </li>
                  <li>
                    <code>delete(root, value)</code> - Delete a node
                  </li>
                  <li>
                    <code>inorderTraversal(root)</code> - Print sorted elements
                  </li>
                </ul>
                <li>Handle edge cases:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>Empty tree operations</li>
                  <li>Duplicate values</li>
                  <li>Deleting nodes with 0, 1, or 2 children</li>
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
                  <span className="font-medium">BST Implementation</span>
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
                    Your BST implementation looks good! Try testing edge cases and different scenarios.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="solution">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-background p-2 border-b">
                  <span className="font-medium text-white">Solution</span>
                </div>
                <pre className="p-4 font-mono text-sm overflow-auto bg-background text-white">{solutionCode}</pre>
              </div>
              <p className="mt-4 text-white">
                This solution demonstrates a complete BST implementation with proper memory management
                and handling of all edge cases. Study how it handles node deletion with different
                numbers of children and maintains the BST property.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>BST Visualization</CardTitle>
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
                <span className="font-medium">Structure:</span> Node with data and left/right pointers
              </p>
              <p>
                <span className="font-medium">Insert:</span> Compare with root, go left/right recursively
              </p>
              <p>
                <span className="font-medium">Delete:</span> Handle 0, 1, 2 children cases separately
              </p>
              <p>
                <span className="font-medium">Memory:</span> Free nodes in post-order traversal
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
                  <Link href="/topics/trees/avl" className="text-green-600 hover:underline">
                    Try AVL Trees
                  </Link>
                </li>
                <li>
                  <Link href="/topics/trees/applications" className="text-green-600 hover:underline">
                    Tree Applications
                  </Link>
                </li>
                <li>
                  <Link href="/topics/graphs" className="text-green-600 hover:underline">
                    Explore Graphs
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