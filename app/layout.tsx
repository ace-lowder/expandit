import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import {
  ImageProvider,
  ErrorProvider,
  PlanProvider,
  CreditProvider,
  PaymentProvider,
} from "@/lib";
import { Navbar } from "@/components";

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
        <ClerkProvider>
          <ImageProvider>
            <ErrorProvider>
              <PlanProvider>
                <CreditProvider>
                  <PaymentProvider>
                    <Navbar />
                    <main className="flex-grow text-gray-700">{children}</main>
                  </PaymentProvider>
                </CreditProvider>
              </PlanProvider>
            </ErrorProvider>
          </ImageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
