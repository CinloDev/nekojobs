import { Goal } from '@/types';

export interface GoalRepository {
  getGoals(): Promise<Goal[]>;
  saveGoal(goal: Goal): Promise<void>;
  deleteGoal(id: string): Promise<void>;
}
