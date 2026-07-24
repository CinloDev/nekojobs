import { create } from 'zustand';
import { Goal } from '@/types';
import { LocalGoalRepository } from '../services/LocalGoalRepository';

interface GoalState {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
  loadGoals: () => Promise<void>;
  addGoal: (goal: Goal) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

const repository = new LocalGoalRepository();

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  isLoading: false,
  error: null,

  loadGoals: async () => {
    set({ isLoading: true, error: null });
    try {
      const goals = await repository.getGoals();
      set({ goals, isLoading: false });
    } catch (error) {
      set({ error: 'Error al cargar metas', isLoading: false });
    }
  },

  addGoal: async (goal) => {
    set({ isLoading: true, error: null });
    try {
      await repository.saveGoal(goal);
      set((state) => ({ goals: [...state.goals, goal], isLoading: false }));
    } catch (error) {
      set({ error: 'Error al guardar meta', isLoading: false });
    }
  },

  updateGoal: async (goal) => {
    set({ isLoading: true, error: null });
    try {
      await repository.saveGoal(goal);
      set((state) => ({
        goals: state.goals.map((g) => (g.id === goal.id ? goal : g)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al actualizar meta', isLoading: false });
    }
  },

  deleteGoal: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await repository.deleteGoal(id);
      set((state) => ({
        goals: state.goals.filter((g) => g.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Error al eliminar meta', isLoading: false });
    }
  },
}));
