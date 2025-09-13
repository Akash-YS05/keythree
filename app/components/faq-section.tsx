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
      "This is the trade-off of true self-custody – you are responsible for your keys. However, we provide multiple recovery options: secure backup phrases (like crypto wallets), encrypted recovery files you can store safely, and optional social recovery through trusted contacts. We're also developing hardware wallet integration for additional security. The key is setting up recovery methods when you first create your account.",
  },
  {
    id: 4,
    question: "Do I need to understand blockchain or cryptocurrency to use Keychain?",
    answer:
      "Not at all! While Keychain is powered by blockchain technology, the user experience is designed to be as simple as any traditional password manager. You don't need to buy cryptocurrency, manage wallets, or understand blockchain concepts. We handle all the technical complexity behind the scenes – you just create an account and start storing passwords.",
  },
  {
    id: 5,
    question: "Is Keychain open source?",
    answer:
      "Yes! Our core encryption and blockchain interaction code is open source and audited by security experts. This transparency allows the community to verify our security claims and contribute to improvements. However, some UI components and premium features remain proprietary to support our business model while keeping the critical security components fully transparent.",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section className="relative w-full py-24">
      {/* subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-gray-100 opacity-90 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-outfit text-gray-800">
            Frequently Asked <span className="font-instrument italic">Questions</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Keychain, security, and how it works.
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {faqs.map((faq) => {
            const isOpen = openItems.includes(faq.id)

            return (
              <div key={faq.id} className="py-6">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg text-gray-700 leading-relaxed pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p className="text-gray-600 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
