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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated">
          <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1">{metric.label}</span>
          <span className="text-heading-lg font-bold text-text-primary">{metric.value}</span>
        </div>
      ))}
    </div>
  );
}
