"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, BookOpen, Code, Play } from "lucide-react"

export default function StacksTopicPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Stacks</h1>
          <p className="text-white mb-6">
            Learn about the stack data structure, its operations, and implementations.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="implementation" className="flex items-center gap-2">
                <Code className="h-4 w-4" /> Implementation
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <Play className="h-4 w-4" /> Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="prose max-w-none">
                <h2>What is a Stack?</h2>
                <p>
                  A stack is a linear data structure that follows the Last In First Out (LIFO) principle. This means
                  that the last element added to the stack will be the first one to be removed.
                </p>
                <p>
                  Think of a stack as a pile of books. You can only add or remove books from the top of the pile. The
                  last book you place on top is the first one you'll remove.
                </p>

                <h3>Basic Operations</h3>
                <ul>
                  <li>
                    <strong>Push:</strong> Add an element to the top of the stack
                  </li>
                  <li>
                    <strong>Pop:</strong> Remove the top element from the stack
                  </li>
                  <li>
                    <strong>Peek/Top:</strong> View the top element without removing it
                  </li>
                  <li>
                    <strong>isEmpty:</strong> Check if the stack is empty
                  </li>
                </ul>

                <h3>Visual Representation</h3>
                <div className="bg-background p-4 rounded-lg mb-4">
                  <div className="flex flex-col-reverse items-center">
                    <div className="w-full max-w-xs border-2 border-dashed border-border p-4 text-center">
                      Stack Base
                    </div>
                    {[5, 8, 3, 12].map((item, index) => (
                      <div
                        key={index}
                        className={`w-full max-w-xs border-2 border-border p-4 text-center ${index === 0 ? "bg-green-800 border-green-400" : "bg-background"
                          }`}
                      >
                        {item} {index === 0 && <span className="text-green-600 font-bold">(Top)</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <h3>Time Complexity</h3>
                <ul>
                  <li>
                    <strong>Push:</strong> O(1)
                  </li>
                  <li>
                    <strong>Pop:</strong> O(1)
                  </li>
                  <li>
                    <strong>Peek:</strong> O(1)
                  </li>
                  <li>
                    <strong>isEmpty:</strong> O(1)
                  </li>
                </ul>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" disabled>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button onClick={() => setActiveTab("implementation")}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              <div className="prose max-w-none">
                <h2>Stack Implementation</h2>
                <p>There are multiple ways to implement a stack. The two most common approaches are:</p>
                <ol>
                  <li>Using an array</li>
                  <li>Using a linked list</li>
                </ol>

                <h3>Array Implementation</h3>
                <p>
                  This is the simplest way to implement a stack. We use an array to store elements and a variable to
                  track the top of the stack.
                </p>

                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  <code className="language-javascript">{`class Stack {
  constructor() {
    this.items = [];
    this.top = -1;  // Index of the top element
  }

  // Push operation to add an element to the stack
  push(element) {
    this.items.push(element);
    this.top++;
    return this.items.length;
  }

  // Pop operation to remove the top element
  pop() {
    if (this.isEmpty()) {
      return "Underflow - Stack is empty";
    }
    this.top--;
    return this.items.pop();
  }

  // Peek operation to view the top element
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.top];
  }

  // Check if stack is empty
  isEmpty() {
    return this.top === -1;
  }

  // Get the size of the stack
  size() {
    return this.top + 1;
  }

  // Clear the stack
  clear() {
    this.items = [];
    this.top = -1;
  }
}`}</code>
                </pre>

                <h3>Linked List Implementation</h3>
                <p>
                  We can also implement a stack using a linked list, where each node contains data and a reference to
                  the next node.
                </p>

                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  <code className="language-javascript">{`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  // Push operation to add an element to the stack
  push(element) {
    const newNode = new Node(element);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
    return this.size;
  }

  // Pop operation to remove the top element
  pop() {
    if (this.isEmpty()) {
      return "Underflow - Stack is empty";
    }
    const data = this.top.data;
    this.top = this.top.next;
    this.size--;
    return data;
  }

  // Peek operation to view the top element
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.top.data;
  }

  // Check if stack is empty
  isEmpty() {
    return this.top === null;
  }

  // Get the size of the stack
  getSize() {
    return this.size;
  }

  // Clear the stack
  clear() {
    this.top = null;
    this.size = 0;
  }
}`}</code>
                </pre>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setActiveTab("overview")}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button onClick={() => setActiveTab("applications")}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <div className="prose max-w-none">
                <h2>Applications of Stacks</h2>
                <p>
                  Stacks are used in various applications in computer science and programming. Here are some common use
                  cases:
                </p>

                <h3>1. Function Call Management</h3>
                <p>
                  When a function is called, its execution context is pushed onto the call stack. When the function
                  returns, its context is popped from the stack.
                </p>

                <h3>2. Expression Evaluation</h3>
                <p>
                  Stacks are used to evaluate expressions, especially those with nested parentheses. They help in
                  converting infix expressions to postfix or prefix notation.
                </p>

                <h3>3. Undo Mechanism</h3>
                <p>
                  The undo functionality in text editors and other applications is often implemented using a stack to
                  keep track of operations.
                </p>

                <h3>4. Backtracking Algorithms</h3>
                <p>
                  Algorithms that need to backtrack, like maze solving or depth-first search, use stacks to keep track
                  of the path.
                </p>

                <h3>5. Browser History</h3>
                <p>
                  Web browsers use stacks to implement the back and forward buttons, storing the URLs you've visited.
                </p>

                <h3>Example: Balanced Parentheses</h3>
                <p>A classic problem that uses stacks is checking if parentheses in an expression are balanced.</p>

                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  <code className="language-javascript">{`function areParenthesesBalanced(expr) {
  const stack = [];
  
  for (let i = 0; i < expr.length; i++) {
    let char = expr[i];
    
    // If opening bracket, push to stack
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
      continue;
    }
    
    // If closing bracket, check if it matches the top element
    if (char === ')' || char === ']' || char === '}') {
      // If stack is empty, no matching opening bracket
      if (stack.length === 0) {
        return false;
      }
      
      let top = stack.pop();
      
      // Check for mismatched brackets
      if ((char === ')' && top !== '(') || 
          (char === ']' && top !== '[') || 
          (char === '}' && top !== '{')) {
        return false;
      }
    }
  }
  
  // If stack is empty, all brackets are matched
  return stack.length === 0;
}

// Test cases
console.log(areParenthesesBalanced("()")); // true
console.log(areParenthesesBalanced("({[]})")); // true
console.log(areParenthesesBalanced("({[})")); // false`}</code>
                </pre>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setActiveTab("implementation")}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/topics/stacks/lab">
                    Try It Yourself <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Learning Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overview</span>
                  <span className="text-green-600">Completed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Implementation</span>
                  <span className="text-amber-500">In Progress</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Applications</span>
                  <span className="text-white">Not Started</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Practice Lab</span>
                  <span className="text-white">Not Started</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Related Topics</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/topics/arrays" className="text-green-600 hover:underline">
                    Arrays
                  </Link>
                </li>
                <li>
                  <Link href="/topics/linked-lists" className="text-green-600 hover:underline">
                    Linked Lists
                  </Link>
                </li>
                <li>
                  <Link href="/topics/queues" className="text-green-600 hover:underline">
                    Queues
                  </Link>
                </li>
                <li>
                  <Link href="/topics/recursion" className="text-green-600 hover:underline">
                    Recursion
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-green-600 hover:underline flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" /> Stack Visualization
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:underline flex items-center">
                    <Code className="h-4 w-4 mr-2" /> Stack Problems
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-600 hover:underline flex items-center">
                    <Play className="h-4 w-4 mr-2" /> Video Tutorial
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
