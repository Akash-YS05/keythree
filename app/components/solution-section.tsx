"use client"

import { useState } from "react"

const solutions = [
  {
    id: 1,
    title: "You own your data completely with self-custodial security",
    icon: "🔐",
    color: "purple",
    details: {
      title: "Self-Custodial Security",
      description: "With Keychain, you are the sole owner of your encryption keys and data. No company, government, or third party can access, decrypt, or control your passwords. Your digital sovereignty is guaranteed by cryptographic proof.",
      benefits: [
        { label: "Data Ownership", value: "100%" },
        { label: "Third-party Access", value: "0%" },
        { label: "Encryption Strength", value: "AES-256" }
      ],
      features: [
        "Private keys never leave your device",
        "Zero-knowledge architecture ensures complete privacy",
        "Cryptographic proofs verify data integrity without exposure"
      ]
    }
  },
  {
    id: 2,
    title: "Distributed blockchain storage eliminates single points of failure",
    icon: "🌐",
    color: "teal",
    details: {
      title: "Decentralized Storage",
      description: "Your encrypted data is distributed across thousands of nodes on the Solana blockchain. Even if multiple nodes fail, your data remains accessible and secure. No single entity can take down or corrupt your password vault.",
      benefits: [
        { label: "Network Uptime", value: "99.9%" },
        { label: "Global Nodes", value: "2000+" },
        { label: "Redundancy Factor", value: "1000x" }
      ],
      features: [
        "Data replicated across global network of validators",
        "Automatic failover ensures continuous availability",
        "Immutable blockchain prevents data tampering or loss"
      ]
    }
  },
  {
    id: 3,
    title: "Zero-knowledge encryption means even we can't see your passwords",
    icon: "🛡️",
    color: "green",
    details: {
      title: "Zero-Knowledge Architecture",
      description: "All encryption and decryption happens locally on your device. Your master password never touches our servers, and your data is encrypted before it reaches the blockchain. We literally cannot access your information, even if we wanted to.",
      benefits: [
        { label: "Local Encryption", value: "100%" },
        { label: "Server Knowledge", value: "0%" },
        { label: "Privacy Score", value: "Perfect" }
      ],
      features: [
        "Client-side encryption with your personal master key",
        "Encrypted data blobs stored on blockchain are meaningless without your key",
        "Open-source code allows independent security audits"
      ]
    }
  }
]

export function SolutionSection() {
  const [selectedSolution, setSelectedSolution] = useState(solutions[0])

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      purple: {
        // bg: isSelected ? "bg-purple-500/20" : "bg-purple-500/10",
        border: isSelected ? "border-purple-500/50" : "border-purple-500/20",
        text: "text-purple-400",
        hover: "hover:bg-purple-500/15 hover:border-purple-500/30"
      },
      teal: {
        // bg: isSelected ? "bg-teal-500/20" : "bg-teal-500/10",
        border: isSelected ? "border-teal-500/50" : "border-teal-500/20",
        text: "text-teal-400",
        hover: "hover:bg-teal-500/15 hover:border-teal-500/30"
      },
      green: {
        // bg: isSelected ? "bg-green-500/20" : "bg-green-500/10",
        border: isSelected ? "border-green-500/50" : "border-green-500/20",
        text: "text-green-400",
        hover: "hover:bg-green-500/15 hover:border-green-500/30"
      }
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Left Side - Solution List */}
      <div className="space-y-4">
        {solutions.map((solution) => {
          const isSelected = selectedSolution.id === solution.id
          const colorClasses = getColorClasses(solution.color, isSelected)
          
          return (
            <button
              key={solution.id}
              onClick={() => setSelectedSolution(solution)}
              className={`w-full text-left p-5 my-4 rounded-lg border backdrop-blur-md transition-all duration-300  ${colorClasses.border} ${colorClasses.hover} ${isSelected ? 'shadow-lg' : ''}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 `}>
                  <span className="text-2xl">{solution.icon}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-lg font-medium ${isSelected ? 'text-white' : 'text-gray-300'} leading-relaxed`}>
                    {solution.title}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Right Side - Solution Details */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center`}>
              <span className="text-3xl">{selectedSolution.icon}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-200">{selectedSolution.details.title}</h3>
              <div className="w-12 h-1 bg-gradient-to-r from-[#7a40f8] to-[#029f66] rounded-full mt-2"></div>
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">
            {selectedSolution.details.description}
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-4">
            {selectedSolution.details.benefits.map((benefit, index) => (
              <div key={index} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-white mb-1">{benefit.value}</div>
                <div className="text-sm text-gray-400">{benefit.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-3">Key Features:</h4>
            <ul className="space-y-2">
              {selectedSolution.details.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#7a40f8] to-[#029f66] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}