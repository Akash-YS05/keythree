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
    <div>
      <input placeholder="Label" value={label} onChange={e => setLabel(e.target.value)} />
      <input placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      <button onClick={handleUpdate}>Update Entry</button>
    </div>
  );
}
