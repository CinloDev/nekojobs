'use client';

import { useEffect } from 'react';
import { useJobAnalytics } from '../hooks/useJobAnalytics';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { OverviewMetrics } from './OverviewMetrics';
import { PipelineFunnel } from './PipelineFunnel';
import { PerformanceCards } from './PerformanceCards';
import { SourcesBreakdown } from './SourcesBreakdown';
import { TimelineStats } from './TimelineStats';
import { EmptyState } from '@/components/ui/EmptyState';
import { useRouter } from 'next/navigation';

export function AnalyticsView() {
  const { loadApplications } = useJobStore();
  const { overview, pipeline, performance, sources, timeline, hasData } = useJobAnalytics();
  const router = useRouter();

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  if (!hasData) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <EmptyState onAction={() => router.push('/')} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Estadísticas</h2>
        <p className="text-muted-foreground text-sm mt-1">Insights en tiempo real sobre tu rendimiento en la búsqueda de empleo.</p>
      </div>

      {/* Row 1: KPIs Totales (Ocupa todo el ancho) */}
      <OverviewMetrics overview={overview} />

      {/* Row 2: Pipeline y Performance (2 columnas en desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <PipelineFunnel pipeline={pipeline} />
        <PerformanceCards performance={performance} />
      </div>

      {/* Row 3: Fuentes y Tiempo (2 columnas en desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SourcesBreakdown sources={sources} />
        <TimelineStats timeline={timeline} />
      </div>
    </div>
  );
}
