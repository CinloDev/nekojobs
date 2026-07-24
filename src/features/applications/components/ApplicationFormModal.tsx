'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Application, ApplicationStatus, ApplicationSource, Modality } from '@/types';
import { useJobStore } from '../store/useJobStore';
import { toast } from 'sonner';
import { 
  Building2, 
  Briefcase, 
  Activity, 
  Globe2, 
  Link as LinkIcon, 
  MapPin, 
  DollarSign, 
  Code2, 
  FileText,
  Sparkles,
  Loader2
} from 'lucide-react';

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
  const [isSaving, setIsSaving] = useState(false);

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
      setIsSaving(false);
    }
  }, [open, applicationToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validar campos requeridos sin espacios
    const finalCompany = formData.company?.trim() || '';
    const finalPosition = formData.position?.trim() || '';
    
    if (!finalCompany || !finalPosition) {
      toast.error('La empresa y la posición son obligatorias.');
      return;
    }

    // 2. Validar URL (autocompletar http/https y verificar validez)
    let finalUrl = formData.url?.trim() || '';
    if (finalUrl) {
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
      }
      try {
        new URL(finalUrl); // Lanza error si no es válida
      } catch (e) {
        toast.error('La URL ingresada no parece ser válida. Por favor, revísala.');
        return;
      }
    }

    setIsSaving(true);
    
    // Simular un poco de latencia para mejorar el UX de feedback (opcional)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const technologies = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const now = new Date().toISOString();
    
    if (applicationToEdit) {
      updateApplication({
        ...applicationToEdit,
        ...formData,
        company: finalCompany,
        position: finalPosition,
        url: finalUrl,
        technologies,
        updatedAt: now,
      } as Application);
      toast.success('Postulación actualizada correctamente');
    } else {
      addApplication({
        id: crypto.randomUUID(),
        ...formData,
        company: finalCompany,
        position: finalPosition,
        url: finalUrl,
        technologies,
        appliedAt: now,
        updatedAt: now,
      } as Application);
      toast.success('Nueva postulación agregada con éxito');
    }
    
    setIsSaving(false);
    onOpenChange(false);
  };

  const updateField = (field: keyof Application, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl text-primary">
                {applicationToEdit ? 'Editar Postulación' : 'Nueva Postulación'}
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                {applicationToEdit ? 'Actualiza los datos de tu búsqueda' : 'Registra una nueva oportunidad laboral en tu pipeline.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="company" className="flex items-center gap-2 text-muted-foreground font-medium">
                <Building2 className="w-4 h-4 text-primary/70" />
                Empresa *
              </Label>
              <Input 
                id="company" 
                required 
                value={formData.company} 
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="Ej. Google"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="position" className="flex items-center gap-2 text-muted-foreground font-medium">
                <Briefcase className="w-4 h-4 text-primary/70" />
                Posición *
              </Label>
              <Input 
                id="position" 
                required 
                value={formData.position} 
                onChange={(e) => updateField('position', e.target.value)} 
                placeholder="Ej. Frontend Developer"
              />
            </div>
          </div>

          {/* Section 2: Status & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                <Activity className="w-4 h-4 text-primary/70" />
                Estado *
              </Label>
              <Select value={formData.status} onValueChange={(val) => updateField('status', val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                <Globe2 className="w-4 h-4 text-primary/70" />
                Fuente *
              </Label>
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

          {/* Section 3: URL */}
          <div className="space-y-1.5">
            <Label htmlFor="url" className="flex items-center gap-2 text-muted-foreground font-medium">
              <LinkIcon className="w-4 h-4 text-primary/70" />
              URL de la oferta
            </Label>
            <Input 
              id="url" 
              type="text" 
              placeholder="Ej: www.linkedin.com/jobs/..."
              value={formData.url} 
              onChange={(e) => updateField('url', e.target.value)} 
            />
          </div>

          {/* Section 4: Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                <MapPin className="w-4 h-4 text-primary/70" />
                Modalidad
              </Label>
              <Select value={formData.modality} onValueChange={(val) => updateField('modality', val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar modalidad" />
                </SelectTrigger>
                <SelectContent>
                  {modalities.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salary" className="flex items-center gap-2 text-muted-foreground font-medium">
                <DollarSign className="w-4 h-4 text-primary/70" />
                Salario
              </Label>
              <Input 
                id="salary" 
                placeholder="Ej: $3000 USD"
                value={formData.salary || ''} 
                onChange={(e) => updateField('salary', e.target.value)} 
              />
            </div>
          </div>

          {/* Section 5: Technologies */}
          <div className="space-y-1.5">
            <Label htmlFor="technologies" className="flex items-center gap-2 text-muted-foreground font-medium">
              <Code2 className="w-4 h-4 text-primary/70" />
              Tecnologías
            </Label>
            <Input 
              id="technologies" 
              placeholder="React, TypeScript, Node.js"
              value={techInput} 
              onChange={(e) => setTechInput(e.target.value)} 
            />
          </div>

          {/* Section 6: Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="flex items-center gap-2 text-muted-foreground font-medium">
              <FileText className="w-4 h-4 text-primary/70" />
              Notas
            </Label>
            <Textarea 
              id="notes" 
              placeholder="El entrevistador fue amable..."
              className="resize-none min-h-[60px]"
              value={formData.notes || ''} 
              onChange={(e) => updateField('notes', e.target.value)} 
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
                  Guardando...
                </>
              ) : (
                applicationToEdit ? 'Guardar Cambios' : 'Crear Postulación'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
