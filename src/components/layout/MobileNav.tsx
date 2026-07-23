'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLinks } from './NavLinks';
import { AnimatePresence, motion } from 'framer-motion';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navContent = (
    <AnimatePresence>
      {open && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />
          
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-[101] w-72 flex flex-col bg-sidebar border-r border-border shadow-xl h-[100dvh]"
          >
            <div className="flex h-16 items-center justify-between px-6 border-b border-border shrink-0">
              <Link 
                href="/" 
                onClick={() => setOpen(false)}
                className="text-xl font-bold text-primary flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Image src="/neko_logo.svg" alt="NekoJobs Logo" width={28} height={28} />
                NekoJobs
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
                className="shrink-0 -mr-2"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <NavLinks onClick={() => setOpen(false)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden shrink-0" 
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menú de navegación</span>
      </Button>

      {mounted && createPortal(navContent, document.body)}
    </>
  );
}
