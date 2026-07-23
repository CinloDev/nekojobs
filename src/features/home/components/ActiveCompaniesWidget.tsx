'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { Building2 } from 'lucide-react';
import { ApplicationStatus } from '@/types';

const statusColors: Partial<Record<ApplicationStatus, string>> = {
  'Entrevista RRHH': 'bg-purple-500',
  'Entrevista técnica': 'bg-purple-500',
  'Prueba técnica': 'bg-indigo-500',
  'Contactado': 'bg-yellow-500',
  'Aplicada': 'bg-blue-500',
  'Oferta': 'bg-green-500',
};

export function ActiveCompaniesWidget() {
  const { applications } = useJobStore();

  const activeApps = applications.filter(a => 
    !['Rechazada', 'Ghosting', 'Guardada'].includes(a.status)
  ).slice(0, 4); // Take up to 4 for the widget

  return (
    <Card className="h-full shadow-sm bg-card/50 backdrop-blur-sm border-muted/50">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Building2 className="w-5 h-5 text-primary" />
          Empresas Activas
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {activeApps.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            No tienes procesos activos en este momento.
          </div>
        ) : (
          <ul className="space-y-4">
            {activeApps.map(app => (
              <li key={app.id} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${statusColors[app.status] || 'bg-primary'}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate leading-none mb-1">{app.company}</p>
                  <p className="text-xs text-muted-foreground truncate">{app.status}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
