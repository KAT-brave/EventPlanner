import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import FlashMessage from "@/components/FlashMessage";
import { AuthProvider } from "@/context/AuthContext";
import { FlashProvider } from "@/context/FlashContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventPlanner",
  description: "イベント予定管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <FlashProvider>
            <Header />
            <FlashMessage />
            <main className="flex-1">{children}</main>
          </FlashProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
