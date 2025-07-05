"use server"

import { z } from "zod"

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
})

type WaitlistEntry = {
  email: string
  name?: string
  timestamp: string
  id: string
}

// In a real app, you'd use a database. For demo purposes, we'll simulate storage
const waitlistData: WaitlistEntry[] = []

export async function addToWaitlist(formData: FormData) {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const email = formData.get("email") as string
    const name = formData.get("name") as string

    // Validate the data
    const validatedData = waitlistSchema.parse({
      email: email?.trim(),
      name: name?.trim() || undefined,
    })

    // Check if email already exists
    const existingEntry = waitlistData.find((entry) => entry.email.toLowerCase() === validatedData.email.toLowerCase())

    if (existingEntry) {
      return {
        success: false,
        error: "This email is already on our waitlist!",
      }
    }

    // Add to waitlist
    const newEntry: WaitlistEntry = {
      email: validatedData.email,
      name: validatedData.name,
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substring(2, 15),
    }

    waitlistData.push(newEntry)

    // In a real app, you'd save to database here
    console.log("New waitlist entry:", newEntry)
    console.log("Total waitlist entries:", waitlistData.length)

    return {
      success: true,
      message: "Welcome to the waitlist! We'll notify you when Keychain is ready.",
      position: waitlistData.length,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}

export async function getWaitlistStats() {
  return {
    totalSignups: waitlistData.length,
    recentSignups: waitlistData.filter((entry) => {
      const entryDate = new Date(entry.timestamp)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return entryDate > weekAgo
    }).length,
  }
}
