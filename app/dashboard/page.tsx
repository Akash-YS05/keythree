"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import toast from "react-hot-toast"
import KeychainForm from "./add-pasword-form"

export default function DashboardPage() {
  const { publicKey } = useWallet()
  const [checkedWallet, setCheckedWallet] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!publicKey) {
        toast.error("Please connect your wallet to access the dashboard.")
      }
      setCheckedWallet(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [publicKey])

  if (!publicKey && !checkedWallet) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-lg">
        Checking wallet connection...
      </div>
    )
  }

  if (!publicKey) {
    return null
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">🔐 Welcome to Your Keychain</h1>
      <p className="text-lg text-zinc-300">You are securely connected. Ready to manage passwords.</p>
      <KeychainForm/>
    </div>
  )
}
