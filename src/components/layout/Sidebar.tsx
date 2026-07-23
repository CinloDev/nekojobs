'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from './NavLinks';

export function Sidebar() {
  return (
    <div className="hidden lg:flex h-full w-64 flex-col border-r bg-background shrink-0">
      <div className="flex h-16 items-center px-6 border-b shrink-0">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image src="/neko_logo.svg" alt="NekoJobs Logo" width={28} height={28} />
          NekoJobs
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <NavLinks />
      </div>
    </div>
  );
}
