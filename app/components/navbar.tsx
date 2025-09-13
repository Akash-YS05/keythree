"use client"

import { useState } from "react"
import { WalletButton } from "./wallet-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-gray-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-outfit">
                Keychain
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#problem"
                className="text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Problem
              </a>
              <a
                href="#solution"
                className="text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Solution
              </a>
              <a
                href="#why-solana"
                className="text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Why Solana
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-gray-900 transition duration-200"
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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-3 pb-4 space-y-2 bg-gray-50 border border-gray-200 rounded-lg mt-2 shadow-sm">
              <a
                href="#problem"
                className="block text-gray-600 hover:text-gray-900 transition"
              >
                Problem
              </a>
              <a
                href="#solution"
                className="block text-gray-600 hover:text-gray-900 transition"
              >
                Solution
              </a>
              <a
                href="#why-solana"
                className="block text-gray-600 hover:text-gray-900 transition"
              >
                Why Solana
              </a>
              <a
                href="#faq"
                className="block text-gray-600 hover:text-gray-900 transition"
              >
                FAQ
              </a>
              <div className="pt-3">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
