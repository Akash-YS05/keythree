import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Wallet } from "lucide-react"

// Wallet Connection Check Component
export default function WalletConnectionCheck() {
    const { publicKey } = useWallet()
    const { setVisible } = useWalletModal()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-6">
            Please connect your Solana wallet to access your secure password dashboard.
          </p>
          
          <button
            onClick={() => setVisible(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            We support Phantom, Solflare, and Torus wallets
          </p>
        </div>
      </div>
    )
  }
  