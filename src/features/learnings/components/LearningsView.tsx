'use client';

import { useState, useEffect } from 'react';
import { useLearningStore } from '../store/useLearningStore';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { LearningCard } from './LearningCard';
import { LearningFormModal } from './LearningFormModal';
import { Learning } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
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

export function LearningsView() {
  const { learnings, loadLearnings, deleteLearning } = useLearningStore();
  const { loadApplications } = useJobStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [learningToEdit, setLearningToEdit] = useState<Learning | null>(null);
  const [learningToDelete, setLearningToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadLearnings();
    loadApplications(); // Needed to map related app titles
  }, [loadLearnings, loadApplications]);

  const handleEdit = (learning: Learning) => {
    setLearningToEdit(learning);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setLearningToEdit(null);
    setIsFormOpen(true);
  };

  const confirmDelete = async () => {
    if (learningToDelete) {
      await deleteLearning(learningToDelete);
      setLearningToDelete(null);
      toast.success('Aprendizaje eliminado');
    }
  };

  // Ordenar por fecha descendente
  const sortedLearnings = [...learnings].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Diario de Aprendizaje"
        description="Registra lo que aprendes en cada entrevista y mejora continuamente."
      >
        <Button onClick={handleCreate}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Registrar Aprendizaje
        </Button>
      </PageHeader>

      {learnings.length === 0 ? (
        <EmptyState 
          title="Aún no hay aprendizajes registrados"
          description="Anota tus lecciones de cada entrevista o prueba técnica."
          actionLabel="Registrar Aprendizaje"
          onAction={handleCreate} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedLearnings.map(learning => (
            <LearningCard
              key={learning.id}
              learning={learning}
              onEdit={handleEdit}
              onDelete={setLearningToDelete}
            />
          ))}
        </div>
      )}

      <LearningFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        learningToEdit={learningToEdit}
      />

      <Dialog open={!!learningToDelete} onOpenChange={(open) => !open && setLearningToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">¿Estás seguro?</DialogTitle>
            <DialogDescription className="pt-2">
              Esto eliminará el aprendizaje permanentemente. No podrás recuperar este registro.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button variant="outline" onClick={() => setLearningToDelete(null)} className="w-full sm:w-auto">
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
