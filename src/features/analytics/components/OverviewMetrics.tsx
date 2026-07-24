'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Send, Users, CheckCircle, XCircle } from 'lucide-react';

interface OverviewMetricsProps {
  overview: {
    total: number;
    applied: number;
    interviews: number;
    offers: number;
    rejections: number;
  };
}

export function OverviewMetrics({ overview }: OverviewMetricsProps) {
  const metrics = [
    { label: 'Total', value: overview.total, icon: Briefcase, color: 'text-primary' },
    { label: 'Enviadas', value: overview.applied, icon: Send, color: 'text-blue-500' },
    { label: 'Entrevistas', value: overview.interviews, icon: Users, color: 'text-purple-500' },
    { label: 'Ofertas', value: overview.offers, icon: CheckCircle, color: 'text-green-500' },
    { label: 'Rechazos', value: overview.rejections, icon: XCircle, color: 'text-red-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="border-border/40 bg-card/50">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <metric.icon className={`w-6 h-6 mb-2 ${metric.color} opacity-80`} />
            <span className="text-2xl font-bold tracking-tight">{metric.value}</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
              {metric.label}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
