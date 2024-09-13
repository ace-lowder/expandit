import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ImageProvider } from "@/lib/contexts/ImageContext";
import { ErrorProvider } from "@/lib/contexts/ErrorContext";
import { CreditProvider } from "@/lib/contexts/CreditContext";
import { PaymentProvider } from "@/lib/contexts/PaymentContext";
import Navbar from "@/components/navbar/Navbar";
import { HistoryProvider } from "@/lib/contexts/HistoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expandit",
  description: "An image expander that uses generative fill AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col overflow-x-hidden`}
      >
        <ErrorProvider>
          <ClerkProvider>
            <CreditProvider>
              <PaymentProvider>
                <ImageProvider>
                  <HistoryProvider>
                    <Navbar />
                    <main className="flex-grow text-gray-700">{children}</main>
                  </HistoryProvider>
                </ImageProvider>
              </PaymentProvider>
            </CreditProvider>
          </ClerkProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
