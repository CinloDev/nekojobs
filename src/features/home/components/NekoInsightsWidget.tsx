'use client';

import { useMemo } from 'react';
import { WidgetCard } from '@/design-system/components/WidgetCard';
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
    <WidgetCard className="bg-brand-soft border-0 shadow-none" contentClassName="flex flex-col sm:flex-row gap-3 sm:gap-md items-start pt-lg">
      <div className="flex items-center gap-3 sm:items-start">
        <div className="bg-brand-primary/10 p-sm rounded-lg flex-shrink-0">
          <Image src="/nekojobs.svg" alt="Neko" width={32} height={32} className="opacity-90" />
        </div>
        <h3 className="sm:hidden font-semibold text-body-md text-brand-primary">Neko dice:</h3>
      </div>
      <div>
        <h3 className="hidden sm:block font-semibold text-body-md mb-1 text-brand-primary">Neko dice:</h3>
        <p className="text-body-sm text-text-secondary leading-relaxed">
          {insightMessage}
        </p>
      </div>
    </WidgetCard>
  );
}
