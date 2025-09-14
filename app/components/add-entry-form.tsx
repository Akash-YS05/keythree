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
    <div>
      <input placeholder="Label" value={label} onChange={e => setLabel(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Add Entry</button>
    </div>
  );
}
