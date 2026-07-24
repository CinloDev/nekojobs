import { Application, Goal, Learning, UserProfile } from '@/types';
import { LocalApplicationRepository } from '@/features/applications/services/localApplicationRepository';
import { LocalGoalRepository } from '@/features/goals/services/LocalGoalRepository';
import { LocalLearningRepository } from '@/features/learnings/services/LocalLearningRepository';
import { LocalUserRepository } from '@/services/LocalUserRepository';

export interface BackupData {
  version: number;
  app: string;
  exportedAt: string;
  data: {
    profile: UserProfile | null;
    applications: Application[];
    goals: Goal[];
    learnings: Learning[];
  };
}

export class BackupService {
  private appRepo = new LocalApplicationRepository();
  private goalRepo = new LocalGoalRepository();
  private learningRepo = new LocalLearningRepository();
  private userRepo = new LocalUserRepository();

  async exportData(): Promise<string> {
    const profile = await this.userRepo.getProfile();
    const applications = await this.appRepo.getAll();
    const goals = await this.goalRepo.getGoals();
    const learnings = await this.learningRepo.getLearnings();

    const backup: BackupData = {
      version: 1,
      app: 'NekoJobs',
      exportedAt: new Date().toISOString(),
      data: {
        profile,
        applications,
        goals,
        learnings,
      }
    };

    return JSON.stringify(backup, null, 2);
  }

  async importData(jsonString: string): Promise<void> {
    try {
      const parsed = JSON.parse(jsonString);

      // Validation
      if (parsed.app !== 'NekoJobs') {
        throw new Error('El archivo no pertenece a NekoJobs');
      }
      if (!parsed.version) {
        throw new Error('El archivo no tiene una versión válida');
      }
      if (!parsed.data) {
        throw new Error('El archivo no contiene datos');
      }

      const { data } = parsed as BackupData;

      if (!Array.isArray(data.applications) || !Array.isArray(data.goals) || !Array.isArray(data.learnings)) {
        throw new Error('La estructura de datos es inválida');
      }

      // Import
      if (data.profile) {
        await this.userRepo.saveProfile(data.profile);
      }
      await this.appRepo.saveAll(data.applications);
      await this.goalRepo.saveAll(data.goals);
      await this.learningRepo.saveAll(data.learnings);

    } catch (error: any) {
      console.error('Error importing data:', error);
      throw new Error(error.message || 'Error al procesar el archivo');
    }
  }
}
