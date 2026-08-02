import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  tooltip?: string;
  className?: string;
  children: ReactNode;
}

export function StatCard({ title, tooltip, className, children }: StatCardProps) {
  return (
    <div className={cn(
      "flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated overflow-hidden",
      className
    )}>
      <span 
        className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1 leading-snug" 
        title={tooltip || title}
      >
        {title}
      </span>
      <div className="mt-auto flex flex-col justify-end">
        {children}
      </div>
    </div>
  );
}
