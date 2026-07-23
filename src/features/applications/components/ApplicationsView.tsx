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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

      <AlertDialog open={!!appToDelete} onOpenChange={(open) => !open && setAppToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente la postulación de tu lista.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
