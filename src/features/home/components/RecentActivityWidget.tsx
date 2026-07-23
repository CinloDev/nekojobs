'use client';

import { WidgetCard } from '@/design-system/components/WidgetCard';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { Activity, Clock } from 'lucide-react';

export function RecentActivityWidget() {
  const { applications } = useJobStore();

  const recentActivity = [...applications]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const formatRelativeTime = (dateString: string) => {
    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
    const daysDifference = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    if (daysDifference === 0) return 'Hoy';
    if (daysDifference === -1) return 'Ayer';
    if (daysDifference > -7) return rtf.format(daysDifference, 'day');
    return new Date(dateString).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
  };

  return (
    <WidgetCard title="Actividad Reciente" icon={<Activity className="w-5 h-5 text-brand-primary" />}>
      {recentActivity.length === 0 ? (
        <div className="text-center text-body-sm text-text-muted py-md">
          No hay actividad reciente.
        </div>
      ) : (
        <div className="relative space-y-0 pl-sm">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border-default"></div>
          {recentActivity.map((app) => (
            <div key={app.id} className="relative pl-6 pb-4 last:pb-0">
              <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-pill bg-brand-primary ring-4 ring-background"></div>
              <div className="flex flex-col gap-xs">
                <div className="flex items-center justify-between">
                  <p className="text-body-sm font-medium">{app.company}</p>
                  <span className="text-caption text-text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(app.updatedAt)}
                  </span>
                </div>
                <p className="text-caption text-text-secondary">Estado actualizado a <span className="font-medium text-text-primary">{app.status}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}
