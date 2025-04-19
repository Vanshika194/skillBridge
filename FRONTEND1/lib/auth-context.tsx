"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  name: string
  email: string
} | null

interface AuthContextType {
  user: User
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
  checkUserExists: (email: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is stored in localStorage on component mount
    try {
      const storedUser = localStorage.getItem("skillbridge_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)

    try {
      // Store user in localStorage
      localStorage.setItem("skillbridge_user", JSON.stringify(userData))

      // Store user in registered users list if not already there
      if (userData) {
        const registeredUsers = JSON.parse(localStorage.getItem("skillbridge_users") || "[]")
        const userExists = registeredUsers.some((u: any) => u.email === userData.email)

        if (!userExists) {
          registeredUsers.push(userData)
          localStorage.setItem("skillbridge_users", JSON.stringify(registeredUsers))
        }
      }
    } catch (error) {
      console.error("Error storing user data:", error)
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem("skillbridge_user")
    } catch (error) {
      console.error("Error removing user data:", error)
    }
  }

  const checkUserExists = (email: string): boolean => {
    try {
      const registeredUsers = JSON.parse(localStorage.getItem("skillbridge_users") || "[]")
      return registeredUsers.some((user: any) => user.email === email)
    } catch (error) {
      console.error("Error checking user existence:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        checkUserExists,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

