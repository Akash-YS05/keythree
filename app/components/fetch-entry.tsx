"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { deriveKey, decryptData } from "../utils/encryption";
import { getProgram, getProvider } from "../utils/anchor";

export default function FetchEntry() {
  const wallet = useWallet();
  const [labels, setLabels] = useState<string[]>([]); // 🔹 list of entries
  const [selectedLabel, setSelectedLabel] = useState("");
  const [password, setPassword] = useState<string | null>(null);

  const fetchLabels = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Connect wallet");

    const provider = getProvider(wallet);
    const program = getProgram(provider);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entries = await (program.account as any).passwordEntry.all([
        {
          memcmp: {
            offset: 8, //discriminator
            bytes: wallet.publicKey.toBase58(), //owner field starts at offset 8
          },
        },
      ]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userLabels = entries.map((e: any) => e.account.label);
      setLabels(userLabels);
      if (userLabels.length > 0) setSelectedLabel(userLabels[0]);
    } catch (err) {
      console.error("Error fetching labels:", err);
      alert("Failed to fetch entries for this wallet.");
    }
  };

  // Fetch and decrypt selected entry
  const handleFetch = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Connect wallet");
    if (!selectedLabel) return alert("Select a label");

    const provider = getProvider(wallet);
    const program = getProgram(provider);

    const [entryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(selectedLabel)],
      program.programId
    );

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entryAccount = await (program.account as any).passwordEntry.fetch(entryPda);

      if (!wallet.signMessage) return alert("Wallet does not support signing");
      const signature = await wallet.signMessage(new TextEncoder().encode("keychain"));
      const key = await deriveKey(signature);
      const decrypted = await decryptData(key, new Uint8Array(entryAccount.encryptedData));

      setPassword(decrypted);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Entry not found or decryption failed.");
    }
  };

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4 p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm text-center">
      <h3 className="text-lg font-outfit text-gray-800">Fetch Entry</h3>

      <button
        onClick={fetchLabels}
        className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
      >
        Load My Entries
      </button>

      {labels.length > 0 && (
        <select
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a40f8]/40 text-gray-700"
        >
          {labels.map((lbl, idx) => (
            <option key={idx} value={lbl}>
              {lbl}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={handleFetch}
        className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:opacity-90 transition"
      >
        Fetch Selected Entry
      </button>

      {password && (
        <div className="mt-4 p-3 rounded-lg bg-gray-100 border border-gray-300 flex justify-between items-center">
          <span className="text-gray-800 font-mono">{password}</span>
          <button
            onClick={handleCopy}
            className="ml-3 px-2 py-1 text-xs rounded bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
