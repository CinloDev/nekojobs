import { Application, ApplicationStatus } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

import { MoreHorizontal, Edit, Trash2, ExternalLink, Calendar, Building2, Laptop, Banknote } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ApplicationCardProps {
  application: Application;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

import { StatusBadge } from '@/design-system/components/StatusBadge';

export function ApplicationCard({ application, onEdit, onDelete }: ApplicationCardProps) {
  const formattedDate = new Date(application.appliedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Card className="group transition-all hover:shadow-md border-border-default hover:border-brand-primary/30 bg-surface">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg truncate" title={application.position}>
                {application.position}
              </h3>
              <StatusBadge status={application.status} />
            </div>
            
            <div className="flex items-center text-muted-foreground gap-1.5 text-sm">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-foreground/80 truncate">{application.company}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 -mr-2 -mt-2")}>
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

        <div className="mt-4 pt-4 border-t border-border/50 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
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
        
        {application.technologies && application.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
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
      </CardContent>
    </Card>
  );
}
