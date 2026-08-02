'use client';

import { useJobAnalytics } from '@/features/analytics/hooks/useJobAnalytics';
import { useProjectAnalytics } from '@/features/projects/hooks/useProjectAnalytics';
import { StatCard } from '@/components/ui/StatCard';

export function GeneralStateWidget() {
  const jobAnalytics = useJobAnalytics();
  const projectAnalytics = useProjectAnalytics();

  const { interviews, offers } = jobAnalytics.overview;
  const { activeProjects } = projectAnalytics.overview;
  const { expectedRevenue, pendingPayments } = projectAnalytics.financials;

  const CurrencyValue = ({ usd, ars }: { usd: number; ars: number }) => {
    if (usd === 0 && ars === 0) return <span className="text-heading-lg font-bold text-text-primary">$0</span>;
    
    const formatValue = (prefix: string, val: number) => {
      const str = `${prefix} ${val.toLocaleString()}`;
      // Adjust font size based on string length to prevent overflow
      const sizeClass = str.length > 11 ? 'text-lg md:text-xl' : str.length > 8 ? 'text-xl md:text-2xl' : 'text-2xl md:text-heading-lg';
      
      return (
        <span className={`${sizeClass} font-bold text-text-primary leading-tight`} title={str}>
          {str}
        </span>
      );
    };

    return (
      <>
        {usd > 0 && formatValue('U$S', usd)}
        {ars > 0 && formatValue('AR$', ars)}
      </>
    );
  };

  const getNumberSizeClass = (val: number) => {
    const str = String(val);
    return str.length > 5 ? 'text-2xl' : str.length > 3 ? 'text-3xl' : 'text-heading-lg';
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-md">
      {/* Job Metrics */}
      <StatCard title="Entrevistas Activas">
        <span className={`${getNumberSizeClass(interviews)} font-bold text-text-primary`}>{interviews}</span>
      </StatCard>
      
      <StatCard title="Ofertas">
        <span className={`${getNumberSizeClass(offers)} font-bold text-text-primary`}>{offers}</span>
      </StatCard>

      {/* Freelance Metrics */}
      <StatCard title="Proyectos Activos">
        <span className={`${getNumberSizeClass(activeProjects)} font-bold text-text-primary`}>{activeProjects}</span>
      </StatCard>
      
      <StatCard title="Ingresos Esperados">
        <CurrencyValue usd={expectedRevenue.USD} ars={expectedRevenue.ARS} />
      </StatCard>
      
      <StatCard title="Pagos Pendientes">
        <CurrencyValue usd={pendingPayments.USD} ars={pendingPayments.ARS} />
      </StatCard>
    </div>
  );
}
