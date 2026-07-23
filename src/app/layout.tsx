import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
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
  description: "Transforma tu búsqueda de empleo en un proceso estructurado.",
  icons: {
    icon: [
      { url: "/nekojobs.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icons/icon-192.png" }
    ]
  },
  openGraph: {
    title: "NekoJobs - Gestor de Búsqueda Laboral",
    description: "Transforma tu búsqueda de empleo en un proceso estructurado.",
    siteName: "NekoJobs",
    images: [
      {
        url: "/og/nekojobs-og.png",
        width: 1200,
        height: 630,
        alt: "NekoJobs Preview",
      }
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NekoJobs - Gestor de Búsqueda Laboral",
    description: "Transforma tu búsqueda de empleo en un proceso estructurado.",
    images: ["/og/nekojobs-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
