'use client';

import { useMemo } from 'react';
import { WidgetCard } from '@/design-system/components/WidgetCard';
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
    <WidgetCard title="Objetivo Semanal" contentClassName="flex-1 flex flex-col justify-center gap-md">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h3 className="text-heading-lg font-bold">{currentWeekApps} <span className="text-body-sm font-normal text-text-secondary">/ {config.weeklyGoal}</span></h3>
          <p className="text-body-sm text-text-secondary">Postulaciones</p>
        </div>
        <div className="text-right">
          <span className="text-caption font-semibold px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-md">
            {Math.round(progressValue)}%
          </span>
        </div>
      </div>
      <Progress value={progressValue} className="h-2" />
    </WidgetCard>
  );
}
