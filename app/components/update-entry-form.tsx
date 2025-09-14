"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { getProvider, getProgram } from "../utils/anchor";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { deriveKey, encryptData } from "../utils/encryption";

export default function UpdateEntryForm() {
  const wallet = useWallet();
  const [label, setLabel] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Connect wallet first");

    const provider = getProvider(wallet);
    const program = getProgram(provider);

    if (!wallet.signMessage) {
      return alert("Wallet does not support message signing (try Phantom/Solflare).");
    }

    const signature = await wallet.signMessage(new TextEncoder().encode("keychain"));
    const key = await deriveKey(signature);

    const combined = await encryptData(key, newPassword);

    const [entryPda] = await PublicKey.findProgramAddress(
      [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(label)],
      program.programId
    );

    await program.methods
      .updateEntry(Buffer.from(combined))
      .accounts({
        user: wallet.publicKey,
        entry: entryPda,
      })
      .rpc();

    alert("Entry updated!");
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
  <h3 className="text-lg font-outfit text-gray-800">Update Entry</h3>
  <input
    placeholder="Label"
    value={label}
    onChange={(e) => setLabel(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#029f66]/40 text-gray-700"
  />
  <input
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#029f66]/40 text-gray-700"
  />
  <button
    onClick={handleUpdate}
    className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:opacity-90 transition"
  >
    Update Entry
  </button>
</div>

  );
}
