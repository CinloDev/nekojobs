import { create } from 'zustand';
import { Learning } from '@/types';
import { LocalLearningRepository } from '../services/LocalLearningRepository';

interface LearningState {
  learnings: Learning[];
  isLoading: boolean;
  error: string | null;
  loadLearnings: () => Promise<void>;
  addLearning: (learning: Learning) => Promise<void>;
  updateLearning: (learning: Learning) => Promise<void>;
  deleteLearning: (id: string) => Promise<void>;
}

const repository = new LocalLearningRepository();

export const useLearningStore = create<LearningState>((set) => ({
  learnings: [],
  isLoading: false,
  error: null,

  loadLearnings: async () => {
    set({ isLoading: true, error: null });
    try {
      const learnings = await repository.getLearnings();
      set({ learnings, isLoading: false });
    } catch (error) {
      set({ error: 'Error al cargar aprendizajes', isLoading: false });
    }
  },

  addLearning: async (learning) => {
    set({ isLoading: true, error: null });
    try {
      await repository.saveLearning(learning);
      set((state) => ({ learnings: [...state.learnings, learning], isLoading: false }));
    } catch (error) {
      set({ error: 'Error al guardar aprendizaje', isLoading: false });
    }
  },

  updateLearning: async (learning) => {
    set({ isLoading: true, error: null });
    try {
      await repository.saveLearning(learning);
      set((state) => ({
        learnings: state.learnings.map((l) => (l.id === learning.id ? learning : l)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al actualizar aprendizaje', isLoading: false });
    }
  },

  deleteLearning: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await repository.deleteLearning(id);
      set((state) => ({
        learnings: state.learnings.filter((l) => l.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al eliminar aprendizaje', isLoading: false });
    }
  },
}));
