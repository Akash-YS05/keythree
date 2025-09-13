import { useWallet } from "@solana/wallet-adapter-react"
import { Activity, Bell, Key, Lock, Plus, Search, Settings, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { WalletButton } from "../components/wallet-button"
import toast from "react-hot-toast"

const mockPasswords = [
    { id: 1, name: "Gmail", username: "user@gmail.com", url: "gmail.com", category: "Email" },
    { id: 2, name: "GitHub", username: "developer", url: "github.com", category: "Development" },
    { id: 3, name: "Twitter", username: "@username", url: "twitter.com", category: "Social" },
    { id: 4, name: "Netflix", username: "user@email.com", url: "netflix.com", category: "Entertainment" },
    { id: 5, name: "AWS Console", username: "admin", url: "aws.amazon.com", category: "Cloud" },
  ]
  
  // Dashboard Content Component
  export default function DashboardContent() {
    const { publicKey } = useWallet()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    
    const categories = ["All", "Email", "Development", "Social", "Entertainment", "Cloud"]
    
    const filteredPasswords = mockPasswords.filter(password => {
      const matchesSearch = password.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           password.username.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || password.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Keychain</h1>
                  <p className="text-sm text-gray-400">Self-Custodial Password Manager</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <WalletButton />
              </div>
            </div>
          </div>
        </header>
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Key className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Passwords</p>
                  <p className="text-2xl font-bold text-white">{mockPasswords.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Security Score</p>
                  <p className="text-2xl font-bold text-white">98%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Sync</p>
                  <p className="text-2xl font-bold text-white">2m ago</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search passwords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Password
            </button>
          </div>
  
          {/* Password List */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Your Passwords</h2>
              <p className="text-sm text-gray-400">Manage your encrypted passwords</p>
            </div>
            
            <div className="divide-y divide-gray-700">
              {filteredPasswords.map((password) => (
                <div key={password.id} className="px-6 py-4 hover:bg-gray-700/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{password.name}</h3>
                        <p className="text-sm text-gray-400">{password.username} • {password.url}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">
                        {password.category}
                      </span>
                      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }
  