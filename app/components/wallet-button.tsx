"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Wallet, LogOut } from "lucide-react"
import { useMemo } from "react"

export function WalletButton() {
  const { wallet, publicKey, disconnect, connecting } = useWallet()
  const { setVisible } = useWalletModal()

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey])
  const content = useMemo(() => {
    if (connecting) return "Connecting..."
    if (publicKey) return `${base58!.slice(0, 4)}...${base58!.slice(-4)}`
    return "Connect Wallet"
  }, [connecting, publicKey, base58])

  const handleClick = () => {
    if (publicKey) {
      // Show disconnect option or handle wallet actions
      return
    }
    setVisible(true)
  }

  if (publicKey) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-lg px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm font-medium text-white">{content}</span>
        </div>
        <button
          onClick={disconnect}
          className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 hover:border-red-500/50 rounded-lg p-2 transition-colors group"
          title="Disconnect Wallet"
        >
          <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 backdrop-blur-sm border border-white/10"
    >
      <Wallet className="w-4 h-4" />
      {content}
    </button>
  )
}
