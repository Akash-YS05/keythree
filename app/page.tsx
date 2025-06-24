"use client"

import Hyperspeed from "./components/hyperspeed"
import { ArrowRight, Shield, Key, Zap, Lock, Users, Code } from "lucide-react"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <Hyperspeed
            effectOptions={{
              onSpeedUp: () => {},
              onSlowDown: () => {},
              distortion: "turbulentDistortion",
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 3,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [400 * 0.03, 400 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0x131318,
                brokenLines: 0x131318,
                leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                sticks: 0x03b3c3,
              },
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10 px-6">
          {/* Main Content */}
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-noto-serif">
              The Self-Custodial
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Password Manager
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-extralight text-gray-300 max-w-2xl mx-auto">
              Hyperspeed security for your digital life. Powered by the {""}
              <span className="font-bold bg-gradient-to-r md:text-3xl from-[#e555ff] via-[#b473f5] to-[#00FFA3] bg-clip-text text-transparent">
                Solana Blockchain
              </span>
            </p>

            {/* Simple Buttons */}
            <div className="flex gap-4 justify-center pt-8">
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="border border-white/30 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <section className="min-h-screen bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-noto-serif mb-12">
            The Problem?
          </h2>
          <div className="bg-zinc-900/50 border border-zinc-600 rounded-2xl p-12 max-w-4xl mx-auto backdrop-blur-sm">
            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed">
              Users struggle with secure, decentralized password storage. Existing Web2 managers are custodial, and current Web3 solutions are too technical.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-noto-serif mb-8">
              Here's How{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Keychain
              </span>{" "}
              Works
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A self-custodial password manager powered by Solana's speed and cost-efficiency.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-8 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
              <Lock className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Encrypted Vaults</h3>
              <p className="text-gray-400">Password vaults stored via PDAs with military-grade encryption</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-8 backdrop-blur-sm hover:border-cyan-500/50 transition-colors">
              <Key className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Wallet Access</h3>
              <p className="text-gray-400">Access via wallets like Privy, Phantom, and more</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-8 backdrop-blur-sm hover:border-green-500/50 transition-colors">
              <Code className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Open SDK</h3>
              <p className="text-gray-400">Easy dApp integrations with our developer-friendly SDK</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-8 backdrop-blur-sm hover:border-pink-500/50 transition-colors">
              <Shield className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">ZK-Proof Sharing</h3>
              <p className="text-gray-400">Optional zero-knowledge proof based key sharing</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-8 backdrop-blur-sm hover:border-yellow-500/50 transition-colors">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Fast and cheap transactions for practical secret management</p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-8 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Public Good</h3>
              <p className="text-gray-400">Fully open-source and designed for user data sovereignty</p>
            </div>
          </div>

          {/* Why Solana Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-2xl p-12 mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why{" "}
              <span className="bg-gradient-to-r from-[#e555ff] via-[#b473f5] to-[#00FFA3] bg-clip-text text-transparent">
                Solana
              </span>
              ?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Speed & Cost</h4>
                <p className="text-gray-400">Fast and cheap transactions make it practical for storing and updating secrets</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Anchor + PDAs</h4>
                <p className="text-gray-400">Enable composable secure storage architecture</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Mobile Integration</h4>
                <p className="text-gray-400">Solana Mobile Stack integration for seamless mobile experience</p>
              </div>
            </div>
          </div>

          {/* Public Good Section */}
          <div className="text-center bg-zinc-900/30 border border-zinc-700 rounded-2xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Built as a Public Good</h3>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-green-400">Fully Open-Source</h4>
                <p className="text-gray-400">Complete transparency with all code available for audit and contribution</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-blue-400">Developer-First</h4>
                <p className="text-gray-400">Designed to be forked and reused by developers worldwide</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-purple-400">Data Sovereignty</h4>
                <p className="text-gray-400">Strong emphasis on user control and data ownership</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Take Control of Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Security
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the future of password management with true self-custody and blockchain-powered security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 px-12 py-4 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-3">
              Start Building
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="border border-white/30 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-white/10 transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}