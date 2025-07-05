"use client"

import { useEffect, useState } from "react"
import { getWaitlistStats } from "../actions/waitlist"

type WaitlistStats = {
  totalSignups: number
  recentSignups: number
}

export function WaitlistStats() {
  const [stats, setStats] = useState<WaitlistStats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getWaitlistStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch waitlist stats:", error)
      }
    }

    fetchStats()

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!stats || stats.totalSignups === 0) return null

  return (
    <div className="flex justify-center items-center w-full pt-5">
      <div className="inline-flex justify-center items-center m-auto px-4 py-2 rounded-full text-gray-200 text-sm font-light backdrop-blur-md bg-white/5 border border-white/10 shadow-md">
        <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
        <span className="font-semibold text-white mr-1">{stats.totalSignups.toLocaleString()}</span>
        <span>people already joined the waitlist</span>
        {stats.recentSignups > 0 && (
          <>
            <span className="mx-2">•</span>
            <span className="text-green-400 font-medium">+{stats.recentSignups} this week</span>
          </>
        )}
      </div>
    </div>
  )
}
