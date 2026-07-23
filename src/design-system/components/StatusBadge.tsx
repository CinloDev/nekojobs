import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ApplicationStatus } from '@/types';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export const statusTextStyles: Record<ApplicationStatus, string> = {
  'Guardada': 'text-status-saved',
  'Aplicada': 'text-status-applied',
  'Contactado': 'text-status-applied',
  'Entrevista RRHH': 'text-status-hr',
  'Entrevista técnica': 'text-status-technical',
  'Prueba técnica': 'text-status-test',
  'Entrevista Final': 'text-status-final',
  'Oferta': 'text-status-offer',
  'Contratado': 'text-status-hired',
  'Rechazada': 'text-status-rejected',
  'Ghosting': 'text-status-ghosted',
};

export const statusBgStyles: Record<ApplicationStatus, string> = {
  'Guardada': 'bg-status-saved',
  'Aplicada': 'bg-status-applied',
  'Contactado': 'bg-status-applied',
  'Entrevista RRHH': 'bg-status-hr',
  'Entrevista técnica': 'bg-status-technical',
  'Prueba técnica': 'bg-status-test',
  'Entrevista Final': 'bg-status-final',
  'Oferta': 'bg-status-offer',
  'Contratado': 'bg-status-hired',
  'Rechazada': 'bg-status-rejected',
  'Ghosting': 'bg-status-ghosted',
};

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
