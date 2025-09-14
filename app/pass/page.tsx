// src/pages/index.tsx
import AddEntryForm from "../components/add-entry-form";
import UpdateEntryForm from "../components/update-entry-form";
import FetchEntry from "../components/fetch-entry";

export default function Home() {
  return (
    <main className="relative w-full">
      <section className="py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-outfit tracking-tight text-gray-800 mb-6">
          Manage Your Passwords <span className="font-instrument italic">Securely</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Add, update, and fetch your encrypted entries directly from the Solana blockchain. 
          Your secrets, your control.
        </p>
      </section>

      <section id="add-entry" className="py-20 bg-white border-t border-gray-200">
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

      <section id="update-entry" className="py-20 bg-gray-50 border-t border-gray-200">
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

      <section id="fetch-entry" className="py-20 bg-white border-t border-gray-200">
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
