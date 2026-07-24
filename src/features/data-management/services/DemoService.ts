import { LocalApplicationRepository } from '@/features/applications/services/localApplicationRepository';
import { LocalGoalRepository } from '@/features/goals/services/LocalGoalRepository';
import { LocalLearningRepository } from '@/features/learnings/services/LocalLearningRepository';
import { mockApplications, mockGoals, mockLearnings } from '@/lib/mock-data';

export class DemoService {
  private appRepo = new LocalApplicationRepository();
  private goalRepo = new LocalGoalRepository();
  private learningRepo = new LocalLearningRepository();

  async loadDemoData(): Promise<void> {
    // We get current data, and append the demo data to prevent data loss if they had something
    const apps = await this.appRepo.getAll();
    const goals = await this.goalRepo.getGoals();
    const learnings = await this.learningRepo.getLearnings();

    // Filter out previous demo data to avoid duplicates if they load demo twice
    const cleanApps = apps.filter(a => !a.id.startsWith('demo-'));
    const cleanGoals = goals.filter(g => !g.id.startsWith('demo-'));
    const cleanLearnings = learnings.filter(l => !l.id.startsWith('demo-'));

    await this.appRepo.saveAll([...cleanApps, ...mockApplications]);
    await this.goalRepo.saveAll([...cleanGoals, ...mockGoals]);
    await this.learningRepo.saveAll([...cleanLearnings, ...mockLearnings]);
  }

  async clearDemoData(): Promise<void> {
    const apps = await this.appRepo.getAll();
    const goals = await this.goalRepo.getGoals();
    const learnings = await this.learningRepo.getLearnings();

    await this.appRepo.saveAll(apps.filter(a => !a.id.startsWith('demo-')));
    await this.goalRepo.saveAll(goals.filter(g => !g.id.startsWith('demo-')));
    await this.learningRepo.saveAll(learnings.filter(l => !l.id.startsWith('demo-')));
  }
}
