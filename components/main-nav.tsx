"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BookOpen, Home, LogOut, User } from "lucide-react"
import { useEffect, useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // This effect checks localStorage to see if the user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user")
      setIsLoggedIn(!!storedUser)
    }

    checkAuth()

    // Respond to login/register changes in other tabs/windows
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'user') checkAuth()
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [pathname]) // Re-check on every route change

  const handleLogout = async () => {
    // Clear local storage
    localStorage.removeItem("user")

    // Call the logout API endpoint to clear the cookie
    await fetch("/api/auth/logout", { method: "POST" })

    // Force a reload to update the app state and redirect to home
    window.location.href = "/";
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-xl flex items-center mr-8">
          <BookOpen className="h-6 w-6 mr-2 text-primary" />
          <span>AceDS</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href="/topics"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname.startsWith("/topics") ? "text-primary" : "text-muted-foreground",
            )}
          >
            Topics
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {isLoggedIn ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
              {/* This button now has the explicit green styling */}
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}