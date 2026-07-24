'use client';

import { Learning } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, BookOpen, Code2, Users, Briefcase } from 'lucide-react';
import { useJobStore } from '@/features/applications/store/useJobStore';

interface LearningCardProps {
  learning: Learning;
  onEdit: (learning: Learning) => void;
  onDelete: (id: string) => void;
}

export function LearningCard({ learning, onEdit, onDelete }: LearningCardProps) {
  const { applications } = useJobStore();
  const relatedApp = learning.relatedApplicationId 
    ? applications.find(a => a.id === learning.relatedApplicationId) 
    : null;

  const getCategoryIcon = () => {
    switch (learning.category) {
      case 'Technical': return <Code2 className="w-4 h-4 text-blue-500" />;
      case 'Soft Skills': return <Users className="w-4 h-4 text-green-500" />;
      case 'Interview': return <Briefcase className="w-4 h-4 text-purple-500" />;
      default: return <BookOpen className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <Card className="group relative transition-all hover:shadow-md border-border/40 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-muted rounded-md">
                {getCategoryIcon()}
              </div>
              <span className="text-xs font-medium text-muted-foreground">{learning.category}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {new Date(learning.createdAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <CardTitle className="text-lg font-semibold leading-tight mt-2">
              {learning.title}
            </CardTitle>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(learning)}>
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(learning.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-4 line-clamp-4">
          {learning.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {learning.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        {relatedApp && (
          <div className="pt-3 border-t flex items-center gap-2 text-xs text-muted-foreground">
            <Briefcase className="w-3 h-3" />
            <span>Relacionado con: <strong className="text-foreground">{relatedApp.company}</strong> ({relatedApp.position})</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
