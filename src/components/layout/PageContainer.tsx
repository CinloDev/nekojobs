import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageContainerSize = 'default' | 'narrow';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  size?: PageContainerSize;
}

export function PageContainer({ children, className, size = 'default' }: PageContainerProps) {
  return (
    <div
      className={cn(
        "px-4 py-8 md:p-8 mx-auto h-full flex flex-col",
        size === 'default' ? 'max-w-7xl' : 'max-w-[800px]',
        className
      )}
    >
      {children}
    </div>
  );
}
