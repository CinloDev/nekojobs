'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export function RecentLearningsWidget() {
  const mockLearnings = [
    'Practicar despliegues con Docker',
    'Mejorar testing en React (Jest/RTL)',
    'Repasar respuestas en inglés conversacional',
  ];

  return (
    <Card className="h-full shadow-sm bg-card/50 backdrop-blur-sm border-muted/50">
      <CardHeader className="pb-4 border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <BookOpen className="w-5 h-5 text-primary" />
          Últimos Aprendizajes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="space-y-3">
          {mockLearnings.map((learning, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-1">•</span>
              <span>{learning}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
