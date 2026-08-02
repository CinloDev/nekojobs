'use client';

import { useJobAnalytics } from '@/features/analytics/hooks/useJobAnalytics';
import { useProjectAnalytics } from '@/features/projects/hooks/useProjectAnalytics';

export function GeneralStateWidget() {
  const jobAnalytics = useJobAnalytics();
  const projectAnalytics = useProjectAnalytics();

  const { interviews, offers } = jobAnalytics.overview;
  const { activeProjects } = projectAnalytics.overview;
  const { expectedRevenue, pendingPayments } = projectAnalytics.financials;

  const CurrencyValue = ({ usd, ars }: { usd: number; ars: number }) => {
    if (usd === 0 && ars === 0) return <span className="text-heading-lg font-bold text-text-primary">$0</span>;
    
    return (
      <div className="flex flex-col justify-center">
        {usd > 0 && (
          <span className="text-xl md:text-2xl font-bold text-text-primary leading-tight">
            U$S {usd.toLocaleString()}
          </span>
        )}
        {ars > 0 && (
          <span className="text-xl md:text-2xl font-bold text-text-primary leading-tight">
            AR$ {ars.toLocaleString()}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-md">
      {/* Job Metrics */}
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1">Entrevistas Activas</span>
        <span className="text-heading-lg font-bold text-text-primary">{interviews}</span>
      </div>
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1">Ofertas</span>
        <span className="text-heading-lg font-bold text-text-primary">{offers}</span>
      </div>

      {/* Freelance Metrics */}
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1">Proyectos Activos</span>
        <span className="text-heading-lg font-bold text-text-primary">{activeProjects}</span>
      </div>
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated overflow-hidden">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1 truncate" title="Ingresos Esperados">
          Ingresos Esperados
        </span>
        <CurrencyValue usd={expectedRevenue.USD} ars={expectedRevenue.ARS} />
      </div>
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated overflow-hidden">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1 truncate" title="Pagos Pendientes">
          Pagos Pendientes
        </span>
        <CurrencyValue usd={pendingPayments.USD} ars={pendingPayments.ARS} />
      </div>
    </div>
  );
}
