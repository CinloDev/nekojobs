'use client';

import { useState, useEffect } from 'react';
import { useJobStore } from '../store/useJobStore';
import { Application, ApplicationStatus, ApplicationSource, Modality } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { StatusBadge } from '@/design-system/components/StatusBadge';
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
  Save,
  ExternalLink,
  Loader2
} from 'lucide-react';

const statuses: ApplicationStatus[] = [
  'Guardada', 'Aplicada', 'Contactado', 'Entrevista RRHH', 
  'Entrevista técnica', 'Prueba técnica', 'Entrevista Final', 'Oferta', 'Contratado', 'Rechazada', 'Ghosting'
];

const sources: ApplicationSource[] = [
  'LinkedIn', 'Workana', 'Indeed', 'Computrabajo', 'Referido', 'Página empresa', 'Otro'
];

const modalities: Modality[] = ['Remoto', 'Híbrido', 'Presencial'];

export function ApplicationDetails({ applicationId }: { applicationId: string }) {
  const { applications, loadApplications, updateApplication, isLoading } = useJobStore();
  const [formData, setFormData] = useState<Partial<Application> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const application = applications.find(a => a.id === applicationId);

  useEffect(() => {
    if (applications.length === 0) {
      loadApplications();
    }
  }, [applications.length, loadApplications]);

  useEffect(() => {
    if (application) {
      setFormData(application);
      setTechInput(application.technologies?.join(', ') || '');
    }
  }, [application]);

  const updateField = (field: keyof Application, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSave = async () => {
    if (!formData || !application) return;

    setIsSaving(true);
    
    let finalUrl = formData.url?.trim() || '';
    if (finalUrl && !/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    const technologies = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const updatedApp: Application = {
      ...application,
      ...formData,
      url: finalUrl,
      technologies,
      updatedAt: new Date().toISOString(),
    } as Application;

    try {
      await updateApplication(updatedApp);
      toast.success('Cambios guardados');
    } catch (e) {
      toast.error('Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !application) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    );
  }

  if (!application || !formData) {
    return (
      <div className="flex justify-center items-center h-48 text-muted-foreground">
        Postulación no encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{formData.position}</h1>
            <div className="text-lg text-muted-foreground font-medium flex items-center gap-2 mt-1">
              {formData.company}
              {formData.url && (
                <a href={formData.url} target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center text-sm">
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={formData.status} onValueChange={(val) => updateField('status', val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Guardar
          </Button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-primary/70" />
            Detalles de la Postulación
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-muted-foreground flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5" /> Fuente</Label>
                <Select value={formData.source} onValueChange={(val) => updateField('source', val)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {sources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Modalidad</Label>
                <Select value={formData.modality} onValueChange={(val) => updateField('modality', val)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {modalities.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Salario esperado / ofrecido</Label>
              <Input 
                value={formData.salary || ''} 
                onChange={(e) => updateField('salary', e.target.value)} 
                placeholder="Ej: $3000 USD"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> Tecnologías</Label>
              <Input 
                value={techInput} 
                onChange={(e) => setTechInput(e.target.value)} 
                placeholder="React, TypeScript, Node.js"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm flex flex-col">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary/70" />
            Notas
          </h3>
          <Textarea 
            className="flex-1 min-h-[200px] resize-none"
            placeholder="Anota aquí cualquier detalle importante sobre esta postulación..."
            value={formData.notes || ''}
            onChange={(e) => updateField('notes', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
