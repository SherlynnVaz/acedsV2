"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle, Clock } from "lucide-react"

const topics = [
  {
    id: "arrays",
    title: "Arrays",
    description: "Learn about arrays, their operations, and common algorithms.",
    progress: 0,
    status: "not-started",
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Understand singly and doubly linked lists and their implementations.",
    progress: 0,
    status: "not-started",
  },
  {
    id: "stacks",
    title: "Stacks",
    description: "Explore stack data structure, LIFO principle, and applications.",
    progress: 0,
    status: "not-started",
  },
  {
    id: "queues",
    title: "Queues",
    description: "Learn about queues, FIFO principle, and their implementations.",
    progress: 0,
    status: "not-started",
  },
  {
    id: "trees",
    title: "Trees",
    description: "Understand tree structures, traversals, and binary search trees.",
    progress: 0,
    status: "not-started",
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Explore graph representations, traversals, and algorithms.",
    progress: 0,
    status: "not-started",
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const completedTopics = topics.filter((topic) => topic.status === "completed").length
  const totalProgress = Math.round((completedTopics / topics.length) * 100)
  const currentTopic = topics.find((topic) => topic.status === "in-progress")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome back, {user?.name || "Student"}!</h1>
          <p className="text-muted-foreground">Continue your journey in mastering data structures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-foreground">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalProgress}%</div>
              <Progress value={totalProgress} className="h-2 mt-2" />
              <p className="text-sm text-muted-foreground mt-2">{completedTopics} of {topics.length} topics completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-foreground">Current Topic</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="font-medium text-foreground">{currentTopic?.title || "No topic in progress"}</div>
              <Progress value={currentTopic?.progress || 0} className="h-2 mt-2" />
            </CardContent>
            {currentTopic && (
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/topics/${currentTopic.id}`}>Continue Learning</Link>
                </Button>
              </CardFooter>
            )}
          </Card>

          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-foreground">Next Challenge</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="font-medium text-foreground">Stack Implementation</div>
              <p className="text-sm text-muted-foreground">Practice coding a stack from scratch</p>
            </CardContent>
            <CardFooter>
              <Button asChild size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/topics/stacks/lab">Start Challenge</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card key={topic.id} className="bg-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground">{topic.title}</CardTitle>
                  {topic.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  ) : topic.status === "in-progress" ? (
                    <Clock className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <CardDescription className="text-muted-foreground">{topic.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <Progress value={topic.progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">{topic.progress}% complete</p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant={topic.status === "not-started" ? "outline" : "default"}
                  size="sm"
                  className={
                    topic.status === "completed"
                      ? "w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      : "w-full"
                  }
                >
                  <Link href={`/topics/${topic.id}`}>
                    {topic.status === "completed"
                      ? "Review"
                      : topic.status === "in-progress"
                        ? "Continue"
                        : "Start Learning"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
