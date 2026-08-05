import { Application, ApplicationStatus } from '@/types';
import { ItemCard } from '@/components/ui/ItemCard';

import { MoreHorizontal, Edit, Trash2, ExternalLink, Calendar, Building2, Laptop, Banknote, Briefcase } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ApplicationCardProps {
  application: Application;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

import { StatusBadge } from '@/design-system/components/StatusBadge';

export function ApplicationCard({ application, onEdit, onDelete }: ApplicationCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/applications/${application.id}`);
  };
  const formattedDate = new Date(application.appliedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const badge = <StatusBadge status={application.status} />;

  const actions = (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 -mt-2 -mr-2 outline-none focus-visible:ring-2 focus-visible:ring-ring")}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => onEdit(application)}>
            <Edit className="mr-2 h-4 w-4" /> Editar
          </DropdownMenuItem>
          {application.url && (
            <DropdownMenuItem onClick={() => window.open(application.url, '_blank')}>
              <ExternalLink className="mr-2 h-4 w-4" /> Ver oferta
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => onDelete(application.id)} className="text-destructive focus:text-destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
  const footer = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5" title="Fecha de aplicación">
        <Calendar className="w-3.5 h-3.5" />
        {formattedDate}
      </div>
      
      {application.modality && (
        <div className="flex items-center gap-1.5">
          <Laptop className="w-3.5 h-3.5" />
          {application.modality}
        </div>
      )}
      
      {application.salary && (
        <div className="flex items-center gap-1.5">
          <Banknote className="w-3.5 h-3.5" />
          {application.salary}
        </div>
      )}
    </div>
  );

  return (
    <div onClick={handleCardClick} className="block cursor-pointer h-full transition-transform active:scale-[0.99]">
      <ItemCard
        title={
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-primary/60 shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <div className="line-clamp-2">{application.position}</div>
            </div>
          </div>
        }
        subtitle={application.company}
        badge={null}
        actions={actions}
        footer={footer}
      >
        <div className="mb-4">
          <StatusBadge status={application.status} />
        </div>
        
        {application.technologies && application.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {application.technologies.slice(0, 3).map(tech => (
              <span key={tech} className="inline-flex items-center rounded-sm bg-accent px-1.5 py-0.5 text-caption font-medium text-accent-foreground">
                {tech}
              </span>
            ))}
            {application.technologies.length > 3 && (
              <span className="inline-flex items-center rounded-sm bg-accent/50 px-1.5 py-0.5 text-caption font-medium text-muted-foreground">
                +{application.technologies.length - 3}
              </span>
            )}
          </div>
        )}
      </ItemCard>
    </div>
  );
}
