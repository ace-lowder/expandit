import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ImageProvider, ErrorProvider } from "@/lib";
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
        className={`${inter.className} min-h-screen flex flex-col overflow-x-hidden overflow-y-hidden`}
      >
        <ClerkProvider>
          <ImageProvider>
            <ErrorProvider>
              <Navbar />
              <main className="flex-grow">{children}</main>
            </ErrorProvider>
          </ImageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
