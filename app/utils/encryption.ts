import { PublicKey } from "@solana/web3.js";
import type { WalletContextState } from "@solana/wallet-adapter-react";

// Helper function to convert ArrayBuffer to hex string
function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper function to convert hex string to ArrayBuffer
function hexToArrayBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes.buffer;
}

export async function deriveEncryptionKeyFromSignature(
    wallet: WalletContextState,
    nonceHex: string,
    timestamp: number
  ): Promise<CryptoKey> {
    if (!wallet.publicKey) throw new Error("Wallet not connected");
    if (!wallet.signMessage) throw new Error("Wallet does not support message signing");
  
    const message = `Keychain Encryption Key | ${wallet.publicKey.toBase58()} | ${timestamp} | ${nonceHex}`;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await wallet.signMessage(encodedMessage);
  
    const salt: Uint8Array = wallet.publicKey.toBuffer();

    //@ts-ignore
    const signatureBytes = new Uint8Array(signature as ArrayBuffer);
  
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      signatureBytes,
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
  
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }
  

export async function encrypt(text: string, key: CryptoKey): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // Generate random IV (12 bytes for GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // Encrypt using AES-GCM (provides authentication)
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    data
  );
  
  // Combine IV and encrypted data
  const result = new Uint8Array(iv.length + encrypted.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encrypted), iv.length);
  
  // Return as base64 for easy storage
  return btoa(String.fromCharCode(...result));
}

export async function decrypt(ciphertext: string, key: CryptoKey): Promise<string> {
  try {
    // Decode from base64
    const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    
    // Extract IV (first 12 bytes) and encrypted data
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);
    
    // Decrypt using AES-GCM
    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encrypted
    );
    
    // Convert back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    throw new Error("Decryption failed - invalid ciphertext, key, or data has been tampered with");
  }
}

// Utility function to securely clear sensitive data from memory
export function clearSensitiveData(data: string): void {
  // Note: This is a best-effort approach in JavaScript
  // For truly sensitive applications, consider using WebAssembly
  if (typeof data === 'string') {
    // Overwrite the string (limited effectiveness in JS)
    for (let i = 0; i < data.length; i++) {
      data = data.substring(0, i) + '0' + data.substring(i + 1);
    }
  }
}

// Rate limiting helper (implement with your preferred storage)
class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly maxAttempts: number = 5;
  private readonly windowMs: number = 15 * 60 * 1000; // 15 minutes

  checkLimit(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record || now - record.timestamp > this.windowMs) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }
    
    if (record.count >= this.maxAttempts) {
      return false;
    }
    
    record.count++;
    return true;
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const keyDerivationLimiter = new RateLimiter();

// Enhanced key derivation with rate limiting
export async function deriveEncryptionKeySecure(wallet: WalletContextState): Promise<CryptoKey> {
    if (!wallet.publicKey) throw new Error("Wallet not connected");
  
    const identifier = wallet.publicKey.toBase58();
    const timestamp = Date.now(); // or persist this when first encrypting
    const nonce = crypto.getRandomValues(new Uint8Array(16));

    //@ts-ignore
    const nonceHex = arrayBufferToHex(nonce);
  
    // Uncomment this to enable rate limiting (optional)
    // if (!keyDerivationLimiter.checkLimit(identifier)) {
    //   throw new Error("Too many key derivation attempts. Please wait before trying again.");
    // }
  
    try {
      return await deriveEncryptionKeyFromSignature(wallet, nonceHex, timestamp);
    } catch (error) {
      throw error;
    }
  }
  

export async function encryptWithWallet(wallet: WalletContextState, text: string) {
    const timestamp = Date.now();
    const nonce = crypto.getRandomValues(new Uint8Array(16));

    //@ts-ignore
    const nonceHex = arrayBufferToHex(nonce);
  
    const key = await deriveEncryptionKeyFromSignature(wallet, nonceHex, timestamp);
  
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(text);
  
    const ciphertextBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );
  
    const full = new Uint8Array(iv.length + ciphertextBuffer.byteLength);
    full.set(iv);
    full.set(new Uint8Array(ciphertextBuffer), iv.length);
  
    return {
      ciphertext: btoa(String.fromCharCode(...full)),
      nonce: nonceHex,
      timestamp,
    };
  }
  
  export async function decryptWithWallet(wallet: WalletContextState, encrypted: string, nonce: string, timestamp: number): Promise<string> {
    const key = await deriveEncryptionKeyFromSignature(wallet, nonce, timestamp);
  
    const encryptedBytes = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
    const iv = encryptedBytes.slice(0, 12);
    const data = encryptedBytes.slice(12);
  
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
  
    return new TextDecoder().decode(decryptedBuffer);
  }
  