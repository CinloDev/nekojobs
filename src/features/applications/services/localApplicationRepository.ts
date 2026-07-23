import { Application } from '@/types';
import { ApplicationRepository } from './applicationRepository';

const STORAGE_KEY = 'nekojobs_applications';

export class LocalApplicationRepository implements ApplicationRepository {
  async getAll(): Promise<Application[]> {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    try {
      return JSON.parse(data) as Application[];
    } catch (e) {
      console.error('Error parsing applications from localStorage', e);
      return [];
    }
  }

  async getById(id: string): Promise<Application | undefined> {
    const apps = await this.getAll();
    return apps.find(app => app.id === id);
  }

  async create(application: Application): Promise<void> {
    const apps = await this.getAll();
    apps.push(application);
    await this.saveAll(apps);
  }

  async update(application: Application): Promise<void> {
    const apps = await this.getAll();
    const index = apps.findIndex(app => app.id === application.id);
    if (index !== -1) {
      apps[index] = application;
      await this.saveAll(apps);
    }
  }

  async delete(id: string): Promise<void> {
    const apps = await this.getAll();
    const newApps = apps.filter(app => app.id !== id);
    await this.saveAll(newApps);
  }

  async saveAll(applications: Application[]): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    }
  }
}
