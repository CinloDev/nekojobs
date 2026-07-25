'use client';

import { useState, useEffect } from 'react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { DemoService } from '@/features/data-management/services/DemoService';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Database, PlusCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const demoService = new DemoService();

export function OnboardingModal() {
  const { status, completeOnboarding } = useOnboardingStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const router = useRouter();

  // Handle client-side hydration for Zustand persist
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && status === 'pending') {
      setIsOpen(true);
    } else if (status === 'completed') {
      setIsOpen(false);
    }
  }, [status, hasMounted]);

  const handleClose = () => {
    setIsOpen(false);
    completeOnboarding();
  };

  const handleStartBlank = () => {
    handleClose();
    router.push('/applications');
  };

  const handleLoadDemo = async () => {
    setIsLoadingDemo(true);
    try {
      await demoService.loadDemoData();
      toast.success('Datos de prueba cargados correctamente');
      handleClose();
      // Reload to hydrate all stores with the new demo data
      window.location.href = '/analytics';
    } catch (error) {
      console.error(error);
      toast.error('Hubo un error cargando los datos de prueba');
      setIsLoadingDemo(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[90dvh] overflow-y-auto rounded-xl p-4 sm:p-6">
        <DialogHeader>
          <div className="flex justify-center mb-2 sm:mb-4 mt-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl text-center font-bold tracking-tight">
            ¡Bienvenido a NekoJobs!
          </DialogTitle>
          <DialogDescription className="text-center pt-1.5 sm:pt-2 text-sm sm:text-base">
            El sistema operativo para tu búsqueda laboral. Totalmente privado y enfocado en potenciar tu carrera profesional.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2 sm:py-4">
          <div className="flex flex-col gap-2 p-3 sm:p-4 bg-muted/40 rounded-lg border border-border/50 text-xs sm:text-sm leading-relaxed">
            <p><strong>🏠 Arquitectura Local-first:</strong> Toda tu información se guarda únicamente en este navegador. No hay servidores externos husmeando en tu progreso.</p>
            <p><strong>📊 Métricas en tiempo real:</strong> Analiza tus embudos de conversión, fuentes de entrevistas y optimiza tus postulaciones.</p>
            <p><strong>🎯 Orientado a la acción:</strong> Fija objetivos semanales y documenta lo que aprendes en cada entrevista.</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2.5 sm:justify-between mt-2 sm:mt-4">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-xs sm:text-sm py-5 sm:py-2" 
            onClick={handleLoadDemo}
            disabled={isLoadingDemo}
          >
            {isLoadingDemo ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Database className="w-4 h-4 mr-2" />
            )}
            Cargar datos de prueba
          </Button>
          <Button 
            className="w-full sm:w-auto text-xs sm:text-sm py-5 sm:py-2" 
            onClick={handleStartBlank}
            disabled={isLoadingDemo}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Empezar en blanco
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
