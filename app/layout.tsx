import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ImageProvider } from "@/lib";
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
      <body className={inter.className}>
        <ImageProvider>
          <Navbar />
          {children}
        </ImageProvider>
      </body>
    </html>
  );
}
