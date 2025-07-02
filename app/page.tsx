"use client"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { SolutionSection } from "./components/solution-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage:  `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), var(--bg-image)` }}>
      <Navbar />

      {/* Hero Section */}
      <div className="flex justify-center items-center w-full pt-20">
        <div className="inline-flex justify-center items-center m-auto px-3 py-1 rounded-full text-gray-200 text-sm font-light mb-6 backdrop-blur-md bg-white/10 border border-white/10 shadow-md">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Keychain: The self-custodial password manager
        </div>
      </div>

      <p className="text-4xl md:text-6xl tracking-wide leading-tight font-merriweather text-gray-300 text-center max-w-5xl mx-auto px-4">
        Hyperspeed security for your digital life.
        <br />
        <span className="text-gray-400 text-lg md:text-lg leading-none tracking-none">
        An on-chain password manager, where only you can access your secrets - no one else
        </span>
        <span className="font-bold text-2xl md:text-3xl py-5 block">
          Powered by the{" "}
          <span className="bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] bg-clip-text text-transparent">
            Solana Blockchain
          </span>
        </span>
      </p>

      <div className="flex justify-center items-center mt-10 mb-20">
        <button className="px-6 py-3 bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] text-white rounded-md text-xl font-bold tracking-wide flex justify-center items-center shadow-lg hover:from-[#b473f5] hover:to-[#00FFA3] transition duration-300">
          JOIN WAITLIST
        </button>
      </div>

      {/* The Solution Section */}
      <section id="solution" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-xl md:text-xl font-light text-gray-400">Traditional password managers are centralized, vulnerable, and put your most sensitive data at risk</h3>
            <h2 className="text-4xl md:text-6xl font-merriweather text-gray-200 m-8">
              The{" "}
              <span className="bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] bg-clip-text text-transparent">
                Solution
              </span>
            </h2>
            <hr className="h-[2px] w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent border-0"/>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto m-4">
              Keychain leverages blockchain technology to create a truly decentralized, secure, and private password
              management experience
            </p>
          </div>

          <SolutionSection />
        </div>
      </section>

      {/* Why Solana Section */}
      <section id="why-solana" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-merriweather text-gray-200 mb-6">
              Why{" "}
              <span className="bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] bg-clip-text text-transparent">
                Solana
              </span>
              ?
            </h2>
            <hr className="h-[2px] w-full bg-gradient-to-r from-transparent via-gray-500 to-transparent border-0"/>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto my-4">
              We chose Solana for its unmatched speed, low costs, and robust security infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7a40f8] to-[#029f66] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Sub-second transaction times mean instant password syncing across all your devices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7a40f8] to-[#029f66] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Ultra Low Fees</h3>
              <p className="text-gray-400">
                Transactions cost fractions of a penny, making frequent updates affordable for everyone.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7a40f8] to-[#029f66] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Battle-Tested Security</h3>
              <p className="text-gray-400">
                Solana's proven track record securing billions in value gives you confidence in your data's safety.
              </p>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-200 mb-4">Built for Scale</h3>
                <p className="text-gray-400 mb-4">
                  Solana can handle 65,000+ transactions per second, ensuring Keychain remains fast and responsive as we
                  grow to millions of users.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Transaction Speed</span>
                    <span className="text-green-400">{"<"} 1 second</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Average Fee</span>
                    <span className="text-green-400">$0.00025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network Uptime</span>
                    <span className="text-green-400">99.9%+</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-[#7a40f8]/20 to-[#029f66]/20 rounded-full mb-4">
                  <span className="text-4xl">🚀</span>
                </div>
                <p className="text-gray-300 font-semibold">Ready for Web3's Future</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}