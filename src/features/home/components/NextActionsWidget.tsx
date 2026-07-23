'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="h-full shadow-sm bg-card/50 backdrop-blur-sm border-muted/50">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Target className="w-5 h-5 text-primary" />
          🎯 Hoy
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-4">
          {actions.map((action) => (
            <li key={action.id} className="flex items-start gap-3 group cursor-pointer">
              <div className="mt-0.5 bg-primary/10 p-1.5 rounded-md text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <action.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none mb-1 group-hover:text-primary transition-colors">{action.text}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
