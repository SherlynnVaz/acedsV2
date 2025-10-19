"use client";
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Code, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login state on mount
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("user"));
      // Listen for login/logout changes in other tabs or components
      const handleStorage = () => {
        setIsLoggedIn(!!localStorage.getItem("user"));
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, []);

  // Also update on focus (for single tab login/logout)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleFocus = () => {
        setIsLoggedIn(!!localStorage.getItem("user"));
      };
      window.addEventListener("focus", handleFocus);
      return () => window.removeEventListener("focus", handleFocus);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">Master Data Structures Through Interactive Learning</h1>
            <p className="text-xl mb-8 text-muted-foreground">
              An innovative platform for engineering students to learn, practice, and master data structures with
              hands-on coding exercises and real-time feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {!isLoggedIn && (
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/register">Get Started</Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link href="/topics">Explore Topics</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Learn With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Learn through comprehensive tutorials, visualizations, and step-by-step guides tailored for engineering
                students.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Virtual Lab</h3>
              <p className="text-muted-foreground">
                Practice what you learn in our virtual coding environment. Write, test, and debug your code in
                real-time.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Community Support</h3>
              <p className="text-muted-foreground">
                Connect with peers and instructors, participate in discussions, and collaborate on solving complex
                problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Data Structure Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs"].map((topic, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{topic}</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn the fundamentals of {topic.toLowerCase()} and implement them in your favorite programming
                    language.
                  </p>
                  <Link
                    href={`/topics/${topic.toLowerCase().replace(" ", "-")}`}
                    className="text-primary font-medium inline-flex items-center hover:text-primary/90"
                  >
                    Explore <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Aligned with Sustainable Development Goals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-border p-6 rounded-lg bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-primary font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-foreground">Quality Education</h3>
              <p className="text-muted-foreground text-center">
                Providing accessible, high-quality education resources for all engineering students.
              </p>
            </div>
            <div className="border border-border p-6 rounded-lg bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-primary font-bold text-xl">9</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-foreground">Industry & Innovation</h3>
              <p className="text-muted-foreground text-center">
                Fostering innovation through modern technology and industry-relevant skills.
              </p>
            </div>
            <div className="border border-border p-6 rounded-lg bg-card">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-primary font-bold text-xl">17</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center text-foreground">Partnerships</h3>
              <p className="text-muted-foreground text-center">
                Creating a collaborative ecosystem between students, educators, and industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-foreground">AceDS</h3>
              <p className="text-muted-foreground">
                An innovative approach to teaching data structures for engineering students.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/topics" className="text-muted-foreground hover:text-primary">
                    Topics
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-muted-foreground hover:text-primary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-muted-foreground hover:text-primary">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Contact</h4>
              <p className="text-muted-foreground">Have questions? Reach out to us at support@dslearning.edu</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AceDS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
