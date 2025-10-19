"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ArrayLabPage() {
  const [code, setCode] = useState(`// Implement Array operations in C
// Required functions: insert(), delete(), search(), display()

#include <stdio.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create an array
    // 2. Insert elements: 10 at index 0, 20 at index 1, 30 at index 1
    // 3. Display array (should show: 10, 30, 20)
    // 4. Delete element at index 1
    // 5. Display array (should show: 10, 20)
    // 6. Search for element 20 (should return index 1)
    // 7. Search for element 30 (should return -1)
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
      const hasInsert = code.includes("void insert") || code.includes("int insert")
      const hasDelete = code.includes("void delete") || code.includes("int delete")
      const hasSearch = code.includes("int search")
      const hasDisplay = code.includes("void display")

      if (!hasInsert || !hasDelete || !hasSearch || !hasDisplay) {
        outputText = "Error: Missing required array functions.\nMake sure you have implemented:\n- insert()\n- delete()\n- search()\n- display()\n"
        setIsSuccess(false)
      } else {
        // Check if the implementation seems reasonable
        const hasArrayAccess = code.includes("arr[")
        const hasLoops = code.includes("for(") || code.includes("while(")
        const hasSizeUpdate = code.includes("n++") || code.includes("n--") || code.includes("(*n)++") || code.includes("(*n)--")
        const hasTestCases = code.includes("printf") && code.includes("insert") && code.includes("delete")

        if (hasArrayAccess && hasLoops && hasSizeUpdate && hasTestCases) {
          outputText = "Your implementation looks good! Make sure to test with different cases:\n"
          outputText += "1. Empty array operations\n"
          outputText += "2. Insert at beginning, middle, end\n"
          outputText += "3. Delete from beginning, middle, end\n"
          outputText += "4. Search for existing and non-existing elements\n"
          setIsSuccess(true)
        } else {
          outputText = "Implementation incomplete. Check if you have:\n"
          outputText += "- Array access and bounds checking\n"
          outputText += "- Size tracking\n"
          outputText += "- Element shifting for insert/delete\n"
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
    setCode(`// Implement Array operations in C
// Required functions: insert(), delete(), search(), display()

#include <stdio.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create an array
    // 2. Insert elements: 10 at index 0, 20 at index 1, 30 at index 1
    // 3. Display array (should show: 10, 30, 20)
    // 4. Delete element at index 1
    // 5. Display array (should show: 10, 20)
    // 6. Search for element 20 (should return index 1)
    // 7. Search for element 30 (should return -1)
    return 0;
}`)
    setOutput("")
    setIsSuccess(false)
  }

  const solutionCode = `#include <stdio.h>
#include <stdbool.h>

#define MAX_SIZE 100

// Function to insert element at position
void insert(int arr[], int* n, int pos, int x) {
    if (*n >= MAX_SIZE) {
        printf("Array is full\\n");
        return;
    }
    if (pos < 0 || pos > *n) {
        printf("Invalid position\\n");
        return;
    }
    
    // Shift elements to make space
    for (int i = *n; i > pos; i--) {
        arr[i] = arr[i-1];
    }
    
    arr[pos] = x;
    (*n)++;
}

// Function to delete element at position
void delete(int arr[], int* n, int pos) {
    if (*n <= 0) {
        printf("Array is empty\\n");
        return;
    }
    if (pos < 0 || pos >= *n) {
        printf("Invalid position\\n");
        return;
    }
    
    // Shift elements to fill the gap
    for (int i = pos; i < *n - 1; i++) {
        arr[i] = arr[i+1];
    }
    
    (*n)--;
}

// Function to search for an element
int search(int arr[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            return i;
        }
    }
    return -1;
}

// Function to display array
void display(int arr[], int n) {
    if (n <= 0) {
        printf("Array is empty\\n");
        return;
    }
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[MAX_SIZE];
    int n = 0;  // Current size of array
    
    // Test insertion
    printf("Inserting elements:\\n");
    insert(arr, &n, 0, 10);  // arr = [10]
    display(arr, n);
    
    insert(arr, &n, 1, 20);  // arr = [10, 20]
    display(arr, n);
    
    insert(arr, &n, 1, 30);  // arr = [10, 30, 20]
    display(arr, n);
    
    // Test deletion
    printf("\\nDeleting element at position 1:\\n");
    delete(arr, &n, 1);      // arr = [10, 20]
    display(arr, n);
    
    // Test search
    printf("\\nSearching for elements:\\n");
    printf("Position of 20: %d\\n", search(arr, n, 20));  // Should print 1
    printf("Position of 30: %d\\n", search(arr, n, 30));  // Should print -1
    
    // Test edge cases
    printf("\\nTesting edge cases:\\n");
    printf("Trying to delete from invalid position:\\n");
    delete(arr, &n, 5);  // Should print error
    
    printf("\\nTrying to insert at invalid position:\\n");
    insert(arr, &n, -1, 40);  // Should print error
    
    printf("\\nTrying to insert in full array:\\n");
    for(int i = 0; i < MAX_SIZE + 1; i++) {
        insert(arr, &n, n, i);  // Last one should print error
    }
    
    return 0;
}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/topics/arrays">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Arrays
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Array Operations Lab</h1>
          <p className="text-white mb-6">
            Practice implementing basic array operations and test your understanding.
          </p>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implement the following array operations:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>
                    <code>insert(arr, n, pos, x)</code> - Insert element x at position pos
                  </li>
                  <li>
                    <code>delete(arr, n, pos)</code> - Delete element at position pos
                  </li>
                  <li>
                    <code>search(arr, n, x)</code> - Search for element x and return its position
                  </li>
                  <li>
                    <code>display(arr, n)</code> - Display all elements in the array
                  </li>
                </ul>
                <li>Handle edge cases:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>Array full (insertion not possible)</li>
                  <li>Array empty (deletion not possible)</li>
                  <li>Invalid position (out of bounds)</li>
                  <li>Element not found (search)</li>
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
                  <span className="font-medium">Array Implementation</span>
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
                  className="w-full h-96 p-4 font-mono text-sm focus:outline-none"
                  spellCheck="false"
                />
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-background p-2 border-b">
                  <span className="font-medium">Output</span>
                </div>
                <pre className="p-4 font-mono text-sm h-48 overflow-auto bg-black text-white">
                  {output || "// Run your code to see the output here"}
                </pre>
              </div>

              {isSuccess && (
                <Alert className="mt-4 bg-green-50 border-green-200">
                  <AlertTitle className="text-green-800">Success!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your array implementation looks good! Try testing edge cases and different scenarios.
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
                This solution demonstrates proper array manipulation with bounds checking and error handling.
                Notice how elements are shifted during insertion and deletion to maintain array continuity.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Array Visualization</CardTitle>
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
                <span className="font-medium">Insert:</span> Shift elements right to make space
              </p>
              <p>
                <span className="font-medium">Delete:</span> Shift elements left to fill gap
              </p>
              <p>
                <span className="font-medium">Search:</span> Check each element sequentially
              </p>
              <p>
                <span className="font-medium">Display:</span> Loop through valid elements
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
                  <Link href="/topics/arrays/sorting" className="text-green-600 hover:underline">
                    Try Sorting Algorithms
                  </Link>
                </li>
                <li>
                  <Link href="/topics/arrays/searching" className="text-green-600 hover:underline">
                    Learn Search Techniques
                  </Link>
                </li>
                <li>
                  <Link href="/topics/linked-lists" className="text-green-600 hover:underline">
                    Explore Linked Lists
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