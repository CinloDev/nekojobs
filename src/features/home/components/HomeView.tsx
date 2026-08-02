'use client';

import { useEffect } from 'react';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { useProjectStore } from '@/features/projects/store/useProjectStore';
import { useUserStore } from '@/store/useUserStore';
import { HomeHeader } from './HomeHeader';
import { WeeklyGoalWidget } from './WeeklyGoalWidget';
import { NextActionsWidget } from './NextActionsWidget';
import { RecentActivityWidget } from './RecentActivityWidget';
import { GeneralStateWidget } from './GeneralStateWidget';
import { ActiveCompaniesWidget } from './ActiveCompaniesWidget';
import { NekoInsightsWidget } from './NekoInsightsWidget';
import { RecentLearningsWidget } from './RecentLearningsWidget';

export function HomeView() {
  const { loadApplications, isLoading: isLoadingApps } = useJobStore();
  const { loadProjects, isLoading: isLoadingProjects } = useProjectStore();
  const { profile } = useUserStore();

  useEffect(() => {
    loadApplications();
    loadProjects();
  }, [loadApplications, loadProjects]);

  if ((isLoadingApps || isLoadingProjects) && !profile?.name) {
    return <div className="p-8 h-full flex items-center justify-center">Cargando tu espacio...</div>;
  }

  return (
    <div className="px-4 py-8 md:p-8 max-w-[1400px] mx-auto min-h-full">
      <HomeHeader />

      {/* General Metrics Row */}
      <div className="mb-6">
        <GeneralStateWidget />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
        
        {/* Left Column (Primary Actions & Progress) */}
        <div className="md:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
          <div className="md:col-span-2">
            <NekoInsightsWidget />
          </div>
          
          <div className="h-[280px]">
            <WeeklyGoalWidget />
          </div>
          
          <div className="h-[280px]">
            <NextActionsWidget />
          </div>
          
          <div className="md:col-span-2">
            <ActiveCompaniesWidget />
          </div>
        </div>

        {/* Right Column (Timeline & Logs) */}
        <div className="md:col-span-12 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 h-fit">
          <div className="h-[380px] xl:h-[450px]">
            <RecentActivityWidget />
          </div>
          <div className="h-fit">
            <RecentLearningsWidget />
          </div>
        </div>
        
      </div>
    </div>
  );
}
