'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Learning, LearningCategory } from '@/types';
import { useLearningStore } from '../store/useLearningStore';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { toast } from 'sonner';
import { BookOpen, Loader2 } from 'lucide-react';

interface LearningFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  learningToEdit?: Learning | null;
}

const defaultState: Partial<Learning> = {
  title: '',
  description: '',
  category: 'Technical',
  tags: [],
  relatedApplicationId: '',
};

const categories: LearningCategory[] = ['Technical', 'Interview', 'CV', 'Soft Skills'];

export function LearningFormModal({ open, onOpenChange, learningToEdit }: LearningFormModalProps) {
  const { addLearning, updateLearning } = useLearningStore();
  const { applications } = useJobStore();
  
  const [formData, setFormData] = useState<Partial<Learning>>(defaultState);
  const [tagsInput, setTagsInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) {
      if (learningToEdit) {
        setFormData(learningToEdit);
        setTagsInput(learningToEdit.tags.join(', '));
      } else {
        setFormData(defaultState);
        setTagsInput('');
      }
      setIsSaving(false);
    }
  }, [open, learningToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalTitle = formData.title?.trim() || '';
    const finalDescription = formData.description?.trim() || '';
    
    if (!finalTitle || !finalDescription) {
      toast.error('El título y la descripción son obligatorios.');
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
      
    // Si eligieron "Ninguna", lo guardamos como undefined
    const finalRelatedAppId = formData.relatedApplicationId === 'none' ? undefined : formData.relatedApplicationId;
    
    if (learningToEdit) {
      await updateLearning({
        ...learningToEdit,
        ...formData,
        title: finalTitle,
        description: finalDescription,
        tags,
        relatedApplicationId: finalRelatedAppId,
      } as Learning);
      toast.success('Aprendizaje actualizado');
    } else {
      await addLearning({
        id: crypto.randomUUID(),
        ...formData,
        title: finalTitle,
        description: finalDescription,
        tags,
        relatedApplicationId: finalRelatedAppId,
        createdAt: new Date().toISOString(),
      } as Learning);
      toast.success('Aprendizaje registrado con éxito');
    }
    
    setIsSaving(false);
    onOpenChange(false);
  };

  const updateField = (field: keyof Learning, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                {learningToEdit ? 'Editar Aprendizaje' : 'Nuevo Aprendizaje'}
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Registra lecciones, preguntas técnicas o feedback de tus entrevistas.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="title">Título *</Label>
            <Input 
              id="title" 
              required 
              value={formData.title} 
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Ej. Preguntas sobre React Hooks en Google"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Categoría</Label>
              <Select value={formData.category} onValueChange={(val) => updateField('category', val as LearningCategory)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5">
              <Label>Postulación relacionada (Opcional)</Label>
              <Select value={formData.relatedApplicationId || 'none'} onValueChange={(val) => updateField('relatedApplicationId', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ninguna" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  {applications.map(app => (
                    <SelectItem key={app.id} value={app.id}>
                      {app.company} - {app.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Descripción / Notas *</Label>
            <Textarea 
              id="description" 
              required
              className="min-h-[120px] resize-none"
              value={formData.description} 
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Escribe aquí lo que aprendiste, qué mejorarías o qué te preguntaron..."
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
            <Input 
              id="tags" 
              value={tagsInput} 
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Ej. Frontend, Algoritmos, Negociación"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving} className="min-w-[150px]">
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando
                </>
              ) : (
                'Guardar Aprendizaje'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
