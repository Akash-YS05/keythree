"use client"

import { useState } from "react"
import { useActionState } from "react"
import { addToWaitlist } from "../actions/waitlist"
import { Mail, User, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function WaitlistForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  //@ts-ignore
  const [state, action, isPending] = useActionState(addToWaitlist, null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    // Reset form state when closing modal
    if (state?.success) {
      // Keep success state visible briefly before closing
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="px-6 py-3 bg-gradient-to-r from-[#7a40f8] via-teal-400 to-[#029f66] text-white rounded-md text-xl font-bold tracking-wide flex justify-center items-center shadow-lg hover:from-[#b473f5] hover:to-[#00FFA3] transition duration-300"
      >
        JOIN WAITLIST
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

          {/* Modal Content */}
          <div className="relative w-full max-w-md">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!state?.success ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#7a40f8] to-[#029f66] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h2>
                    <p className="text-gray-400">Be the first to be notified about the launch.</p>
                  </div>

                  {/* Form */}
                  <form action={action} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name (Optional)
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your name"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {state?.error && (
                      <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{state.error}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full py-3 bg-gradient-to-r from-[#7a40f8] to-[#029f66] text-white rounded-lg font-semibold hover:from-[#b473f5] hover:to-[#00FFA3] transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Joining...</span>
                        </>
                      ) : (
                        <span>Join Waitlist</span>
                      )}
                    </button>
                  </form>

                </>
              ) : (
                /* Success State */
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Waitlist!</h2>
                  <p className="text-gray-400 mb-4">{state.message}</p>

                  {state.position && (
                    <div className="bg-gradient-to-r from-[#7a40f8]/20 to-[#029f66]/20 rounded-lg p-4 mb-6">
                      <p className="text-white font-semibold">You're #{state.position} on the list</p>
                      <p className="text-gray-400 text-sm mt-1">We'll notify you as soon as we're ready!</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <button
                      onClick={closeModal}
                      className="w-full py-3 bg-gradient-to-r from-[#7a40f8] to-[#029f66] text-white rounded-lg font-semibold hover:from-[#b473f5] hover:to-[#00FFA3] transition duration-300"
                    >
                      Continue Exploring
                    </button>

                    <div className="flex space-x-3">
                      <button className="flex-1 py-2 bg-white/10 border border-white/20 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition-colors">
                        Share with Friends
                      </button>
                      <button className="flex-1 py-2 bg-white/10 border border-white/20 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition-colors">
                        Follow Updates
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
