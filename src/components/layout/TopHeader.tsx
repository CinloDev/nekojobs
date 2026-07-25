'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import Image from 'next/image';
import { MobileNav } from './MobileNav';
import { useUserStore } from '@/store/useUserStore';
import { UserCircle } from 'lucide-react';
import { useEffect } from 'react';

export function TopHeader() {
  const { profile, loadProfile } = useUserStore();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <header className="flex items-center justify-between h-16 px-3.5 sm:px-6 border-b bg-background w-full shrink-0 gap-2 sm:gap-4">
      {/* Left: Mobile Menu */}
      <div className="flex items-center lg:hidden shrink-0">
        <MobileNav />
      </div>

      {/* Center: Reserved for Search / Future Additions */}
      <div className="flex-1 flex items-center justify-center min-w-0">
        {/* Placeholder for future global search */}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 max-w-[170px] sm:max-w-none">
          <div className="flex flex-col items-end overflow-hidden">
            <span className="text-sm font-medium leading-none text-primary truncate w-full text-right">{profile?.name || 'Invitado'}</span>
            <span className="text-xs text-muted-foreground mt-1 truncate w-full text-right">{profile?.targetRole || 'Desarrollador'}</span>
          </div>
          <div className="relative h-9 w-9 rounded-full overflow-hidden bg-muted flex items-center justify-center border shrink-0">
            {profile?.avatar ? (
              <Image 
                src={profile.avatar} 
                alt="Avatar" 
                fill
                className="object-cover"
              />
            ) : (
              <UserCircle className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
        
        <div className="h-5 w-px bg-border mx-1 shrink-0" aria-hidden="true" />
        
        {/* Theme Toggle */}
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
