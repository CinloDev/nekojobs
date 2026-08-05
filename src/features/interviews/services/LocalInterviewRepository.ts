import { Interview } from '@/types';

const STORAGE_KEY = 'nekojobs-interviews';

export class LocalInterviewRepository {
  async getAll(): Promise<Interview[]> {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as Interview[];
    } catch (e) {
      console.error('Error reading interviews from localStorage', e);
      return [];
    }
  }

  async getByApplicationId(applicationId: string): Promise<Interview[]> {
    const all = await this.getAll();
    return all.filter(interview => interview.applicationId === applicationId);
  }

  async create(interview: Interview): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const all = await this.getAll();
      all.push(interview);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Error saving interview to localStorage', e);
      throw e;
    }
  }

  async update(interview: Interview): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const all = await this.getAll();
      const index = all.findIndex(i => i.id === interview.id);
      if (index !== -1) {
        all[index] = interview;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      }
    } catch (e) {
      console.error('Error updating interview in localStorage', e);
      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      const all = await this.getAll();
      const filtered = all.filter(i => i.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.error('Error deleting interview from localStorage', e);
      throw e;
    }
  }
}
