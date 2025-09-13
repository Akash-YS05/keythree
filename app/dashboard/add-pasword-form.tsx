"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useState, useEffect } from "react"
import { Eye, EyeOff, ClipboardCopy, Check, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Assuming these utilities are available from your project
import { encryptWithWallet, decryptWithWallet } from "../utils/encryption"

type PasswordEntry = {
  id: string
  label: string
  ciphertext: string
  nonce: string
  timestamp: number
}

export default function PasswordManager() {
  const wallet = useWallet()
  const [label, setLabel] = useState("")
  const [password, setPassword] = useState("")
  const [entries, setEntries] = useState<PasswordEntry[]>([])
  const [decryptedMap, setDecryptedMap] = useState<Record<string, string>>({})
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({})
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load saved entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("keychain-passwords")
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage when entries change
  useEffect(() => {
    localStorage.setItem("keychain-passwords", JSON.stringify(entries))
  }, [entries])

  const handleSave = async () => {
    if (!wallet.connected) {
      setError("Wallet not connected")
      return
    }
    if (!label || !password) {
      setError("Label and password required")
      return
    }
    setError("")

    try {
      const { ciphertext, nonce, timestamp } = await encryptWithWallet(wallet, password)
      const newEntry: PasswordEntry = {
        id: crypto.randomUUID(),
        label,
        ciphertext,
        nonce,
        timestamp,
      }

      setEntries((prev) => [...prev, newEntry])
      setLabel("")
      setPassword("")
      // Optionally, you could add a simple success message here if needed
      // console.log("Password saved successfully!");
    } catch (err: any) {
      setError(err.message || "Encryption failed")
    }
  }

  const handleDecrypt = async (entry: PasswordEntry) => {
    if (!wallet.connected) {
      setError("Wallet not connected")
      return
    }
    setError("")
    setLoadingMap((prev) => ({ ...prev, [entry.id]: true }))
    try {
      const decrypted = await decryptWithWallet(wallet, entry.ciphertext, entry.nonce, entry.timestamp)
      setDecryptedMap((prev) => ({ ...prev, [entry.id]: decrypted }))
      // Optionally, you could add a simple success message here if needed
      // console.log("Password decrypted successfully!");
    } catch (err: any) {
      setError(err.message || "Decryption failed")
    } finally {
      setLoadingMap((prev) => ({ ...prev, [entry.id]: false }))
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    // Optionally, you could add a simple "Copied!" message here if needed
    // console.log("Password copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000) // Reset copied state after 2 seconds
  }

  return (
    <Card className="mx-auto max-w-2xl p-6 space-y-6 bg-card text-card-foreground shadow-lg rounded-xl border border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
          <Lock className="h-7 w-7 text-primary" />
          {"Wallet-Based Password Manager"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {"Securely store and retrieve your passwords using your Solana wallet."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!wallet.connected ? (
          <div className="text-center text-destructive p-4 border border-destructive rounded-md bg-destructive/10">
            {"Connect your wallet to use the password manager."}
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="label">{"Label"}</Label>
                <Input
                  id="label"
                  type="text"
                  placeholder="e.g. Gmail"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password">{"Password"}</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{"Toggle password visibility"}</span>
                </Button>
              </div>
              <Button onClick={handleSave} className="w-full">
                {"Save Password"}
              </Button>
              {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            </div>

            <Separator className="my-8" />

            <div className="pt-2">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {"Stored Passwords"}
              </h2>
              {entries.length === 0 && (
                <p className="text-muted-foreground text-center py-4">{"No passwords saved yet."}</p>
              )}
              <ul className="space-y-4">
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <Card className="p-4 bg-muted/30 border border-border/50 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-lg">{entry.label}</span>
                        <Button
                          onClick={() => handleDecrypt(entry)}
                          disabled={loadingMap[entry.id]}
                          className="text-sm"
                        >
                          {loadingMap[entry.id] ? "Decrypting..." : "Decrypt"}
                        </Button>
                      </div>
                      {decryptedMap[entry.id] && (
                        <div className="flex items-center justify-between gap-2 p-2 bg-background rounded-md border border-border">
                          <span className="font-mono text-sm text-primary break-all flex-1">
                            {decryptedMap[entry.id]}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopy(decryptedMap[entry.id], entry.id)}
                            className="shrink-0"
                          >
                            {copiedId === entry.id ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <ClipboardCopy className="h-4 w-4" />
                            )}
                            <span className="sr-only">{"Copy password"}</span>
                          </Button>
                        </div>
                      )}
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
