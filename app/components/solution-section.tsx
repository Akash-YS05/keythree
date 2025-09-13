"use client"

import { useState } from "react"

const solutions = [
  {
    id: 1,
    title: "You own your data completely with self-custodial security",
    icon: "🔐",
    details: {
      title: "Self-Custodial Security",
      description:
        "With Keychain, you are the sole owner of your encryption keys and data. No company, government, or third party can access, decrypt, or control your passwords. Your digital sovereignty is guaranteed by cryptographic proof.",
      benefits: [
        { label: "Data Ownership", value: "100%" },
        { label: "Third-party Access", value: "0%" },
        { label: "Encryption Strength", value: "AES-256" },
      ],
      features: [
        "Private keys never leave your device",
        "Zero-knowledge architecture ensures complete privacy",
        "Cryptographic proofs verify data integrity without exposure",
      ],
    },
  },
  {
    id: 2,
    title: "Distributed blockchain storage eliminates single points of failure",
    icon: "🌐",
    details: {
      title: "Decentralized Storage",
      description:
        "Your encrypted data is distributed across thousands of nodes on the Solana blockchain. Even if multiple nodes fail, your data remains accessible and secure. No single entity can take down or corrupt your password vault.",
      benefits: [
        { label: "Network Uptime", value: "99.9%" },
        { label: "Global Nodes", value: "2000+" },
        { label: "Redundancy Factor", value: "1000x" },
      ],
      features: [
        "Data replicated across global network of validators",
        "Automatic failover ensures continuous availability",
        "Immutable blockchain prevents data tampering or loss",
      ],
    },
  },
  {
    id: 3,
    title: "Zero-knowledge encryption means even we can't see your passwords",
    icon: "🛡️",
    details: {
      title: "Zero-Knowledge Architecture",
      description:
        "All encryption and decryption happens locally on your device. Your master password never touches our servers, and your data is encrypted before it reaches the blockchain. We literally cannot access your information, even if we wanted to.",
      benefits: [
        { label: "Local Encryption", value: "100%" },
        { label: "Server Knowledge", value: "0%" },
        { label: "Privacy Score", value: "Perfect" },
      ],
      features: [
        "Client-side encryption with your personal master key",
        "Encrypted data blobs stored on blockchain are meaningless without your key",
        "Open-source code allows independent security audits",
      ],
    },
  },
]

export function SolutionSection() {
  const [selectedSolution, setSelectedSolution] = useState(solutions[0])

  return (
    <section className="relative w-full">
      {/* Soft gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-gray-100 opacity-90 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-20">
        {/* Problem Block */}
        <div className="text-center space-y-8">
  <h2 className="text-4xl md:text-6xl font-outfit text-gray-800 tracking-tight">
    The <span className="font-instrument italic">Problem</span>
  </h2>
  <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
    Passwords remain the most widely used method of authentication, yet the tools we rely on to manage them are deeply flawed.
  </p>

  <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
    <div className="relative px-6">
      <h3 className="text-lg text-gray-800 mb-3 font-outfit ">Centralized Control</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        Traditional password managers store your most sensitive data on centralized servers. A single breach can expose millions of user vaults at once.
      </p>
      <hr className="absolute top-0 right-0 h-full w-px bg-gray-200 hidden md:block" />
    </div>

    <div className="relative px-6">
      <h3 className="text-lg text-gray-800 mb-3 font-outfit">Single Points of Failure</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        If their servers go offline, are censored, or compromised, you lose access to your entire digital identity instantly.
      </p>
      <hr className="absolute top-0 right-0 h-full w-px bg-gray-200 hidden md:block" />
    </div>

    <div className="px-6">
      <h3 className="text-lg text-gray-800 mb-3 font-outfit">Trust Assumptions</h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        You are forced to trust that companies will not peek into, mishandle, or share your secrets — even though history shows repeated security failures.
      </p>
    </div>
  </div>
</div>

        {/* Solution Block */}
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-outfit text-gray-800 tracking-tight">
              The <span className="font-instrument italic">Solution</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              Keychain leverages blockchain technology to remove centralized
              points of failure and put ownership of your secrets back in your
              hands.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Solution List */}
            <div className="space-y-4">
              {solutions.map((solution) => {
                const isSelected = selectedSolution.id === solution.id

                return (
                  <button
                    key={solution.id}
                    onClick={() => setSelectedSolution(solution)}
                    className={`w-full text-left p-5 rounded-lg border transition-all duration-300 ${
                      isSelected
                        ? "border-gray-400 bg-gray-50 shadow-sm"
                        : "border-gray-200 bg-white/50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-100 text-lg">
                        {solution.icon}
                      </div>
                      <p
                        className={`text-base leading-relaxed ${
                          isSelected ? "text-gray-900" : "text-gray-600"
                        }`}
                      >
                        {solution.title}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right Side - Solution Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center bg-gray-100">
                    <span className="text-xl">{selectedSolution.icon}</span>
                  </div>
                  <h3 className="text-xl font-outfit text-gray-800 tracking-tight">
                    {selectedSolution.details.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-base leading-relaxed">
                  {selectedSolution.details.description}
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-4">
                  {selectedSolution.details.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="text-lg text-gray-800">
                        {benefit.value}
                      </div>
                      <div className="text-xs text-gray-500">
                        {benefit.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-base font-outfit text-gray-700 mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedSolution.details.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
