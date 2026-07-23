import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserConfig {
  name: string;
  startDate: string | null;
  weeklyGoal: number;
}

interface UserState {
  config: UserConfig;
  updateConfig: (config: Partial<UserConfig>) => void;
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      config: {
        name: 'Cinlo', // Default, could be asked in onboarding
        startDate: new Date().toISOString(),
        weeklyGoal: 20,
      },
      hasSeenOnboarding: false,
      updateConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: 'nekojobs-user-config',
    }
  )
);
