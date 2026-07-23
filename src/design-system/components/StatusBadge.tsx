import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ApplicationStatus } from '@/types';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const statusStyles: Record<ApplicationStatus, string> = {
  'Guardada': 'bg-status-saved/10 text-status-saved border-status-saved/20',
  'Aplicada': 'bg-status-applied/10 text-status-applied border-status-applied/20',
  'Contactado': 'bg-status-applied/10 text-status-applied border-status-applied/20',
  'Entrevista RRHH': 'bg-status-hr/10 text-status-hr border-status-hr/20',
  'Entrevista técnica': 'bg-status-technical/10 text-status-technical border-status-technical/20',
  'Prueba técnica': 'bg-status-test/10 text-status-test border-status-test/20',
  'Entrevista Final': 'bg-status-final/10 text-status-final border-status-final/20',
  'Oferta': 'bg-status-offer/10 text-status-offer border-status-offer/20',
  'Contratado': 'bg-status-hired/10 text-status-hired border-status-hired/20',
  'Rechazada': 'bg-status-rejected/10 text-status-rejected border-status-rejected/20',
  'Ghosting': 'bg-status-ghosted/10 text-status-ghosted border-status-ghosted/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-xs px-2 py-0.5 text-caption font-medium border',
        statusStyles[status] || 'bg-muted text-text-secondary border-border-default',
        className
      )}
    >
      {status}
    </span>
  );
}
