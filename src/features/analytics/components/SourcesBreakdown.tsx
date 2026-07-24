'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe2 } from 'lucide-react';

interface SourcesBreakdownProps {
  sources: Array<{ name: string; count: number; percentage: number }>;
}

export function SourcesBreakdown({ sources }: SourcesBreakdownProps) {
  if (sources.length === 0) return null;

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-primary" />
          Fuentes de Oportunidad
        </CardTitle>
        <CardDescription>Descubre qué canales te funcionan mejor.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {sources.map((source, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-muted-foreground">{source.name}</span>
                <span className="font-bold">{source.count} <span className="text-muted-foreground text-xs font-normal">({source.percentage}%)</span></span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary/60 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.max(source.percentage, 2)}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
