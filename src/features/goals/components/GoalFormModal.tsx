'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Goal, GoalType, GoalPeriod } from '@/types';
import { useGoalStore } from '../store/useGoalStore';
import { toast } from 'sonner';
import { Target, Loader2, Calendar } from 'lucide-react';

interface GoalFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalToEdit?: Goal | null;
}

const defaultState: Partial<Goal> = {
  title: '',
  type: 'Applications',
  targetValue: 10,
  period: 'Weekly',
};

// Utilidad para obtener fechas semanales/mensuales
function getPeriodDates(period: GoalPeriod) {
  const now = new Date();
  
  if (period === 'Weekly') {
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Lunes
    const start = new Date(now.setDate(diff));
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setDate(end.getDate() + 6); // Domingo
    end.setHours(23, 59, 59, 999);
    
    return { startDate: start.toISOString(), endDate: end.toISOString() };
  } else {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Último día del mes
    end.setHours(23, 59, 59, 999);
    
    return { startDate: start.toISOString(), endDate: end.toISOString() };
  }
}

export function GoalFormModal({ open, onOpenChange, goalToEdit }: GoalFormModalProps) {
  const { addGoal, updateGoal } = useGoalStore();
  const [formData, setFormData] = useState<Partial<Goal>>(defaultState);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) {
      if (goalToEdit) {
        setFormData(goalToEdit);
      } else {
        setFormData(defaultState);
      }
      setIsSaving(false);
    }
  }, [open, goalToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalTitle = formData.title?.trim() || '';
    if (!finalTitle) {
      toast.error('El título es obligatorio.');
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const { startDate, endDate } = getPeriodDates(formData.period as GoalPeriod);
    
    if (goalToEdit) {
      // Al editar un periodo se recalculan las fechas
      await updateGoal({
        ...goalToEdit,
        ...formData,
        title: finalTitle,
        startDate: goalToEdit.period === formData.period ? goalToEdit.startDate : startDate,
        endDate: goalToEdit.period === formData.period ? goalToEdit.endDate : endDate,
      } as Goal);
      toast.success('Meta actualizada');
    } else {
      await addGoal({
        id: crypto.randomUUID(),
        ...formData,
        title: finalTitle,
        currentValue: 0,
        status: 'Active',
        startDate,
        endDate,
      } as Goal);
      toast.success('Meta creada con éxito');
    }
    
    setIsSaving(false);
    onOpenChange(false);
  };

  const updateField = (field: keyof Goal, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                {goalToEdit ? 'Editar Meta' : 'Nueva Meta'}
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Define un objetivo para mantener el ritmo de tu búsqueda.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Título de la meta *</Label>
            <Input 
              id="title" 
              required 
              value={formData.title} 
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Ej. Enviar postulaciones semanales"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Tipo de Objetivo</Label>
              <Select value={formData.type} onValueChange={(val) => updateField('type', val as GoalType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applications">Postulaciones</SelectItem>
                  <SelectItem value="Interviews">Entrevistas</SelectItem>
                  <SelectItem value="Learnings">Aprendizajes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label>Período</Label>
              <Select value={formData.period} onValueChange={(val) => updateField('period', val as GoalPeriod)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weekly">Semanal</SelectItem>
                  <SelectItem value="Monthly">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="targetValue">Valor objetivo (Cantidad) *</Label>
            <Input 
              id="targetValue" 
              type="number" 
              min={1}
              required 
              value={formData.targetValue} 
              onChange={(e) => updateField('targetValue', parseInt(e.target.value) || 1)} 
            />
          </div>

          {formData.period && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg mt-2">
              <Calendar className="w-4 h-4" />
              <span>
                El progreso se medirá automáticamente para {formData.period === 'Weekly' ? 'la semana en curso' : 'el mes actual'}.
              </span>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving} className="min-w-[120px]">
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando
                </>
              ) : (
                'Guardar Meta'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
