import { Project, ProjectStatus } from '@/types';
import { useProjectStore } from '../store/useProjectStore';
import { toast } from 'sonner';
import { 
  MoreVertical, 
  Pencil, 
  Trash2, 
  FolderKanban, 
  DollarSign, 
  Code2, 
  CreditCard 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ItemCard } from '@/components/ui/ItemCard';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const { deleteProject } = useProjectStore();

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el proyecto "${project.projectName}"?`)) {
      try {
        await deleteProject(project.id);
        toast.success('Proyecto eliminado');
      } catch {
        toast.error('Error al eliminar proyecto');
      }
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'Activo':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 ring-blue-500/20';
      case 'Completado':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 ring-emerald-500/20';
      case 'Cancelado':
        return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 ring-red-500/20';
      case 'Negociando':
      case 'Propuesta Enviada':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 ring-amber-500/20';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 ring-slate-500/20';
    }
  };

  const getPaymentBadge = () => {
    switch (project.paymentStatus) {
      case 'Pagado':
        return <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm flex items-center gap-1"><CreditCard className="w-3 h-3"/> Pagado</span>;
      case 'Parcial':
        return <span className="text-amber-600 dark:text-amber-400 font-medium text-sm flex items-center gap-1"><CreditCard className="w-3 h-3"/> Parcial</span>;
      default:
        return <span className="text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center gap-1"><CreditCard className="w-3 h-3"/> Pendiente</span>;
    }
  };

  const badge = (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${getStatusColor(project.status)}`}>
      {project.status}
    </span>
  );

  const actions = (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1 hover:bg-accent rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(project)} className="cursor-pointer">
          <Pencil className="w-4 h-4 mr-2" /> Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
          <Trash2 className="w-4 h-4 mr-2" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const footer = (project.budget !== undefined || project.paymentStatus !== 'Pendiente') ? (
    <>
      <div className="flex justify-between items-center">
        {getPaymentBadge()}
        {project.budget !== undefined && project.currency && (
          <span className="font-bold text-base flex items-center gap-1">
            {project.currency} {project.budget.toLocaleString()}
          </span>
        )}
      </div>
      
      {project.paymentStatus === 'Parcial' && project.paidAmount && project.budget && (
        <div className="flex justify-between items-center text-xs mt-1 pt-2 border-t border-border/50">
          <span className="text-muted-foreground">Restante:</span>
          <span className="font-medium text-amber-600 dark:text-amber-400">
            {project.currency} {(project.budget - project.paidAmount).toLocaleString()}
          </span>
        </div>
      )}
    </>
  ) : undefined;

  return (
    <ItemCard
      title={
        <div className="flex items-start gap-2">
          <FolderKanban className="w-4 h-4 text-primary/60 shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <div className="line-clamp-2">{project.projectName}</div>
          </div>
        </div>
      }
      subtitle={project.clientName}
      badge={badge}
      actions={actions}
      footer={footer}
    >
      <div className="text-sm text-muted-foreground mb-4 font-medium bg-accent/50 w-fit px-2 py-1 rounded-md">
        {project.type}
      </div>
      
      {project.technologies && project.technologies.length > 0 && (
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Code2 className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="bg-secondary px-1.5 py-0.5 rounded text-xs">{tech}</span>
            ))}
            {project.technologies.length > 3 && (
              <span className="bg-secondary px-1.5 py-0.5 rounded text-xs">+{project.technologies.length - 3}</span>
            )}
          </div>
        </div>
      )}
    </ItemCard>
  );
}
