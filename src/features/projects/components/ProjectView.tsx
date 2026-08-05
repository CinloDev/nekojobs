'use client';

import { useState, useEffect } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { ProjectFormModal } from './ProjectFormModal';
import { ProjectCard } from './ProjectCard';
import { Project, ProjectCategory } from '@/types';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle, Folder, Briefcase, Globe, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProjectView() {
  const { projects, isLoading, loadProjects } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectCategory>('freelance');

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

  const filteredProjects = projects.filter(p => p.category === activeTab);

  const tabs: { id: ProjectCategory; label: string; icon: any }[] = [
    { id: 'freelance', label: 'Freelance', icon: Briefcase },
    { id: 'personal', label: 'Propios', icon: Folder },
    { id: 'open_source', label: 'Open Source', icon: Globe },
    { id: 'client', label: 'Clientes', icon: Users },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader 
        title="Proyectos" 
        description="Gestiona tus proyectos personales, trabajos freelance y open source."
      >
        <Button onClick={handleNewProject} className="flex-shrink-0">
          <PlusCircle className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </PageHeader>

      <div className="flex overflow-x-auto pb-2 border-b border-border/40 scrollbar-hide gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
                isActive 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Cargando proyectos...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-card/50 text-card-foreground shadow-sm">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <PlusCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium">No hay proyectos en esta categoría</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-[400px]">
            Haz clic en "Nuevo Proyecto" para agregar uno y comenzar a gestionarlo.
          </p>
          <Button onClick={handleNewProject} variant="outline" className="mt-6">
            Crear Proyecto
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onEdit={handleEditProject} />
          ))}
        </div>
      )}

      <ProjectFormModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        projectToEdit={projectToEdit} 
        defaultCategory={activeTab}
      />
    </div>
  );
}
