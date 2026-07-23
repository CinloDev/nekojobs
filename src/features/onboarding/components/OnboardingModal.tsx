'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useUserStore } from '@/store/useUserStore';

export function OnboardingModal() {
  const { hasSeenOnboarding, completeOnboarding, config, updateConfig } = useUserStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Basic check to see if we should show onboarding
    if (!hasSeenOnboarding) {
      setTimeout(() => setOpen(true), 0);
    }
  }, [hasSeenOnboarding]);

  const handleComplete = () => {
    completeOnboarding();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image src="/nekojobs.svg" alt="NekoJobs" width={24} height={24} />
            Bienvenido a NekoJobs
          </DialogTitle>
          <DialogDescription>
            Configuremos tu perfil para empezar a organizar tu búsqueda laboral.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">¿Cuánto tiempo llevás buscando?</h4>
            <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <option value="1">Menos de un mes</option>
              <option value="2">1-3 meses</option>
              <option value="3">3-6 meses</option>
              <option value="4">Más de 6 meses</option>
            </select>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Objetivo semanal de postulaciones</h4>
            <Input 
              type="number" 
              value={config.weeklyGoal} 
              onChange={(e) => updateConfig({ weeklyGoal: Number(e.target.value) })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleComplete}>Empezar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
