'use client';

import { Goal } from '@/types';
import { useGoalProgress } from '../hooks/useGoalProgress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const { currentValue, targetValue, percentage, isCompleted } = useGoalProgress(goal);

  const getTypeLabel = () => {
    switch (goal.type) {
      case 'Applications': return 'Postulaciones';
      case 'Interviews': return 'Entrevistas';
      case 'Learnings': return 'Aprendizajes';
      default: return goal.type;
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md border-border/40 hover:border-primary/20">
      {isCompleted && (
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs">
                {goal.period === 'Weekly' ? 'Semanal' : 'Mensual'}
              </Badge>
              <span className="text-xs text-muted-foreground">{getTypeLabel()}</span>
            </div>
            <CardTitle className="text-lg font-semibold leading-tight mt-2">
              {goal.title}
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {new Date(goal.startDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })} 
              {' - '}
              {new Date(goal.endDate).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(goal)}>
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(goal.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Target className="h-5 w-5 text-primary/70" />
            )}
            <span className="text-2xl font-bold tracking-tight">
              {currentValue}
            </span>
            <span className="text-sm text-muted-foreground font-medium mb-1">
              / {targetValue}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {percentage}%
          </span>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-2" 
          indicatorClassName={isCompleted ? 'bg-green-500' : 'bg-primary'} 
        />
      </CardContent>
    </Card>
  );
}
