import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "Todavía no tenés postulaciones",
  description = "Empezá registrando tu primera oportunidad laboral y toma el control de tu búsqueda.",
  actionLabel = "Agregar aplicación",
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center bg-card shadow-sm">
      <div className="mb-4 flex justify-center">
        <Image src="/nekojobs.svg" alt="NekoJobs" width={80} height={80} className="opacity-90 w-auto h-16" />
      </div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground w-full max-w-[400px] text-balance">
        {description}
      </p>
      {onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
