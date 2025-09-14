import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import type { Wallet } from "@coral-xyz/anchor/dist/cjs/provider"; 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../idl/keychain.json";

// const programID = new PublicKey("TXHddDGCYaoQqPmQatT7xYAWPfrSaVo5FosrxaTcncF");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProvider(walletAdapter: any): AnchorProvider {
  if (!walletAdapter?.publicKey) throw new Error("Wallet not connected");

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const wallet: Wallet = {
    publicKey: walletAdapter.publicKey,
    signTransaction: walletAdapter.signTransaction,
    signAllTransactions: walletAdapter.signAllTransactions,
  };

  return new AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });
}

export function getProgram(provider: AnchorProvider) {
  return new Program(idl as Idl, provider);
}

