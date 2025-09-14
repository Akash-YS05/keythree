"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { deriveKey, decryptData } from "../utils/encryption";
import { getProgram, getProvider } from "../utils/anchor";

export default function FetchEntry({ label }: { label: string }) {
  const wallet = useWallet();
  const [password, setPassword] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!wallet.connected || !wallet.publicKey) return alert("Connect wallet");

    const provider = getProvider(wallet);
    const program = getProgram(provider);

    // Derive PDA
    const [entryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(label)],
      program.programId
    );

    console.log("=== FetchEntry Debug ===");
    console.log("Wallet Pubkey:", wallet.publicKey.toBase58());
    console.log("Program ID:", program.programId.toBase58());
    console.log("Derived Entry PDA:", entryPda.toBase58());

    // Fetch and deserialize account data using Anchor
    try {
      const entryAccount = await (program.account as any).passwordEntry.fetch(entryPda);
      
      console.log("Fetched entry:", entryAccount);

      // Decrypt
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
    <div>
      <button onClick={handleFetch}>Fetch Entry</button>
      {password && <p>Decrypted: {password}</p>}
    </div>
  );
}