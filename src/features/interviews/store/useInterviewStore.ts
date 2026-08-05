import { create } from 'zustand';
import { Interview } from '@/types';
import { LocalInterviewRepository } from '../services/LocalInterviewRepository';

interface InterviewState {
  interviews: Interview[];
  isLoading: boolean;
  error: string | null;
  loadInterviewsByApplication: (applicationId: string) => Promise<void>;
  addInterview: (interview: Interview) => Promise<void>;
  updateInterview: (interview: Interview) => Promise<void>;
  deleteInterview: (id: string) => Promise<void>;
}

const repository = new LocalInterviewRepository();

export const useInterviewStore = create<InterviewState>((set) => ({
  interviews: [],
  isLoading: false,
  error: null,
  
  loadInterviewsByApplication: async (applicationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const interviews = await repository.getByApplicationId(applicationId);
      // Solo cargamos las de esta app. Podríamos tener un caché o estado combinado si fuera necesario,
      // pero para esta vista nos basta con cargar y mostrar las relevantes.
      set({ interviews, isLoading: false });
    } catch {
      set({ error: 'Error loading interviews', isLoading: false });
    }
  },

  addInterview: async (interview: Interview) => {
    try {
      await repository.create(interview);
      set((state) => ({ interviews: [...state.interviews, interview] }));
    } catch {
      set({ error: 'Error adding interview' });
    }
  },

  updateInterview: async (interview: Interview) => {
    try {
      await repository.update(interview);
      set((state) => ({
        interviews: state.interviews.map((i) => (i.id === interview.id ? interview : i)),
      }));
    } catch {
      set({ error: 'Error updating interview' });
    }
  },

  deleteInterview: async (id: string) => {
    try {
      await repository.delete(id);
      set((state) => ({
        interviews: state.interviews.filter((i) => i.id !== id),
      }));
    } catch {
      set({ error: 'Error deleting interview' });
    }
  },
}));
