'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from './NavLinks';

export function Sidebar() {
  return (
    <div className="hidden lg:flex h-full w-64 flex-col border-r bg-background shrink-0">
      <div className="flex h-16 items-center px-6 border-b shrink-0">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image src="/icons/nekojobs.svg" alt="NekoJobs Logo" width={220} height={60} className="w-auto h-14 -ml-2" priority />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <NavLinks />
      </div>
    </div>
  );
}
