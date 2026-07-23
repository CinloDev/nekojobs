'use client';

import { useMemo } from 'react';
import { WidgetCard } from '@/design-system/components/WidgetCard';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { Target, ArrowRight, Code, MessageSquare, Send, type LucideIcon } from 'lucide-react';

export function NextActionsWidget() {
  const { applications } = useJobStore();

  const actions = useMemo(() => {
    const generatedActions: { id: string, text: string, icon: LucideIcon, priority: number }[] = [];
    const now = new Date();

    applications.forEach(app => {
      // 1. Entrevistas pendientes
      if (app.status.includes('Entrevista')) {
        generatedActions.push({
          id: `prep-${app.id}`,
          text: `Preparar entrevista de ${app.company}`,
          icon: MessageSquare,
          priority: 1,
        });
      }
      
      // 2. Pruebas técnicas
      if (app.status === 'Prueba técnica') {
        generatedActions.push({
          id: `tech-${app.id}`,
          text: `Completar prueba técnica para ${app.company}`,
          icon: Code,
          priority: 2,
        });
      }

      // 3. Seguimientos (Aplicada hace más de 7 días)
      if (app.status === 'Aplicada') {
        const daysSinceApp = Math.floor((now.getTime() - new Date(app.appliedAt).getTime()) / (1000 * 3600 * 24));
        if (daysSinceApp > 7 && daysSinceApp < 21) {
          generatedActions.push({
            id: `follow-${app.id}`,
            text: `Hacer seguimiento a ${app.company}`,
            icon: Send,
            priority: 3,
          });
        }
      }
    });

    // Ordenar por prioridad y tomar las top 3
    const topActions = generatedActions.sort((a, b) => a.priority - b.priority).slice(0, 3);

    // Acción por defecto si no hay nada
    if (topActions.length === 0) {
      topActions.push({
        id: 'default-1',
        text: 'Enviar nuevas postulaciones',
        icon: Send,
        priority: 4,
      });
      topActions.push({
        id: 'default-2',
        text: 'Actualizar tu CV o Portfolio',
        icon: Target,
        priority: 5,
      });
    }

    return topActions;
  }, [applications]);

  return (
    <WidgetCard title="🎯 Hoy" icon={<Target className="w-5 h-5 text-brand-primary" />}>
      <ul className="space-y-md">
        {actions.map((action) => (
          <li key={action.id} className="flex items-start gap-3 group cursor-pointer">
            <div className="mt-0.5 bg-brand-primary/10 p-1.5 rounded-md text-brand-primary group-hover:bg-brand-primary group-hover:text-text-inverse transition-colors">
              <action.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-body-sm font-medium leading-none mb-1 group-hover:text-brand-primary transition-colors">{action.text}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
