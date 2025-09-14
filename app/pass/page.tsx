"use client"

import AddEntryForm from "../components/add-entry-form";
import UpdateEntryForm from "../components/update-entry-form";
import FetchEntry from "../components/fetch-entry";
import { ArrowBigLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="relative w-full">
      <section className="py-10 text-center">
        <div className="flex items-center gap-32 space-x-4 mb-4">
          <div       
          onClick={() => router.push("/")}
          className="p-2 ml-6 mb-4 border-2 border-gray-400 flex items-center justify-center rounded-sm hover:cursor-pointer hover:bg-gray-200">
            <ArrowBigLeftIcon className="size-6"/>
            {/* <p>Back Home</p> */}
          </div>
          <h1 className="text-5xl md:text-6xl font-outfit tracking-tight text-gray-700 mb-6">
            Manage Your Passwords <span className="font-instrument italic">Securely</span>
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Add, update, and fetch your encrypted entries directly from the Solana blockchain. 
          Your secrets, your control.
        </p>
      </section>

      <section id="add-entry" className="py-10 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-outfit text-gray-800">
            Add a New <span className="font-instrument text-4xl italic">Entry</span>
          </h2>
          <p className="text-gray-600 text-base">
            Store an encrypted password entry on-chain with full self-custodial security.
          </p>
          <AddEntryForm />
        </div>
      </section>

      <section id="update-entry" className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-outfit text-gray-800">
            Update an <span className="font-instrument text-4xl italic">Entry</span>
          </h2>
          <p className="text-gray-600 text-base">
            Change the encrypted data for an existing label. Only you can update your own entries.
          </p>
          <UpdateEntryForm />
        </div>
      </section>

      <section id="fetch-entry" className="py-10 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-outfit text-gray-800">
            Fetch an <span className="font-instrument text-4xl italic">Entry</span>
          </h2>
          <p className="text-gray-600 text-base">
            Retrieve your encrypted password and decrypt it locally with your wallet key.
          </p>
          <FetchEntry />
        </div>
      </section>
    </main>
  );
}
