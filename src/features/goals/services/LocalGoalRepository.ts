import { Goal } from '@/types';
import { GoalRepository } from './GoalRepository';

const STORAGE_KEY = 'neko_goals';

export class LocalGoalRepository implements GoalRepository {
  async getGoals(): Promise<Goal[]> {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    try {
      return JSON.parse(data) as Goal[];
    } catch (error) {
      console.error('Error parsing goals from localStorage', error);
      return [];
    }
  }

  async saveGoal(goal: Goal): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const goals = await this.getGoals();
    const existingIndex = goals.findIndex(g => g.id === goal.id);
    
    if (existingIndex >= 0) {
      goals[existingIndex] = goal;
    } else {
      goals.push(goal);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }

  async deleteGoal(id: string): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const goals = await this.getGoals();
    const filtered = goals.filter(g => g.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}
