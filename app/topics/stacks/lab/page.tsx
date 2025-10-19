"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StackLabPage() {
  const [code, setCode] = useState(`// Implement a Stack in C
// Required functions: createStack(), push(), pop(), peek(), isEmpty()

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create a stack
    // 2. Check if it's empty (should print true)
    // 3. Push elements: 10, 20, 30
    // 4. Peek top element (should print 30)
    // 5. Pop an element (should print 30)
    // 6. Peek again (should print 20)
    // 7. Check if empty (should print false)
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
      const hasStackStruct = code.includes("typedef struct") || code.includes("struct Stack")
      const hasCreateStack = code.includes("createStack")
      const hasPush = code.includes("void push") || code.includes("int push")
      const hasPop = code.includes("int pop")
      const hasPeek = code.includes("int peek")
      const hasIsEmpty = code.includes("bool isEmpty")

      if (!hasStackStruct || !hasCreateStack || !hasPush || !hasPop || !hasPeek || !hasIsEmpty) {
        outputText = "Error: Missing required stack functions or structure.\nMake sure you have implemented:\n- Stack structure\n- createStack()\n- push()\n- pop()\n- peek()\n- isEmpty()\n"
        setIsSuccess(false)
      } else {
        // Check if the implementation seems reasonable
        const hasArray = code.includes("int items[") || code.includes("int *items")
        const hasTopIndex = code.includes("int top")
        const hasMemoryAllocation = code.includes("malloc(") && code.includes("free(")
        const hasTestCases = code.includes("printf") && code.includes("push") && code.includes("pop")

        if (hasArray && hasTopIndex && hasMemoryAllocation && hasTestCases) {
          outputText = "Your implementation looks good! Make sure to test with different cases:\n"
          outputText += "1. Empty stack operations\n"
          outputText += "2. Push to full stack (overflow)\n"
          outputText += "3. Pop from empty stack (underflow)\n"
          outputText += "4. Multiple push/pop operations\n"
          setIsSuccess(true)
        } else {
          outputText = "Implementation incomplete. Check if you have:\n"
          outputText += "- Array or dynamic memory for storage\n"
          outputText += "- Top index tracking\n"
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
    setCode(`// Implement a Stack in C
// Required functions: createStack(), push(), pop(), peek(), isEmpty()

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// Your implementation here

int main() {
    // Test your implementation here
    // Example test cases:
    // 1. Create a stack
    // 2. Check if it's empty (should print true)
    // 3. Push elements: 10, 20, 30
    // 4. Peek top element (should print 30)
    // 5. Pop an element (should print 30)
    // 6. Peek again (should print 20)
    // 7. Check if empty (should print false)
    return 0;
}`)
    setOutput("")
    setIsSuccess(false)
  }

  const solutionCode = `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

// Define the Stack structure
typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

// Function to initialize stack
Stack* createStack() {
    Stack* stack = (Stack*)malloc(sizeof(Stack));
    stack->top = -1;
    return stack;
}

// Function to push an element
void push(Stack* stack, int item) {
    if (stack->top == MAX_SIZE - 1) {
        printf("Stack Overflow\\n");
        return;
    }
    stack->items[++stack->top] = item;
}

// Function to pop an element
int pop(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack Underflow\\n");
        return -1;
    }
    return stack->items[stack->top--];
}

// Function to peek at the top element
int peek(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty\\n");
        return -1;
    }
    return stack->items[stack->top];
}

// Function to check if stack is empty
bool isEmpty(Stack* stack) {
    return stack->top == -1;
}

int main() {
    Stack* stack = createStack();
    
    printf("Is empty: %s\\n", isEmpty(stack) ? "true" : "false");
    
    push(stack, 10);
    push(stack, 20);
    push(stack, 30);
    
    printf("Top element: %d\\n", peek(stack));
    printf("Popped: %d\\n", pop(stack));
    printf("New top: %d\\n", peek(stack));
    printf("Is empty: %s\\n", isEmpty(stack) ? "true" : "false");
    
    // Test overflow
    for(int i = 0; i < MAX_SIZE + 1; i++) {
        push(stack, i);
    }
    
    // Test underflow
    for(int i = 0; i < MAX_SIZE + 1; i++) {
        pop(stack);
    }
    
    free(stack);
    return 0;
}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/topics/stacks">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Stacks
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">Stack Implementation Lab</h1>
          <p className="text-white mb-6">
            Practice implementing a stack data structure with its core operations.
          </p>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Implement the following stack operations:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>
                    <code>createStack()</code> - Initialize a new stack
                  </li>
                  <li>
                    <code>push(stack, item)</code> - Add an element to the top
                  </li>
                  <li>
                    <code>pop(stack)</code> - Remove and return the top element
                  </li>
                  <li>
                    <code>peek(stack)</code> - Return the top element without removing
                  </li>
                  <li>
                    <code>isEmpty(stack)</code> - Check if stack is empty
                  </li>
                </ul>
                <li>Handle edge cases:</li>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>Stack overflow (pushing to full stack)</li>
                  <li>Stack underflow (popping from empty stack)</li>
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
                  <span className="font-medium">Stack Implementation</span>
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
                    Your stack implementation looks good! Try testing edge cases and different scenarios.
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
                This solution demonstrates a complete stack implementation with proper error handling,
                memory management, and comprehensive test cases. Study how it handles edge cases and
                maintains the stack&apos;s LIFO (Last-In-First-Out) property.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Stack Visualization</CardTitle>
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
                <span className="font-medium">Structure:</span> Use an array and top index
              </p>
              <p>
                <span className="font-medium">Push:</span> Increment top, then add element
              </p>
              <p>
                <span className="font-medium">Pop:</span> Return element, then decrement top
              </p>
              <p>
                <span className="font-medium">Memory:</span> Allocate in create, free when done
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
                  <Link href="/topics/stacks/applications" className="text-green-600 hover:underline">
                    Stack Applications
                  </Link>
                </li>
                <li>
                  <Link href="/topics/queues" className="text-green-600 hover:underline">
                    Learn About Queues
                  </Link>
                </li>
                <li>
                  <Link href="/topics/linked-lists" className="text-green-600 hover:underline">
                    Try Linked Lists
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
