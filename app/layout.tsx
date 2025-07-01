import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Display, Merriweather } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "./components/wallet-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
})

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
})

export const metadata: Metadata = {
  title: "Keychain - Self-Custodial Password Manager",
  description: "Hyperspeed security for your digital life. Powered by the Solana Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifDisplay.variable} ${merriweather.variable} antialiased`}
      >
        <WalletContextProvider>{children}</WalletContextProvider>
        </body>
    </html>
  );
}
