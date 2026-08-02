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
    if (usd === 0 && ars === 0) return <span className="text-heading-lg font-bold text-text-primary mt-auto">$0</span>;
    
    const formatValue = (prefix: string, val: number) => {
      const str = `${prefix} ${val.toLocaleString()}`;
      // Adjust font size based on string length to prevent overflow
      const sizeClass = str.length > 11 ? 'text-lg md:text-xl' : str.length > 8 ? 'text-xl md:text-2xl' : 'text-2xl md:text-heading-lg';
      
      return (
        <span className={`${sizeClass} font-bold text-text-primary leading-tight truncate`} title={str}>
          {str}
        </span>
      );
    };

    return (
      <div className="flex flex-col justify-end mt-auto">
        {usd > 0 && formatValue('U$S', usd)}
        {ars > 0 && formatValue('AR$', ars)}
      </div>
    );
  };

  const getNumberSizeClass = (val: number) => {
    const str = String(val);
    return str.length > 5 ? 'text-2xl' : str.length > 3 ? 'text-3xl' : 'text-heading-lg';
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-md">
      {/* Job Metrics */}
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1">Entrevistas Activas</span>
        <span className={`${getNumberSizeClass(interviews)} font-bold text-text-primary mt-auto`}>{interviews}</span>
      </div>
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1">Ofertas</span>
        <span className={`${getNumberSizeClass(offers)} font-bold text-text-primary mt-auto`}>{offers}</span>
      </div>

      {/* Freelance Metrics */}
      <div className="flex flex-col p-md rounded-xl border border-border-default bg-surface shadow-sm transition-colors hover:bg-surface-elevated">
        <span className="text-caption text-text-secondary font-medium uppercase tracking-wider mb-1">Proyectos Activos</span>
        <span className={`${getNumberSizeClass(activeProjects)} font-bold text-text-primary mt-auto`}>{activeProjects}</span>
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
