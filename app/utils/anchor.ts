import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  AnchorProvider,
  Program,
  Idl,
  Wallet,
} from "@coral-xyz/anchor";
import idl from "../idl/keychain.json";

const programId = new PublicKey("TXHddDGCYaoQqPmQatT7xYAWPfrSaVo5FosrxaTcncF"); // replace if needed
const network = "https://api.devnet.solana.com"

const connection = new Connection(network, "confirmed");

export const getProvider = (wallet: Wallet): AnchorProvider =>
  new AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });

export const getProgram = (wallet: Wallet): Program =>
  new Program(idl as Idl, getProvider(wallet));
