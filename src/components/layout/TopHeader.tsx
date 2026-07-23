'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Image from 'next/image';

export function TopHeader() {
  return (
    <header className="flex items-center justify-end h-16 px-6 border-b bg-background w-full">
      <div className="flex items-center gap-4">
        {/* Mocked User Profile for now */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium leading-none text-primary">Invitado</span>
            <span className="text-xs text-muted-foreground mt-1">Desarrollador</span>
          </div>
          <div className="h-9 w-9 rounded-full overflow-hidden bg-muted flex items-center justify-center border">
            {/* Dummy Avatar Image. In the future, this will be dynamic */}
            <Image 
              src="/nekojobs.svg" 
              alt="Avatar" 
              width={24} 
              height={24} 
              className="opacity-50"
            />
          </div>
        </div>
        
        <div className="h-5 w-px bg-border mx-1" aria-hidden="true" />
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
