import { Learning } from '@/types';

export interface LearningRepository {
  getLearnings(): Promise<Learning[]>;
  saveLearning(learning: Learning): Promise<void>;
  deleteLearning(id: string): Promise<void>;
}
