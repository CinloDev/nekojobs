'use client';

import { WidgetCard } from '@/design-system/components/WidgetCard';
import { BookOpen } from 'lucide-react';

export function RecentLearningsWidget() {
  const mockLearnings = [
    'Practicar despliegues con Docker',
    'Mejorar testing en React (Jest/RTL)',
    'Repasar respuestas en inglés conversacional',
  ];

  return (
    <WidgetCard title="Últimos Aprendizajes" icon={<BookOpen className="w-5 h-5 text-brand-primary" />}>
      <ul className="space-y-sm">
        {mockLearnings.map((learning, i) => (
          <li key={i} className="flex items-start gap-2 text-body-sm text-text-secondary">
            <span className="text-brand-primary mt-1">•</span>
            <span>{learning}</span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
