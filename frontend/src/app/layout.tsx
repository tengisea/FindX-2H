import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/providers/AppolloWrapper";
import { Header } from "@/components/landingPage";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
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
    <html lang="en" className="dark">
      <ApolloWrapper>
        <body
          className={`${inter.variable} ${libreBaskerville.variable} ${greatVibes.variable} font-sans antialiased bg-background text-foreground`}
        >
          <div className="flex justify-end">
            <Header />
          </div>
          {children}
        </body>
      </ApolloWrapper>
    </html>
  );
}
