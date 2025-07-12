import { getProgram } from "./anchor";
import { Wallet } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

export const addEntry = async (
  wallet: Wallet,
  label: string,
  encryptedData: Uint8Array
) => {
  const program = getProgram(wallet);

  const [entryPDA] = await PublicKey.findProgramAddressSync(
    [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(label)],
    program.programId
  );

  await program.methods
    .addEntry(label, Array.from(encryptedData))
    .accounts({
      user: wallet.publicKey,
      entry: entryPDA,
      systemProgram: PublicKey.default,
    })
    .rpc();

  return entryPDA;
};


export const updateEntry = async (
    wallet: Wallet,
    label: string,
    newEncryptedData: Uint8Array
  ) => {
    const program = getProgram(wallet);
  
    const [entryPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(label)],
      program.programId
    );
  
    await program.methods
      .updateEntry(Array.from(newEncryptedData))
      .accounts({
        user: wallet.publicKey,
        entry: entryPDA,
        owner: wallet.publicKey,
      })
      .rpc();
  };

  
  export const deleteEntry = async (
    wallet: Wallet,
    label: string
  ) => {
    const program = getProgram(wallet);
  
    const [entryPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("entry"), wallet.publicKey.toBuffer(), Buffer.from(label)],
      program.programId
    );
  
    await program.methods
      .deleteEntry()
      .accounts({
        user: wallet.publicKey,
        entry: entryPDA,
        owner: wallet.publicKey,
      })
      .rpc();
  };