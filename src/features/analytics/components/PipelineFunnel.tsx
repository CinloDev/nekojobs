'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PipelineFunnelProps {
  pipeline: {
    saved: number;
    applied: number;
    inProgress: number;
    result: number;
  };
}

export function PipelineFunnel({ pipeline }: PipelineFunnelProps) {
  const max = Math.max(pipeline.saved, pipeline.applied, pipeline.inProgress, pipeline.result, 1); // Evitar división por cero

  const stages = [
    { label: 'Guardadas', value: pipeline.saved, color: 'bg-muted-foreground' },
    { label: 'Aplicadas', value: pipeline.applied, color: 'bg-blue-500' },
    { label: 'En progreso', value: pipeline.inProgress, color: 'bg-purple-500' },
    { label: 'Resultados', value: pipeline.result, color: 'bg-primary' },
  ];

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-lg">Pipeline de Postulaciones</CardTitle>
        <CardDescription>Distribución general de tu embudo de conversión.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {stages.map((stage, idx) => {
            const width = `${Math.max((stage.value / max) * 100, 2)}%`; // Mínimo 2% para que se vea la barra
            
            return (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">{stage.label}</span>
                  <span className="font-bold">{stage.value}</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stage.color} rounded-full transition-all duration-1000`} 
                    style={{ width }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
