import { create } from 'zustand';
import { Application } from '@/types';
import { LocalApplicationRepository } from '../services/localApplicationRepository';
import { mockApplications } from '@/lib/mock-data';

interface JobState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
  loadApplications: () => Promise<void>;
  addApplication: (app: Application) => Promise<void>;
  updateApplication: (app: Application) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  loadDemoData: () => Promise<void>;
}

const repository = new LocalApplicationRepository();

export const useJobStore = create<JobState>((set) => ({
  applications: [],
  isLoading: false,
  error: null,
  
  loadApplications: async () => {
    set({ isLoading: true, error: null });
    try {
      const apps = await repository.getAll();
      set({ applications: apps, isLoading: false });
    } catch {
      set({ error: 'Error loading applications', isLoading: false });
    }
  },

  addApplication: async (app: Application) => {
    try {
      await repository.create(app);
      set((state) => ({ applications: [...state.applications, app] }));
    } catch {
      set({ error: 'Error adding application' });
    }
  },

  updateApplication: async (app: Application) => {
    try {
      await repository.update(app);
      set((state) => ({
        applications: state.applications.map((a) => (a.id === app.id ? app : a)),
      }));
    } catch {
      set({ error: 'Error updating application' });
    }
  },

  deleteApplication: async (id: string) => {
    try {
      await repository.delete(id);
      set((state) => ({
        applications: state.applications.filter((a) => a.id !== id),
      }));
    } catch {
      set({ error: 'Error deleting application' });
    }
  },

  loadDemoData: async () => {
    set({ isLoading: true, error: null });
    try {
      await repository.saveAll(mockApplications);
      set({ applications: mockApplications, isLoading: false });
    } catch {
      set({ error: 'Error loading demo data', isLoading: false });
    }
  }
}));
