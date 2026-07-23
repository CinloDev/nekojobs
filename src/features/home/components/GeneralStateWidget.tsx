'use client';

import { useJobStore } from '@/features/applications/store/useJobStore';

export function GeneralStateWidget() {
  const { applications } = useJobStore();

  const totalApps = applications.length;
  const interviews = applications.filter(a => a.status.includes('Entrevista') || a.status === 'Prueba técnica').length;
  const offers = applications.filter(a => a.status === 'Oferta').length;
  const ghosting = applications.filter(a => a.status === 'Ghosting').length;

  const metrics = [
    { label: 'Aplicaciones', value: totalApps },
    { label: 'Entrevistas', value: interviews },
    { label: 'Ofertas', value: offers },
    { label: 'Ghosting', value: ghosting },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col p-4 rounded-xl border border-muted/50 bg-card/50 backdrop-blur-sm shadow-sm transition-colors hover:bg-card/80">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{metric.label}</span>
          <span className="text-2xl font-bold">{metric.value}</span>
        </div>
      ))}
    </div>
  );
}
