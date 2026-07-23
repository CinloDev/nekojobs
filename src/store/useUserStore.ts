import { create } from 'zustand';
import { UserProfile } from '@/types';
import { LocalUserRepository } from '@/services/LocalUserRepository';

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  
  loadProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const repository = new LocalUserRepository();

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,
  
  loadProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const profile = await repository.getProfile();
      set({ profile, isLoading: false });
    } catch (error) {
      set({ error: 'Error loading profile', isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    try {
      const currentProfile = get().profile;
      if (!currentProfile) return;
      
      const updatedProfile = { ...currentProfile, ...updates };
      await repository.saveProfile(updatedProfile);
      set({ profile: updatedProfile });
    } catch (error) {
      set({ error: 'Error updating profile' });
    }
  }
}));
