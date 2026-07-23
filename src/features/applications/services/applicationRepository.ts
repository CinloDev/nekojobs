import { Application } from '@/types';

export interface ApplicationRepository {
  getAll(): Promise<Application[]>;
  getById(id: string): Promise<Application | undefined>;
  create(application: Application): Promise<void>;
  update(application: Application): Promise<void>;
  delete(id: string): Promise<void>;
  saveAll(applications: Application[]): Promise<void>;
}
