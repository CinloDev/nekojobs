'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUserStore } from '@/store/useUserStore';
import { useJobStore } from '@/features/applications/store/useJobStore';

export function WeeklyGoalWidget() {
  const { config } = useUserStore();
  const { applications } = useJobStore();

  const currentWeekApps = useMemo(() => {
    const now = new Date();
    // Obtener el inicio de la semana (Lunes)
    const dayOfWeek = now.getDay() || 7; 
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - dayOfWeek + 1);

    return applications.filter(app => {
      const appDate = new Date(app.appliedAt);
      return appDate >= startOfWeek;
    }).length;
  }, [applications]);

  const progressValue = Math.min((currentWeekApps / config.weeklyGoal) * 100, 100);

  return (
    <Card className="flex flex-col h-full shadow-sm bg-card/50 backdrop-blur-sm border-muted/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Objetivo Semanal
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center gap-4">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">{currentWeekApps} <span className="text-sm font-normal text-muted-foreground">/ {config.weeklyGoal}</span></h3>
            <p className="text-sm text-muted-foreground">Postulaciones</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-md">
              {Math.round(progressValue)}%
            </span>
          </div>
        </div>
        <Progress value={progressValue} className="h-2" />
      </CardContent>
    </Card>
  );
}
