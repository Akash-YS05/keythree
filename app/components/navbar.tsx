"use client"

import { useState } from "react"
import { WalletButton } from "./wallet-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] bg-clip-text text-transparent">
                Keychain
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#problem"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition duration-300"
              >
                Problem
              </a>
              <a
                href="#solution"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition duration-300"
              >
                Solution
              </a>
              <a
                href="#why-solana"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition duration-300"
              >
                Why Solana
              </a>
              <a
                href="#docs"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition duration-300"
              >
                Docs
              </a>
              <a
                href="#faq"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition duration-300"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Wallet Button */}
          <div className="hidden md:block">
            <WalletButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-md bg-black/40 rounded-lg mt-2">
              <a href="#problem" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Problem
              </a>
              <a href="#solution" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Solution
              </a>
              <a href="#why-solana" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Why Solana
              </a>
              <a href="#docs" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Docs
              </a>
              <a href="#faq" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                FAQ
              </a>
              <div className="px-3 py-2">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
