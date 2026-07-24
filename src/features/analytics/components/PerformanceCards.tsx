'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Target, TrendingUp, Award } from 'lucide-react';

interface PerformanceCardsProps {
  performance: {
    responseRate: number;
    interviewRate: number;
    conversionRate: number;
  };
}

export function PerformanceCards({ performance }: PerformanceCardsProps) {
  const metrics = [
    {
      title: 'Tasa de Respuesta',
      description: '% de postulaciones que avanzaron',
      value: performance.responseRate,
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Tasa de Entrevistas',
      description: '% de postulaciones con entrevistas',
      value: performance.interviewRate,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Tasa de Conversión',
      description: '% de entrevistas convertidas a ofertas',
      value: performance.conversionRate,
      icon: Award,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-lg">Rendimiento</CardTitle>
        <CardDescription>Métricas clave de éxito en tu proceso.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          {metrics.map((m, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${m.bgColor}`}>
                <m.icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{m.title}</h4>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
              <div className="text-xl font-bold tracking-tight">
                {m.value}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
