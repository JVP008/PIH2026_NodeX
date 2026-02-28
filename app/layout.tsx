import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
        className={`${spaceGrotesk.variable} ${spaceGrotesk.className} antialiased bg-[#fafafa] min-h-screen selection:bg-black selection:text-[#FFD700] overflow-x-hidden`}
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
