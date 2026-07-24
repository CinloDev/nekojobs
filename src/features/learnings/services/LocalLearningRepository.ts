import { Learning } from '@/types';
import { LearningRepository } from './LearningRepository';

const STORAGE_KEY = 'neko_learnings';

export class LocalLearningRepository implements LearningRepository {
  async getLearnings(): Promise<Learning[]> {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    try {
      return JSON.parse(data) as Learning[];
    } catch (error) {
      console.error('Error parsing learnings from localStorage', error);
      return [];
    }
  }

  async saveLearning(learning: Learning): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const learnings = await this.getLearnings();
    const existingIndex = learnings.findIndex(l => l.id === learning.id);
    
    if (existingIndex >= 0) {
      learnings[existingIndex] = learning;
    } else {
      learnings.push(learning);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(learnings));
  }

  async deleteLearning(id: string): Promise<void> {
    if (typeof window === 'undefined') return;
    
    const learnings = await this.getLearnings();
    const filtered = learnings.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
}
