import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import type { Wallet } from "@coral-xyz/anchor/dist/cjs/provider"; // ✅ browser Wallet type
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "../idl/keychain.json";

const programID = new PublicKey("TXHddDGCYaoQqPmQatT7xYAWPfrSaVo5FosrxaTcncF");

export function getProvider(walletAdapter: any): AnchorProvider {
  if (!walletAdapter?.publicKey) throw new Error("Wallet not connected");

  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  // Cast the adapter into the Wallet interface
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

