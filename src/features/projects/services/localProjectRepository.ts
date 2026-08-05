import { Project } from '@/types';
import { ProjectRepository } from './projectRepository';
import { migrateProject } from './migrations';

const STORAGE_KEY = 'nekojobs_projects';

export class LocalProjectRepository implements ProjectRepository {
  async getAll(): Promise<Project[]> {
    if (typeof window === 'undefined') return [];
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    try {
      const parsedData = JSON.parse(data) as any[];
      return parsedData.map(migrateProject);
    } catch (e) {
      console.error('Error parsing projects from localStorage', e);
      return [];
    }
  }

  async getById(id: string): Promise<Project | undefined> {
    const projects = await this.getAll();
    return projects.find(project => project.id === id);
  }

  async create(project: Project): Promise<void> {
    const projects = await this.getAll();
    projects.push(project);
    await this.saveAll(projects);
  }

  async update(project: Project): Promise<void> {
    const projects = await this.getAll();
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      projects[index] = project;
      await this.saveAll(projects);
    }
  }

  async delete(id: string): Promise<void> {
    const projects = await this.getAll();
    const newProjects = projects.filter(project => project.id !== id);
    await this.saveAll(newProjects);
  }

  async saveAll(projects: Project[]): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }
}
