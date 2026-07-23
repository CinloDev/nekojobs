'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation } from './navigation.config';

interface NavLinksProps {
  onClick?: () => void;
}

export function NavLinks({ onClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-3">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClick}
            className={cn(
              isActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
              item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
            )}
          >
            <item.icon
              className={cn(
                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-accent-foreground',
                'mr-3 h-5 w-5 flex-shrink-0'
              )}
              aria-hidden="true"
            />
            {item.name}
            {item.badge && (
              <span className="ml-auto inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
