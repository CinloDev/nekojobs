import { UserProfile } from '@/types';

const STORAGE_KEY = 'nekojobs-user-profile';

const defaultProfile: UserProfile = {
  name: 'Invitado',
  targetRole: 'Desarrollador',
  level: 'Junior',
  location: '',
  mainStack: [],
  theme: 'system',
  createdAt: new Date().toISOString(),
  startDate: new Date().toISOString(),
  weeklyGoal: 20
};

export class LocalUserRepository {
  async getProfile(): Promise<UserProfile> {
    if (typeof window === 'undefined') return defaultProfile;
    
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return defaultProfile;
      return JSON.parse(data) as UserProfile;
    } catch (e) {
      console.error('Error reading UserProfile from localStorage', e);
      return defaultProfile;
    }
  }

  async saveProfile(profile: UserProfile): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving UserProfile to localStorage', e);
      throw e;
    }
  }
}
