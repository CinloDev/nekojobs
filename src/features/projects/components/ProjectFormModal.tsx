'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project, ProjectStatus, ProjectType, ProjectCurrency, ProjectPaymentStatus, ProjectCategory } from '@/types';
import { useProjectStore } from '../store/useProjectStore';
import { toast } from 'sonner';
import { 
  Building2, 
  FolderKanban, 
  Activity, 
  Layers, 
  Link as LinkIcon, 
  DollarSign, 
  CreditCard,
  Code2, 
  FileText,
  Sparkles,
  Loader2,
  FolderOpen
} from 'lucide-react';

interface ProjectFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectToEdit?: Project | null;
  defaultCategory?: ProjectCategory;
}

const defaultState: Partial<Project> = {
  projectName: '',
  clientName: '',
  category: 'freelance',
  status: 'planning',
  type: 'Website',
  paymentStatus: 'Pendiente',
  technologies: [],
  notes: [],
  description: '',
  url: '',
  budget: undefined,
  currency: 'USD',
};

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: 'idea', label: 'Idea' },
  { value: 'planning', label: 'Planificación' },
  { value: 'in_progress', label: 'En Progreso' },
  { value: 'on_hold', label: 'Pausado' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'completed', label: 'Completado' },
  { value: 'cancelled', label: 'Cancelado' },
  { value: 'prospect', label: 'Prospecto' },
  { value: 'proposal_sent', label: 'Propuesta Enviada' },
  { value: 'negotiating', label: 'Negociando' },
  { value: 'in_review', label: 'En Revisión' }
];

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'personal', label: 'Proyecto Personal' },
  { value: 'open_source', label: 'Open Source' },
  { value: 'freelance', label: 'Trabajo Freelance' },
  { value: 'client', label: 'Proyecto de Cliente' }
];

const types: ProjectType[] = ['Website', 'Web App', 'Maintenance', 'Consulting', 'Other'];
const currencies: ProjectCurrency[] = ['ARS', 'USD'];
const paymentStatuses: ProjectPaymentStatus[] = ['Pendiente', 'Parcial', 'Pagado'];

