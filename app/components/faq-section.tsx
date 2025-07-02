"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "How is Keychain different from traditional password managers?",
    answer:
      "Unlike traditional password managers that store your data on centralized servers, Keychain uses blockchain technology to distribute your encrypted data across thousands of nodes. You maintain complete ownership of your encryption keys, meaning no company can access your passwords. This eliminates single points of failure and ensures your data remains private and secure even if our company disappears.",
  },
  {
    id: 2,
    question: "Is my data really secure on a public blockchain?",
    answer:
      "Absolutely. Your data is encrypted locally on your device using AES-256 encryption before it ever touches the blockchain. What gets stored on Solana is just encrypted data blobs that are meaningless without your private key. The blockchain provides immutability and redundancy, while your local encryption ensures privacy. Even if someone accessed the blockchain data, they would only see encrypted gibberish.",
  },
  {
    id: 3,
    question: "What happens if I lose my master password or private key?",
    answer:
      "This is the trade-off of true self-custody - you are responsible for your keys. However, we provide multiple recovery options: secure backup phrases (like crypto wallets), encrypted recovery files you can store safely, and optional social recovery through trusted contacts. We're also developing hardware wallet integration for additional security. The key is setting up recovery methods when you first create your account.",
  },
  {
    id: 4,
    question: "How much does Keychain cost to use?",
    answer:
      "Keychain operates on a freemium model. Basic password storage and sync across 3 devices is free forever. Premium features like unlimited devices, secure file storage, family sharing, and advanced security features start at $3/month. Since we use Solana's low-cost blockchain, transaction fees are negligible (fractions of a penny per sync).",
  },
  {
    id: 5,
    question: "Do I need to understand blockchain or cryptocurrency to use Keychain?",
    answer:
      "Not at all! While Keychain is powered by blockchain technology, the user experience is designed to be as simple as any traditional password manager. You don't need to buy cryptocurrency, manage wallets, or understand blockchain concepts. We handle all the technical complexity behind the scenes - you just create an account and start storing passwords.",
  },
//   {
//     id: 6,
//     question: "Can I import my passwords from other password managers?",
//     answer:
//       "Yes! We support importing from all major password managers including LastPass, 1Password, Bitwarden, Dashlane, and Chrome/Safari. Our import tool securely transfers your data and encrypts it with your new Keychain master key. The process is simple and guided, taking just a few minutes to migrate your entire password vault.",
//   },
//   {
//     id: 7,
//     question: "What happens if the Solana network goes down?",
//     answer:
//       "Keychain is designed with offline-first functionality. Your passwords are cached locally on your devices, so you can access them even if the blockchain is temporarily unavailable. When connectivity returns, changes sync automatically. Additionally, Solana has proven to be one of the most reliable blockchains with 99.9%+ uptime, and we're exploring multi-chain support for additional redundancy.",
//   },
  {
    id: 8,
    question: "Is Keychain open source?",
    answer:
      "Yes! Our core encryption and blockchain interaction code is open source and audited by security experts. This transparency allows the community to verify our security claims and contribute to improvements. However, some UI components and premium features remain proprietary to support our business model while keeping the critical security components fully transparent.",
  },

]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const isOpen = openItems.includes(faq.id)

        return (
          <div
            key={faq.id}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:bg-white/10"
          >
            <button
              onClick={() => toggleItem(faq.id)}
              className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
            >
              <h3 className="text-lg font-semibold text-gray-200 pr-4 leading-relaxed">{faq.question}</h3>
              <div className="flex-shrink-0 ml-4">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                )}
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="px-6 pb-5">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
                <p className="text-gray-400 leading-relaxed text-base">{faq.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
