import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

interface EmptyStateProps {
  onAction?: () => void;
}

export function EmptyState({ onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center bg-card shadow-sm">
      <div className="mb-4 flex justify-center">
        <Image src="/nekojobs.svg" alt="NekoJobs" width={64} height={64} className="opacity-90" />
      </div>
      <h3 className="mt-2 text-lg font-semibold">Todavía no tenés postulaciones</h3>
      <p className="mt-1 text-sm text-muted-foreground w-full max-w-[400px] text-balance">
        Empezá registrando tu primera oportunidad laboral y toma el control de tu búsqueda.
      </p>
      {onAction && (
        <div className="mt-6">
          <Button onClick={onAction}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar aplicación
          </Button>
        </div>
      )}
    </div>
  );
}
