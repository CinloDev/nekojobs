'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-card/40 backdrop-blur-sm py-6 px-4 md:px-8 text-xs text-muted-foreground w-full shrink-0">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-4">

        {/* Left: Brand & Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 font-medium text-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Image src="/neko_logo.svg" alt="Neko" width={18} height={18} className="w-4.5 h-4.5 object-contain" />
              <span>NekoJobs © {currentYear}</span>
            </span>
            <span className="hidden sm:inline text-muted-foreground">·</span>
            <span className="w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
              Desarrollado con <Heart className="w-3 h-3 text-red-500 inline fill-red-500/20" /> por
              <a
                href="https://portfolio.cinlodev.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                CinloDev
              </a>
            </span>
          </div>
          <p className="text-muted-foreground/80 text-[11px] sm:text-xs">
            Arquitectura 100% Local-first. Tus datos permanecen en tu navegador.
          </p>
        </div>

        {/* Center: Legal Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground hover:underline"
          >
            Términos
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground hover:underline"
          >
            Privacidad
          </Link>
        </div>

        {/* Right: Social & Portfolio Icons */}
        <div className="flex items-center gap-3.5">
          <a
            href="https://github.com/cinlodev"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub de CinloDev"
            className="p-2 rounded-full hover:bg-accent hover:text-foreground transition-all border border-transparent hover:border-border/50"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-2 rounded-full hover:bg-accent hover:text-foreground transition-all border border-transparent hover:border-border/50"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5V13.2a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.67a1.64 1.64 0 0 0-1.64 1.64 1.64 1.64 0 0 0 1.64 1.64 1.64 1.64 0 0 0 1.64-1.64 1.64 1.64 0 0 0-1.64-1.64" />
            </svg>
          </a>
          <a
            href="https://portfolio.cinlodev.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Porfolio de CinloDev"
            className="p-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all bg-muted/60 text-primary border border-border/50 shadow-xs flex items-center justify-center"
            aria-label="Porfolio de CinloDev"
          >
            <Globe className="w-4 h-4 text-primary" />
          </a>
        </div>
      </div>
    </footer>
  );
}
