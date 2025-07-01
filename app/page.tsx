"use client";

import { WalletButton } from "./components/wallet-button";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "var(--bg-image)" }}
    >
     <div className="flex justify-center items-center w-full pt-10">
      <div className="inline-flex justify-center items-center m-auto px-3 py-1 rounded-full text-gray-200 text-sm font-light mb-6 backdrop-blur-md bg-white/10 border border-white/10 shadow-md">
        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
        Keychain: The self-custodial password manager
      </div>
    </div>

      <p className="text-4xl md:text-6xl tracking-wide leading-18 font-merriweather text-gray-300 text-center max-w-3xl mx-auto">
        Hyperspeed security for your digital life.
        <br />  
        <span className="font-light md:text-3xl py-5">
        Powered by the <span className="bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66]  bg-clip-text text-transparent"> Solana Blockchain </span>
        </span>
      </p>

      <div className="flex justify-center items-center mt-10">
  <button className="px-6 py-3 bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] text-shadow-gray-300 cursor-pointer rounded-md text-xl font-bold tracking-wide flex justify-center items-center shadow-lg hover:from-[#b473f5] hover:to-[#00FFA3] transition duration-300">
    JOIN WAITLIST
  </button>
</div>

    </div>
  );
}
