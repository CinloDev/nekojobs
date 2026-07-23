'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Application, ApplicationStatus, ApplicationSource, Modality } from '@/types';
import { useJobStore } from '../store/useJobStore';

interface ApplicationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationToEdit?: Application | null;
}

const defaultState: Partial<Application> = {
  company: '',
  position: '',
  status: 'Guardada',
  source: 'LinkedIn',
  technologies: [],
  url: '',
  salary: '',
  modality: 'Remoto',
  notes: '',
};

const statuses: ApplicationStatus[] = [
  'Guardada', 'Aplicada', 'Contactado', 'Entrevista RRHH', 
  'Entrevista técnica', 'Prueba técnica', 'Oferta', 'Rechazada', 'Ghosting'
];

const sources: ApplicationSource[] = [
  'LinkedIn', 'Workana', 'Indeed', 'Computrabajo', 'Referido', 'Página empresa', 'Otro'
];

const modalities: Modality[] = ['Remoto', 'Híbrido', 'Presencial'];

export function ApplicationFormModal({ open, onOpenChange, applicationToEdit }: ApplicationFormModalProps) {
  const { addApplication, updateApplication } = useJobStore();
  const [formData, setFormData] = useState<Partial<Application>>(defaultState);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) {
      if (applicationToEdit) {
        setFormData(applicationToEdit);
        setTechInput(applicationToEdit.technologies?.join(', ') || '');
      } else {
        setFormData(defaultState);
        setTechInput('');
      }
    }
  }, [open, applicationToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const technologies = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const now = new Date().toISOString();
    
    if (applicationToEdit) {
      updateApplication({
        ...applicationToEdit,
        ...formData,
        technologies,
        updatedAt: now,
      } as Application);
    } else {
      addApplication({
        id: crypto.randomUUID(),
        ...formData,
        technologies,
        appliedAt: now,
        updatedAt: now,
      } as Application);
    }
    
    onOpenChange(false);
  };

  const updateField = (field: keyof Application, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{applicationToEdit ? 'Editar Postulación' : 'Nueva Postulación'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Input 
                id="company" 
                required 
                value={formData.company} 
                onChange={(e) => updateField('company', e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Posición *</Label>
              <Input 
                id="position" 
                required 
                value={formData.position} 
                onChange={(e) => updateField('position', e.target.value)} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Estado *</Label>
              <Select value={formData.status} onValueChange={(val) => updateField('status', val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fuente *</Label>
              <Select value={formData.source} onValueChange={(val) => updateField('source', val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar fuente" />
                </SelectTrigger>
                <SelectContent>
                  {sources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL de la oferta</Label>
            <Input 
              id="url" 
              type="url" 
              placeholder="https://..."
              value={formData.url} 
              onChange={(e) => updateField('url', e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Modalidad</Label>
              <Select value={formData.modality} onValueChange={(val) => updateField('modality', val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar modalidad" />
                </SelectTrigger>
                <SelectContent>
                  {modalities.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salario (Opcional)</Label>
              <Input 
                id="salary" 
                placeholder="Ej: $3000 USD"
                value={formData.salary || ''} 
                onChange={(e) => updateField('salary', e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Tecnologías (separadas por coma)</Label>
            <Input 
              id="technologies" 
              placeholder="React, TypeScript, Node.js"
              value={techInput} 
              onChange={(e) => setTechInput(e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas adicionales</Label>
            <Textarea 
              id="notes" 
              placeholder="Entrevistador fue muy amable, repasar algoritmos..."
              className="resize-none h-20"
              value={formData.notes || ''} 
              onChange={(e) => updateField('notes', e.target.value)} 
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {applicationToEdit ? 'Guardar Cambios' : 'Crear Postulación'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
