import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ItemCardProps {
  title: ReactNode;
  subtitle: ReactNode;
  badge: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}

export function ItemCard({ title, subtitle, badge, actions, children, footer }: ItemCardProps) {
  return (
    <Card className="group flex flex-col transition-all hover:shadow-md border-border-default hover:border-brand-primary/30 bg-surface overflow-hidden">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Header */}
        <div className="p-5 pb-4 flex justify-between items-start gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight tracking-tight">
              {title}
            </h3>
            <div className="text-sm text-muted-foreground font-medium">
              {subtitle}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {badge}
            <div className="opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
              {actions}
            </div>
          </div>
        </div>

        {/* Body */}
        {children && (
          <div className="px-5 pb-4 flex-1 flex flex-col justify-start">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-5 py-4 bg-muted/30 border-t border-border/50 flex flex-col gap-2 mt-auto">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
