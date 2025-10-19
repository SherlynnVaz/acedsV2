import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, CheckCircle, Clock } from "lucide-react"

export default function TopicsPage() {
  const topics = [
    {
      id: "arrays",
      title: "Arrays",
      description: "Learn about arrays, their operations, and common algorithms.",
      status: "completed",
      icon: <BookOpen className="h-5 w-5" />,
      statusIcon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    {
      id: "linked-lists",
      title: "Linked Lists",
      description: "Understand singly and doubly linked lists and their implementations.",
      status: "in-progress",
      icon: <BookOpen className="h-5 w-5" />,
      statusIcon: <Clock className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "stacks",
      title: "Stacks",
      description: "Explore stack data structure, LIFO principle, and applications.",
      status: "in-progress",
      icon: <BookOpen className="h-5 w-5" />,
      statusIcon: <Clock className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "queues",
      title: "Queues",
      description: "Learn about queues, FIFO principle, and their implementations.",
      status: "not-started",
      icon: <BookOpen className="h-5 w-5" />,
      statusIcon: <BookOpen className="h-5 w-5 text-gray-400" />,
    },
    {
      id: "trees",
      title: "Trees",
      description: "Understand tree structures, traversals, and binary search trees.",
      status: "not-started",
      icon: <BookOpen className="h-5 w-5" />,
      statusIcon: <BookOpen className="h-5 w-5 text-gray-400" />,
    },
    {
      id: "graphs",
      title: "Graphs",
      description: "Explore graph representations, traversals, and algorithms.",
      status: "not-started",
      icon: <BookOpen className="h-5 w-5" />,
      statusIcon: <BookOpen className="h-5 w-5 text-gray-400" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Structure Topics</h1>
        <p className="text-white">
          Explore our comprehensive collection of data structure topics. Each topic includes theory, implementation, and
          interactive practice labs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Card key={topic.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{topic.title}</CardTitle>
                {topic.statusIcon}
              </div>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-gray-500">
                {topic.status === "completed" && "Completed"}
                {topic.status === "in-progress" && "In Progress"}
                {topic.status === "not-started" && "Not Started"}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant={topic.status === "not-started" ? "outline" : "default"}
                size="sm"
                className="w-full"
              >
                <Link href={`/topics/${topic.id}`}>
                  {topic.status === "completed"
                    ? "Review"
                    : topic.status === "in-progress"
                      ? "Continue"
                      : "Start Learning"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
