import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/providers/AppolloWrapper";
import { Header } from "@/components/landingPage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FindX Olympiad System",
  description: "Mathematics Olympiad Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex justify-end">
            {" "}
            <Header />
          </div>
          {children}
        </body>
      </ApolloWrapper>
    </html>
  );
}
