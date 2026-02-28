import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HOUSE CONNECT PRO / NEO-BRUTALIST EDITION",
  description: "HIGH CONTRAST. HIGH TRUST. Find skilled professionals with absolute clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F3F4ED] min-h-screen selection:bg-black selection:text-[#FFD700]`}
      >
        <ToastProvider>
          <NavBar />
          <div className="pt-2"> {/* Tiny offset to let shadows breathe */}
            {children}
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
