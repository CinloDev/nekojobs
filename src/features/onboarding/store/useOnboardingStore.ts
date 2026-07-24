import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  status: 'pending' | 'completed';
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      status: 'pending',
      completeOnboarding: () => set({ status: 'completed' }),
      resetOnboarding: () => set({ status: 'pending' }),
    }),
    {
      name: 'nekojobs-onboarding',
    }
  )
);
