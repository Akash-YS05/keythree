"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { getProvider, getProgram } from "../utils/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useState } from "react";
import { deriveKey, encryptData } from "../utils/encryption";

export default function AddEntryForm() {
  const wallet = useWallet();
  const [label, setLabel] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!wallet.publicKey) return alert("Connect your wallet first!");

    const provider = getProvider(wallet);
    const program = getProgram(provider);

    if (!wallet.signMessage) {
      return alert("Wallet does not support message signing (try Phantom/Solflare).");
    }

    const signature = await wallet.signMessage(new TextEncoder().encode("keychain"));
    const key = await deriveKey(signature);

    const combined = await encryptData(key, password);

    const [entryPda, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(label)],
      program.programId
    );

    
    console.log("=== AddEntry Debug ===");
    console.log("Wallet Pubkey:", wallet.publicKey.toBase58());
    console.log("Entry PDA:", entryPda.toBase58());
    console.log("Bump:", bump);
    console.log("Wallet balance (lamports):", await provider.connection.getBalance(wallet.publicKey));

 
    await program.methods
      .addEntry(label, Buffer.from(combined))
      .accounts({
        user: wallet.publicKey,
        entry: entryPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    alert("Entry added!");
    setLabel("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
  <h3 className="text-lg font-outfit text-gray-800">Add New Entry</h3>
  <input
    placeholder="Label"
    value={label}
    onChange={(e) => setLabel(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a40f8]/40 text-gray-700"
  />
  <input
    placeholder="Password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a40f8]/40 text-gray-700"
  />
  <button
    onClick={handleSubmit}
    className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:opacity-90 transition"
  >
    Add Entry
  </button>
</div>

  );
}