export function ProjectFormModal({ open, onOpenChange, projectToEdit, defaultCategory = 'freelance' }: ProjectFormModalProps) {
  const { addProject, updateProject } = useProjectStore();
  const [formData, setFormData] = useState<Partial<Project>>({ ...defaultState, category: defaultCategory });
  const [techInput, setTechInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (projectToEdit) {
        setFormData(projectToEdit);
        setTechInput(projectToEdit.technologies?.join(', ') || '');
      } else {
        setFormData({ ...defaultState, category: defaultCategory });
        setTechInput('');
      }
      setIsSaving(false);
    }
  }, [open, projectToEdit, defaultCategory]);

  const isB2B = formData.category === 'freelance' || formData.category === 'client';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalProjectName = formData.projectName?.trim() || '';
    const finalClientName = formData.clientName?.trim() || '';
    
    if (!finalProjectName) {
      toast.error('El nombre del proyecto es obligatorio.');
      return;
    }

    if (isB2B && !finalClientName) {
      toast.error('El nombre del cliente es obligatorio para proyectos comerciales.');
      return;
    }

    let finalUrl = formData.url?.trim() || '';
    if (finalUrl) {
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
      }
      try {
        new URL(finalUrl);
      } catch (e) {
        toast.error('La URL ingresada no es válida.');
        return;
      }
    }

    setIsSaving(true);

    const techArray = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const now = new Date().toISOString();

    const projectData: Project = {
      id: projectToEdit?.id || crypto.randomUUID(),
      projectName: finalProjectName,
      category: formData.category as ProjectCategory || 'personal',
      clientName: isB2B ? finalClientName : undefined,
      status: formData.status as ProjectStatus || 'planning',
      type: formData.type as ProjectType || 'Website',
      description: formData.description?.trim(),
      budget: isB2B ? formData.budget : undefined,
      paidAmount: isB2B && formData.paymentStatus === 'Parcial' ? formData.paidAmount : undefined,
      currency: isB2B ? (formData.currency as ProjectCurrency) : undefined,
      paymentStatus: isB2B ? (formData.paymentStatus as ProjectPaymentStatus || 'Pendiente') : undefined,
      technologies: techArray,
      notes: formData.notes,
      url: finalUrl,
      createdAt: projectToEdit?.createdAt || now,
      updatedAt: now,
    };

    try {
      if (projectToEdit) {
        await updateProject(projectData);
        toast.success('Proyecto actualizado con éxito');
      } else {
        await addProject(projectData);
        toast.success('Proyecto creado con éxito');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error('Hubo un error al guardar el proyecto');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
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
                {projectToEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                {projectToEdit ? 'Actualiza los detalles del proyecto.' : 'Registra un nuevo proyecto en tu pipeline.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Categoría */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 text-muted-foreground font-medium">
              <FolderOpen className="w-4 h-4 text-primary/70" />
              Categoría
            </Label>
            <Select
              disabled={isSaving || !!projectToEdit}
              value={formData.category}
              onValueChange={(val) => setFormData({ ...formData, category: val as ProjectCategory })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Section 1: Basic Info */}
          <div className={`grid grid-cols-1 ${isB2B ? 'sm:grid-cols-2' : ''} gap-4`}>
            <div className="space-y-1.5">
              <Label htmlFor="projectName" className="flex items-center gap-2 text-muted-foreground font-medium">
                <FolderKanban className="w-4 h-4 text-primary/70" />
                Nombre del Proyecto *
              </Label>
              <Input
                id="projectName"
                required
                value={formData.projectName}
                onChange={e => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Ej. E-commerce Neko"
                disabled={isSaving}
              />
            </div>
            
            {isB2B && (
              <div className="space-y-1.5">
                <Label htmlFor="clientName" className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Building2 className="w-4 h-4 text-primary/70" />
                  Cliente *
                </Label>
                <Input
                  id="clientName"
                  required
                  value={formData.clientName || ''}
                  onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Ej. Empresa SA"
                  disabled={isSaving}
                />
              </div>
            )}
          </div>

          {/* Section 2: Status & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                <Activity className="w-4 h-4 text-primary/70" />
                Estado
              </Label>
              <Select
                disabled={isSaving}
                value={formData.status}
                onValueChange={(val) => setFormData({ ...formData, status: val as ProjectStatus })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                <Layers className="w-4 h-4 text-primary/70" />
                Tipo
              </Label>
              <Select
                disabled={isSaving}
                value={formData.type}
                onValueChange={(val) => setFormData({ ...formData, type: val as ProjectType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 3: Budget & Payment (B2B only) */}
          {isB2B && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="budget" className="flex items-center gap-2 text-muted-foreground font-medium">
                  <DollarSign className="w-4 h-4 text-primary/70" />
                  Presupuesto
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget || ''}
                  onChange={e => setFormData({ ...formData, budget: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="Ej. 1500"
                  disabled={isSaving}
                />
              </div>
              
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                  Moneda
                </Label>
                <Select
                  disabled={isSaving}
                  value={formData.currency}
                  onValueChange={(val) => setFormData({ ...formData, currency: val as ProjectCurrency })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                  <CreditCard className="w-4 h-4 text-primary/70" />
                  Pago
                </Label>
                <Select
                  disabled={isSaving}
                  value={formData.paymentStatus}
                  onValueChange={(val) => {
                    setFormData({ ...formData, paymentStatus: val as ProjectPaymentStatus, paidAmount: val !== 'Parcial' ? undefined : formData.paidAmount });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Estado de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentStatuses.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              {formData.paymentStatus === 'Parcial' && (
                <div className="space-y-1.5 col-span-1 sm:col-span-3">
                  <Label htmlFor="paidAmount" className="flex items-center gap-2 text-muted-foreground font-medium">
                    <DollarSign className="w-4 h-4 text-primary/70" />
                    Monto Cobrado
                  </Label>
                  <Input
                    id="paidAmount"
                    type="number"
                    value={formData.paidAmount || ''}
                    onChange={e => setFormData({ ...formData, paidAmount: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="Ej. 500"
                    disabled={isSaving}
                  />
                </div>
              )}
            </div>
          )}

          {/* Section 4: Technologies */}
          <div className="space-y-1.5">
            <Label htmlFor="technologies" className="flex items-center gap-2 text-muted-foreground font-medium">
              <Code2 className="w-4 h-4 text-primary/70" />
              Tecnologías
            </Label>
            <Input
              id="technologies"
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              placeholder="React, Node.js, Tailwind..."
              disabled={isSaving}
            />
          </div>

          {/* Section 5: URL */}
          <div className="space-y-1.5">
            <Label htmlFor="url" className="flex items-center gap-2 text-muted-foreground font-medium">
              <LinkIcon className="w-4 h-4 text-primary/70" />
              URL
            </Label>
            <Input
              id="url"
              value={formData.url || ''}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://github.com/..."
              disabled={isSaving}
            />
          </div>

          {/* Section 6: Notes/Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="flex items-center gap-2 text-muted-foreground font-medium">
              <FileText className="w-4 h-4 text-primary/70" />
              Descripción breve
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detalles sobre el alcance..."
              disabled={isSaving}
              className="resize-none min-h-[60px]"
              rows={2}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Proyecto'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
