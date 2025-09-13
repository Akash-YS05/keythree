"use client"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { SolutionSection } from "./components/solution-section"
import { FAQSection } from "./components/faq-section"
import { WaitlistStats } from "./components/waitlist-stats"
import { WaitlistForm } from "./components/waitlist-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed bg-[#fafafa]" >
      <Navbar />

      {/* Hero Section */}
      <div className="flex justify-center items-center w-full pt-30">


        <div className="inline-flex justify-center items-center m-auto px-3 py-1 rounded-full text-gray-700 text-sm font-light mb-6 backdrop-blur-md bg-white/10 border border-white/5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          Keychain: The self-custodial password manager
        </div>
      </div>

    <div className="max-w-5xl mx-auto px-4">
      <p className="text-4xl md:text-7xl tracking-tight leading-tight font-outfit text-gray-700 text-center ">
        Hyperspeed security for your <span className="font-instrument italic tracking-wide">digital life.</span>
        
      </p>
      <p className="text-gray-700 text-lg md:text-lg text-center m-3">
        An on-chain password manager, where only you can access your secrets - no one else
      </p>
      <p className="font-light tracking-tight text-gray-700 text-2xl md:text-3xl py-5 block text-center">
          Powered by the <span className="font-instrument"> Solana Blockchain</span>
      </p>
      <div className="flex justify-center gap-4 mt-6">
  <a
    href="/get-started"
    className="px-6 py-3 bg-gray-900 text-white rounded-sm font-medium shadow-lg hover:opacity-90 transition"
  >
    Get Started
  </a>
  <a
    href="/learn-more"
    className="px-6 py-3 border border-gray-500 text-gray-800 rounded-sm font-medium hover:bg-gray-200 transition"
  >
    Learn More
  </a>
</div>

      <p className="text-sm text-gray-500 text-center mt-2">
  Backed by next-gen blockchain technology • 100% self-custodial
</p>

    </div>

      
      <section id="solution" className="py-24 px-6">
        
          <SolutionSection />
      </section>

      {/* Why Solana Section */}
      <section id="why-solana" className="relative w-full py-20">
  {/* Soft background */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-gray-100 opacity-90 pointer-events-none" />

  <div className="max-w-6xl mx-auto px-6 relative z-10">
    {/* Header */}
    <div className="text-center space-y-6">
      <h2 className="text-4xl md:text-6xl font-outfit text-gray-800 tracking-tight">
        Why <span className="font-instrument italic">Solana ?</span>
      </h2>
      <hr className="h-[2px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent border-0" />
      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        We chose Solana for its unmatched speed, minimal costs, and proven
        security — the ideal foundation for a password manager that must scale
        globally while remaining accessible.
      </p>
    </div>

    <div className="relative max-w-4xl mx-auto">
    <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
  <div className="relative px-6">
    <h3 className="text-lg text-gray-800 mb-3 font-outfit">
      ⚡ Lightning Fast
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      Sub-second transaction times ensure instant password syncing across all your devices without delays.
    </p>
    <div className="absolute top-0 right-0 h-full w-px bg-gray-200 hidden md:block"></div>
  </div>
  
  <div className="relative px-6">
    <h3 className="text-lg text-gray-800 mb-3 font-outfit">
      💰 Ultra Low Fees
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      With fees at fractions of a cent, frequent updates stay affordable and accessible to everyone worldwide.
    </p>
    <div className="absolute top-0 right-0 h-full w-px bg-gray-200 hidden md:block"></div>
  </div>
  
  <div className="px-6">
    <h3 className="text-lg text-gray-800 mb-3 font-outfit">
      🛡️ Battle-Tested Security
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      Solana has secured billions in assets, offering a hardened infrastructure that gives confidence your data is safe.
    </p>
  </div>
</div>
    </div>

    {/* Built for Scale Block */}
    <div className="max-w-3xl mx-auto text-center mt-14">
      <h3 className="text-2xl font-outfit text-gray-800">
        Built for Scale
      </h3>
      <p className="text-base text-gray-600 leading-relaxed">
        Solana can handle over <span className="font-medium">65,000+</span>{" "}
        transactions per second, ensuring Keychain remains fast and responsive
        as we grow to millions of users.
      </p>

      <div className="space-y-4 max-w-sm mx-auto mt-10">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Transaction Speed</span>
          <span className="text-gray-700">{"<"} 1 second</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Average Fee</span>
          <span className="text-gray-700">$0.00025</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Network Uptime</span>
          <span className="text-gray-700">99.9%+</span>
        </div>
      </div>
    </div>

  </div>
</section>


       {/* FAQ Section */}
       <section id="faq" className="py-14 px-6">
        <div className="mx-auto">
          <FAQSection />
        </div>
      </section>

      <section id="faq" className="px-6">
        <div className="mx-auto">
          <Footer />
        </div>
      </section>
    </div>
  )
}