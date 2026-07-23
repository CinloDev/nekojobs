'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NavLinks } from './NavLinks';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger 
        render={
          <Button variant="ghost" size="icon" className="lg:hidden shrink-0" />
        }
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menú de navegación</span>
      </SheetTrigger>
      {/* 
        Default Sheet behaviors out of the box in shadcn:
        - Esc to close
        - Click outside to close (Overlay)
        - Focus trap
      */}
      <SheetContent side="left" className="w-72 p-0 flex flex-col">
        <SheetHeader className="p-0 text-left">
          <div className="flex h-16 items-center px-6 border-b">
            <Link 
              href="/" 
              onClick={() => setOpen(false)}
              className="text-xl font-bold text-primary flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Image src="/neko_logo.svg" alt="NekoJobs Logo" width={28} height={28} />
              NekoJobs
            </Link>
          </div>
          {/* SR only title for accessibility, as required by Dialog/Sheet standard */}
          <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <NavLinks onClick={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
