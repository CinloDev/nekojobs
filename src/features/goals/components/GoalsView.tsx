'use client';

import { useState, useEffect } from 'react';
import { useGoalStore } from '../store/useGoalStore';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { GoalCard } from './GoalCard';
import { GoalFormModal } from './GoalFormModal';
import { Goal } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Target } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

import { PageHeader } from '@/components/ui/PageHeader';

export function GoalsView() {
  const { goals, loadGoals, deleteGoal } = useGoalStore();
  const { loadApplications } = useJobStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadGoals();
    loadApplications(); // We need applications to calculate progress
  }, [loadGoals, loadApplications]);

  const handleEdit = (goal: Goal) => {
    setGoalToEdit(goal);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setGoalToEdit(null);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (goalToDelete) {
      await deleteGoal(goalToDelete);
      setGoalToDelete(null);
      toast.success('Meta eliminada');
    }
  };

  if (goals.length === 0) {
    return (
      <div className="space-y-4 max-w-4xl mx-auto">
        <EmptyState onAction={handleCreate} />
        <GoalFormModal open={isFormOpen} onOpenChange={setIsFormOpen} goalToEdit={goalToEdit} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Metas Activas"
        description="Sigue el progreso de tus objetivos."
      >
        <Button onClick={handleCreate}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Nueva Meta
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEdit}
            onDelete={setGoalToDelete}
          />
        ))}
      </div>

      <GoalFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        goalToEdit={goalToEdit}
      />

      <Dialog open={!!goalToDelete} onOpenChange={(open) => !open && setGoalToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">¿Estás seguro?</DialogTitle>
            <DialogDescription className="pt-2">
              Esto eliminará la meta permanentemente. Tu historial de postulaciones no se verá afectado.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button variant="outline" onClick={() => setGoalToDelete(null)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="w-full sm:w-auto">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
