import { useMemo } from 'react';
import { Goal } from '@/types';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { useLearningStore } from '@/features/learnings/store/useLearningStore';

export function useGoalProgress(goal: Goal) {
  const { applications } = useJobStore();
  const { learnings } = useLearningStore();

  const progress = useMemo(() => {
    const start = new Date(goal.startDate).getTime();
    
    // endDate in the Goal is usually just the day. To include the full last day, we add 24 hours minus 1 ms.
    const end = new Date(goal.endDate);
    end.setHours(23, 59, 59, 999);
    const endMs = end.getTime();

    let count = 0;

    if (goal.type === 'Applications') {
      count = applications.filter(app => {
        const d = new Date(app.appliedAt).getTime();
        return d >= start && d <= endMs && app.status !== 'Guardada'; // Consider only applied or further
      }).length;
    } 
    else if (goal.type === 'Interviews') {
      count = applications.filter(app => {
        const d = new Date(app.updatedAt).getTime();
        return d >= start && d <= endMs && app.status.includes('Entrevista');
      }).length;
    }
    else if (goal.type === 'Learnings') {
      count = learnings.filter(learning => {
        const d = new Date(learning.createdAt).getTime();
        return d >= start && d <= endMs;
      }).length;
    }

    return {
      currentValue: count,
      targetValue: goal.targetValue,
      percentage: Math.min(100, Math.round((count / goal.targetValue) * 100)),
      isCompleted: count >= goal.targetValue
    };
  }, [goal, applications, learnings]);

  return progress;
}
