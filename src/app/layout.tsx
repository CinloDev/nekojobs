import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TopHeader } from "@/components/layout/TopHeader";
import { Toaster } from "sonner";
import { OnboardingModal } from "@/features/onboarding/components/OnboardingModal";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  title: "NekoJobs - Gestor de Búsqueda Laboral",
  description: "Transforma tu búsqueda de empleo en un proceso estructurado, privado y local-first.",
  openGraph: {
    title: "NekoJobs",
    description: "Transforma tu búsqueda de empleo en un proceso estructurado.",
    siteName: "NekoJobs",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NekoJobs",
    description: "Transforma tu búsqueda de empleo en un proceso estructurado.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased h-screen flex overflow-hidden bg-muted/20`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden">
            <TopHeader />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
          <Toaster position="bottom-right" theme="system" richColors closeButton />
          <OnboardingModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
