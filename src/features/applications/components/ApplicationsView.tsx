'use client';

import { useState, useMemo, useEffect } from 'react';
import { useJobStore } from '../store/useJobStore';
import { ApplicationFilters } from './ApplicationFilters';
import { ApplicationCard } from './ApplicationCard';
import { ApplicationFormModal } from './ApplicationFormModal';
import { Application, ApplicationStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, SearchX } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export function ApplicationsView() {
  const { applications, loadApplications, deleteApplication } = useJobStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'Todos'>('Todos');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [appToEdit, setAppToEdit] = useState<Application | null>(null);
  
  const [appToDelete, setAppToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            app.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const handleEdit = (app: Application) => {
    setAppToEdit(app);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setAppToEdit(null);
    setIsFormOpen(true);
  };

  const confirmDelete = () => {
    if (appToDelete) {
      deleteApplication(appToDelete);
      setAppToDelete(null);
      toast.success('Postulación eliminada');
    }
  };

  if (applications.length === 0) {
    return (
      <div className="space-y-4">
        <EmptyState onAction={handleCreate} />
        <ApplicationFormModal open={isFormOpen} onOpenChange={setIsFormOpen} applicationToEdit={appToEdit} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <ApplicationFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <Button onClick={handleCreate} className="flex-shrink-0">
          <PlusCircle className="w-4 h-4 mr-2" />
          Nueva Postulación
        </Button>
      </div>

      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map(app => (
            <ApplicationCard 
              key={app.id} 
              application={app} 
              onEdit={handleEdit} 
              onDelete={setAppToDelete} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-lg bg-card mt-8">
          <SearchX className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium">No se encontraron resultados</h3>
          <p className="text-muted-foreground mt-1">Prueba ajustando los filtros de búsqueda.</p>
          <Button variant="link" onClick={() => { setSearchQuery(''); setStatusFilter('Todos'); }}>
            Limpiar filtros
          </Button>
        </div>
      )}

      <ApplicationFormModal 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        applicationToEdit={appToEdit} 
      />

      <Dialog open={!!appToDelete} onOpenChange={(open) => !open && setAppToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">¿Estás seguro?</DialogTitle>
            <DialogDescription className="pt-2">
              Esta acción no se puede deshacer. Esto eliminará permanentemente la postulación de tu lista.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button variant="outline" onClick={() => setAppToDelete(null)} className="w-full sm:w-auto">
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
