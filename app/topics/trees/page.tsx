"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function TreesPage() {
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
          <h1 className="text-3xl font-bold mb-2">Tree Data Structure</h1>
          <p className="text-white mb-6">
            A Tree is a hierarchical data structure that consists of nodes connected by edges.
            Each node contains a value and references to its child nodes.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <h2 className="text-2xl font-bold">Tree Overview</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Characteristics</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Hierarchical structure with a root node</li>
                  <li>Each node has zero or more child nodes</li>
                  <li>No cycles (acyclic graph)</li>
                  <li>Nodes connected by edges</li>
                  <li>Subtrees are smaller trees within the main tree</li>
                </ul>

                <h3 className="text-xl font-semibold">Types of Trees</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Binary Trees (max 2 children per node)</li>
                  <li>Binary Search Trees (ordered binary trees)</li>
                  <li>AVL Trees (self-balancing BST)</li>
                  <li>Red-Black Trees (self-balancing BST)</li>
                  <li>B-Trees (multi-way search trees)</li>
                  <li>Trie (prefix trees for strings)</li>
                </ul>

                <h3 className="text-xl font-semibold">Time Complexity (BST)</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-background">
                        <th className="border border-gray-300 px-4 py-2">Operation</th>
                        <th className="border border-gray-300 px-4 py-2">Average Case</th>
                        <th className="border border-gray-300 px-4 py-2">Worst Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Search</td>
                        <td className="border border-gray-300 px-4 py-2">O(log n)</td>
                        <td className="border border-gray-300 px-4 py-2">O(n)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Insert</td>
                        <td className="border border-gray-300 px-4 py-2">O(log n)</td>
                        <td className="border border-gray-300 px-4 py-2">O(n)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Delete</td>
                        <td className="border border-gray-300 px-4 py-2">O(log n)</td>
                        <td className="border border-gray-300 px-4 py-2">O(n)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Traversal</td>
                        <td className="border border-gray-300 px-4 py-2">O(n)</td>
                        <td className="border border-gray-300 px-4 py-2">O(n)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-4">
              <h2 className="text-2xl font-bold">Tree Implementation</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Binary Search Tree</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Binary Search Tree implementation in C
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

// Create a new node
Node* createNode(int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Insert a node in BST
Node* insert(Node* root, int value) {
    if (root == NULL) {
        return createNode(value);
    }
    
    if (value < root->data) {
        root->left = insert(root->left, value);
    } else if (value > root->data) {
        root->right = insert(root->right, value);
    }
    
    return root;
}`}
                </pre>

                <h3 className="text-xl font-semibold">Tree Traversals</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Tree traversal implementations
void inorderTraversal(Node* root) {
    if (root != NULL) {
        inorderTraversal(root->left);
        printf("%d ", root->data);
        inorderTraversal(root->right);
    }
}

void preorderTraversal(Node* root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorderTraversal(root->left);
        preorderTraversal(root->right);
    }
}

void postorderTraversal(Node* root) {
    if (root != NULL) {
        postorderTraversal(root->left);
        postorderTraversal(root->right);
        printf("%d ", root->data);
    }
}`}
                </pre>

                <h3 className="text-xl font-semibold">Search and Delete</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Search in BST
Node* search(Node* root, int key) {
    if (root == NULL || root->data == key) {
        return root;
    }
    
    if (key < root->data) {
        return search(root->left, key);
    }
    
    return search(root->right, key);
}

// Find minimum value node
Node* minValueNode(Node* node) {
    Node* current = node;
    while (current && current->left != NULL) {
        current = current->left;
    }
    return current;
}

// Delete a node from BST
Node* deleteNode(Node* root, int key) {
    if (root == NULL) {
        return root;
    }
    
    if (key < root->data) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->data) {
        root->right = deleteNode(root->right, key);
    } else {
        // Node with one child or no child
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
}`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <h2 className="text-2xl font-bold">Tree Applications</h2>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Real-world Applications</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>File System Organization</li>
                  <li>Database Indexing (B-Trees)</li>
                  <li>Syntax Trees in Compilers</li>
                  <li>HTML/XML DOM</li>
                  <li>Decision Trees in AI</li>
                  <li>Network Routing Tables</li>
                </ul>

                <h3 className="text-xl font-semibold">Example: Expression Tree</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-white">
                  {`// Expression Tree implementation
typedef struct ExprNode {
    char data;
    struct ExprNode* left;
    struct ExprNode* right;
} ExprNode;

// Create expression tree node
ExprNode* createExprNode(char value) {
    ExprNode* newNode = (ExprNode*)malloc(sizeof(ExprNode));
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Evaluate expression tree
int evaluate(ExprNode* root) {
    if (root == NULL) return 0;
    
    // Leaf node (operand)
    if (root->left == NULL && root->right == NULL) {
        return root->data - '0';
    }
    
    // Evaluate left and right subtrees
    int leftVal = evaluate(root->left);
    int rightVal = evaluate(root->right);
    
    // Apply operator
    switch(root->data) {
        case '+': return leftVal + rightVal;
        case '-': return leftVal - rightVal;
        case '*': return leftVal * rightVal;
        case '/': return leftVal / rightVal;
    }
    return 0;
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
                  <span>Tree Basics</span>
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
                <Link href="/topics/graphs" className="text-green-400 hover:underline">
                  Graphs
                </Link>
              </li>
              <li>
                <Link href="/topics/heaps" className="text-green-400 hover:underline">
                  Heaps
                </Link>
              </li>
              <li>
                <Link href="/topics/recursion" className="text-green-400 hover:underline">
                  Recursion
                </Link>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Practice</h3>
            <Link href="/topics/trees/lab">
              <Button className="w-full">
                Try Tree Lab
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
} 