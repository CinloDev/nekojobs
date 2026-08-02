'use client';

import { useState, useEffect } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { ProjectFormModal } from './ProjectFormModal';
import { ProjectCard } from './ProjectCard';
import { Project } from '@/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function ProjectView() {
  const { projects, isLoading, loadProjects } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleNewProject = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Proyectos Freelance" 
        description="Gestiona tus proyectos freelance, clientes y pagos."
      >
        <Button onClick={handleNewProject} className="flex-shrink-0">
          <PlusCircle className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </PageHeader>

      {isLoading ? (
        <div className="text-center py-10">Cargando proyectos...</div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-card text-card-foreground shadow-sm">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium">No hay proyectos todavía</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-[400px]">
            Comienza agregando tu primer proyecto freelance para llevar un registro de tu trabajo, clientes y pagos.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onEdit={handleEditProject} />
          ))}
        </div>
      )}

      <ProjectFormModal open={isModalOpen} onOpenChange={setIsModalOpen} projectToEdit={projectToEdit} />
    </div>
  );
}
