"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { deriveKey, decryptData } from "../utils/encryption";
import { getProgram, getProvider } from "../utils/anchor";

export default function FetchEntry() {
  const wallet = useWallet();
  const [label, setLabel] = useState("");       
  const [password, setPassword] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Connect wallet");
    if (!label) return alert("Please enter a label");

    const provider = getProvider(wallet);
    const program = getProgram(provider);

    // get the PDA
    const [entryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(label)],
      program.programId
    );

    console.log("=== FetchEntry Debug ===");
    console.log("Wallet Pubkey:", wallet.publicKey.toBase58());
    console.log("Program ID:", program.programId.toBase58());
    console.log("Derived Entry PDA:", entryPda.toBase58());

    try {
      //fetch and deserialize account data
      const entryAccount = await (program.account as any).passwordEntry.fetch(entryPda);
      console.log("Fetched entry:", entryAccount);

      // decrypt
      if (!wallet.signMessage) return alert("Wallet does not support signing");
      const signature = await wallet.signMessage(new TextEncoder().encode("keychain"));
      const key = await deriveKey(signature);
      const decrypted = await decryptData(key, new Uint8Array(entryAccount.encryptedData));

      console.log("Decrypted password:", decrypted);
      setPassword(decrypted);

    } catch (error) {
      console.error("Failed to fetch or deserialize account:", error);
      alert("Account not found. Check if the label is correct or if the entry was added on this network.");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm text-center">
      <h3 className="text-lg font-outfit text-gray-800">Fetch Entry</h3>

      <input
        placeholder="Entry Label (e.g. twitter)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a40f8]/40 text-gray-700"
      />

      <button
        onClick={handleFetch}
        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:opacity-90 transition"
      >
        Fetch Entry
      </button>

      {password && (
        <p className="text-gray-700 text-sm mt-3">
          <span className="font-medium">Decrypted:</span> {password}
        </p>
      )}
    </div>
  );
}
