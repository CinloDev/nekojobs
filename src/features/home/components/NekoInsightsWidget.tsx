'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useJobStore } from '@/features/applications/store/useJobStore';
import Image from 'next/image';

export function NekoInsightsWidget() {
  const { applications } = useJobStore();

  const insightMessage = useMemo(() => {
    if (applications.length === 0) {
      return "¡Bienvenido! El primer paso es el más difícil. Agrega tu primera postulación para empezar.";
    }

    const now = new Date();
    
    // 1. Revisar si hay postulaciones hoy
    const appliedToday = applications.some(app => {
      if (app.status !== 'Aplicada') return false;
      const appDate = new Date(app.appliedAt);
      return appDate.toDateString() === now.toDateString();
    });

    if (!appliedToday) {
      return "No te has postulado a nada hoy. ¿Qué tal si enviamos un par de CVs para mantener el ritmo?";
    }

    // 2. Revisar ghosting alto
    const ghostingCount = applications.filter(a => a.status === 'Ghosting').length;
    if (ghostingCount > 5 && (ghostingCount / applications.length) > 0.3) {
      return "He notado que hay mucho ghosting últimamente. Quizás valga la pena revisar tu CV o probar con otras fuentes de empleo.";
    }

    // 3. Revisar entrevistas activas
    const activeInterviews = applications.filter(a => a.status.includes('Entrevista')).length;
    if (activeInterviews > 0) {
      return `¡Tienes ${activeInterviews} entrevista${activeInterviews > 1 ? 's' : ''} en progreso! Recuerda investigar bien a la empresa antes de presentarte. ¡Tú puedes!`;
    }

    // Default motivation
    return "No necesitas 100 ofertas. Solo una que cambie tu carrera. Sigue así.";
  }, [applications]);

  return (
    <Card className="h-full shadow-sm bg-gradient-to-br from-violet-500/10 via-transparent to-transparent border-violet-500/20">
      <CardContent className="p-5 flex gap-4 items-start">
        <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-xl flex-shrink-0">
          <Image src="/nekojobs.svg" alt="Neko" width={32} height={32} className="opacity-80" />
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1 text-violet-700 dark:text-violet-400">Neko dice:</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {insightMessage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
