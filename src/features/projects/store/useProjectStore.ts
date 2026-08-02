import { create } from 'zustand';
import { Project } from '@/types';
import { LocalProjectRepository } from '../services/localProjectRepository';

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  loadProjects: () => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

const repository = new LocalProjectRepository();

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  
  loadProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await repository.getAll();
      set({ projects, isLoading: false });
    } catch {
      set({ error: 'Error loading projects', isLoading: false });
    }
  },

  addProject: async (project: Project) => {
    try {
      await repository.create(project);
      set((state) => ({ projects: [...state.projects, project] }));
    } catch {
      set({ error: 'Error adding project' });
    }
  },

  updateProject: async (project: Project) => {
    try {
      await repository.update(project);
      set((state) => ({
        projects: state.projects.map((p) => (p.id === project.id ? project : p)),
      }));
    } catch {
      set({ error: 'Error updating project' });
    }
  },

  deleteProject: async (id: string) => {
    try {
      await repository.delete(id);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch {
      set({ error: 'Error deleting project' });
    }
  },
}));
