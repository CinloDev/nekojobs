import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  headerAction?: ReactNode;
}

export function WidgetCard({ title, icon, children, className, contentClassName, headerAction }: WidgetCardProps) {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      {(title || headerAction) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-lg">
          <div className="flex items-center gap-2">
            {icon && <div className="text-text-muted">{icon}</div>}
            <CardTitle className="text-heading-sm font-medium">{title}</CardTitle>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </CardHeader>
      )}
      <CardContent className={cn('flex-1 p-lg pt-0', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
