'use client';


import { useJobStore } from '@/features/applications/store/useJobStore';
import { Building2 } from 'lucide-react';
import { ApplicationStatus } from '@/types';

import { WidgetCard } from '@/design-system/components/WidgetCard';

const statusColors: Partial<Record<ApplicationStatus, string>> = {
  'Entrevista RRHH': 'bg-status-hr',
  'Entrevista técnica': 'bg-status-technical',
  'Prueba técnica': 'bg-status-test',
  'Entrevista Final': 'bg-status-final',
  'Contactado': 'bg-status-applied',
  'Aplicada': 'bg-status-applied',
  'Oferta': 'bg-status-offer',
};

export function ActiveCompaniesWidget() {
  const { applications } = useJobStore();

  const activeApps = applications.filter(a => 
    !['Rechazada', 'Ghosting', 'Guardada'].includes(a.status)
  ).slice(0, 4); // Take up to 4 for the widget

  return (
    <WidgetCard title="Empresas Activas" icon={<Building2 className="w-5 h-5 text-brand-primary" />}>
      {activeApps.length === 0 ? (
        <div className="text-center text-body-sm text-text-muted py-sm">
          No tienes procesos activos en este momento.
        </div>
      ) : (
        <ul className="space-y-md">
          {activeApps.map(app => (
            <li key={app.id} className="flex items-center gap-sm">
              <div className={`w-2 h-2 rounded-full ${statusColors[app.status] || 'bg-brand-primary'}`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-body-md font-medium text-text-primary truncate leading-none mb-1">{app.company}</p>
                <p className="text-body-sm text-text-secondary truncate">{app.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </WidgetCard>
  );
}
