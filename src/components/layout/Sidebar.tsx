'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, BarChart2, Target, BookOpen, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Postulaciones', href: '/applications', icon: Briefcase },
  { name: 'Estadísticas', href: '/analytics', icon: BarChart2 },
  { name: 'Metas', href: '/goals', icon: Target },
  { name: 'Aprendizajes', href: '/learnings', icon: BookOpen },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2 transition-opacity hover:opacity-80">
          <Image src="/neko_logo.svg" alt="NekoJobs Logo" width={28} height={28} />
          NekoJobs
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors'
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
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
