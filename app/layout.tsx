import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Display, Merriweather, Outfit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "./components/wallet-provider";
import { Toaster } from "react-hot-toast";

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

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifDisplay.variable} ${merriweather.variable} ${outfit.variable} ${instrumentSerif.variable} antialiased`}
      >
        <WalletContextProvider>
          {children}
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        </WalletContextProvider>
        </body>
    </html>
  );
}
