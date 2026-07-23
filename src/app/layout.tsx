import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { OnboardingModal } from "@/features/onboarding/components/OnboardingModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NekoJobs - Professional Job Tracker",
  description: "Transform your job search into a structured process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-screen flex overflow-hidden bg-muted/20`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <OnboardingModal />
      </body>
    </html>
  );
}
