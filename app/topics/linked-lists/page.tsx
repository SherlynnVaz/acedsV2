"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Code2, Info, Lightbulb } from "lucide-react"

export default function LinkedListsPage() {
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
          <h1 className="text-3xl font-bold mb-2">Linked Lists</h1>
          <p className="text-white mb-6">
            A linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">
                <Info className="h-4 w-4 mr-2" /> Overview
              </TabsTrigger>
              <TabsTrigger value="implementation">
                <Code2 className="h-4 w-4 mr-2" /> Implementation
              </TabsTrigger>
              <TabsTrigger value="applications">
                <Lightbulb className="h-4 w-4 mr-2" /> Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Linked List Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white">
                    A linked list is a linear data structure where elements are not stored at contiguous memory locations.
                    Instead, each element (node) contains a data field and a reference (link) to the next node in the sequence.
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Key Characteristics:</h3>
                    <ul className="list-disc list-inside space-y-1 text-white">
                      <li>Dynamic size - can grow or shrink during program execution</li>
                      <li>Efficient insertion and deletion at any position</li>
                      <li>No memory wastage (allocates memory as needed)</li>
                      <li>Sequential access (no random access)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Types of Linked Lists:</h3>
                    <ul className="list-disc list-inside space-y-1 text-white">
                      <li>Singly Linked List - each node points to the next node</li>
                      <li>Doubly Linked List - each node points to both next and previous nodes</li>
                      <li>Circular Linked List - last node points back to the first node</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementation">
              <Card>
                <CardHeader>
                  <CardTitle>Linked List Implementation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Node Structure:</h3>
                    <pre className="bg-background text-white p-4 rounded-lg overflow-x-auto">
                      {`struct Node {
    int data;
    struct Node* next;
};`}
                    </pre>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Basic Operations:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Insertion at beginning, end, or specific position</li>
                      <li>Deletion from beginning, end, or specific position</li>
                      <li>Traversal and searching</li>
                      <li>Reversing the list</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Time Complexity:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Insertion at beginning: O(1)</li>
                      <li>Insertion at end: O(n)</li>
                      <li>Deletion: O(n)</li>
                      <li>Searching: O(n)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Linked List Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Common Use Cases:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Implementation of stacks and queues</li>
                      <li>Dynamic memory allocation</li>
                      <li>Undo functionality in software</li>
                      <li>Hash table collision handling</li>
                      <li>Polynomial representation and arithmetic</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Real-world Examples:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Music playlist navigation</li>
                      <li>Web browser history</li>
                      <li>Image viewer gallery</li>
                      <li>File system navigation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Link href="/topics/linked-lists/lab">
              <Button className="w-full">
                Try the Linked List Lab
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Linked List Basics</span>
                  <span className="text-sm text-green-600">Completed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Implementation</span>
                  <span className="text-sm text-yellow-600">In Progress</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Applications</span>
                  <span className="text-sm text-white">Not Started</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Related Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/topics/arrays" className="block text-green-600 hover:underline">
                  Arrays
                </Link>
                <Link href="/topics/stacks" className="block text-green-600 hover:underline">
                  Stacks
                </Link>
                <Link href="/topics/queues" className="block text-green-600 hover:underline">
                  Queues
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 