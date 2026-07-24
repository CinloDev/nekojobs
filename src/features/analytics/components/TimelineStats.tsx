'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Clock, Activity } from 'lucide-react';

interface TimelineStatsProps {
  timeline: {
    last7Days: number;
    last30Days: number;
    weeklyAverage: number;
    monthlyAverage: number;
  };
}

export function TimelineStats({ timeline }: TimelineStatsProps) {
  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Actividad Reciente
        </CardTitle>
        <CardDescription>Resumen de tu constancia en el tiempo.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col p-4 bg-muted/40 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <CalendarDays className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Últimos 7 días</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">{timeline.last7Days}</span>
              <span className="text-sm text-muted-foreground font-medium">postulaciones</span>
            </div>
          </div>
          
          <div className="flex flex-col p-4 bg-muted/40 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Últimos 30 días</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">{timeline.last30Days}</span>
              <span className="text-sm text-muted-foreground font-medium">postulaciones</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between px-2 text-sm">
          <span className="text-muted-foreground">Promedio Semanal (Últimos 30d):</span>
          <span className="font-semibold text-primary">{timeline.weeklyAverage} / sem</span>
        </div>
      </CardContent>
    </Card>
  );
}
