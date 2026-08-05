'use client';

import { useState, useEffect } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { Project, ProjectStatus, ProjectCategory, ProjectType, ProjectCurrency, ProjectPaymentStatus, ProjectNote } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { StatusBadge } from '@/design-system/components/StatusBadge';
import { 
  Building2, 
  FolderKanban, 
  Activity, 
  Globe2, 
  Link as LinkIcon, 
  DollarSign, 
  Code2, 
  FileText,
  Save,
  ExternalLink,
  Loader2,
  Folder,
  Briefcase,
  Users,
  CreditCard,
  Layers,
  Plus,
  Trash2,
  Calendar,
  Pencil,
  X,
  Check
} from 'lucide-react';

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

export function ProjectDetails({ projectId }: { projectId: string }) {
  const { projects, loadProjects, updateProject, isLoading } = useProjectStore();
  const [formData, setFormData] = useState<Partial<Project> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState('');

  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    if (projects.length === 0) {
      loadProjects();
    }
  }, [projects.length, loadProjects]);

  useEffect(() => {
    if (project) {
      setFormData(project);
      setTechInput(project.technologies?.join(', ') || '');
    }
  }, [project]);

  const updateField = (field: keyof Project, value: any) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !formData) return;
    const note: ProjectNote = {
      id: crypto.randomUUID(),
      content: newNote.trim(),
      createdAt: new Date().toISOString()
    };
    const updatedNotes = [...(formData.notes || []), note];
    updateField('notes', updatedNotes);
    setNewNote('');
  };

  const handleDeleteNote = (id: string) => {
    if (!formData) return;
    updateField('notes', (formData.notes || []).filter(n => n.id !== id));
  };

  const startEditingNote = (note: ProjectNote) => {
    setEditingNoteId(note.id);
    setEditingNoteContent(note.content);
  };

  const handleSaveEditedNote = () => {
    if (!formData || !editingNoteId) return;
    const updatedNotes = (formData.notes || []).map(n => 
      n.id === editingNoteId ? { ...n, content: editingNoteContent } : n
    );
    updateField('notes', updatedNotes);
    setEditingNoteId(null);
    setEditingNoteContent('');
  };

  const handleSave = async () => {
    if (!formData || !project) return;

    setIsSaving(true);
    
    let finalUrl = formData.url?.trim() || '';
    if (finalUrl && !/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    const technologies = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const isB2B = formData.category === 'freelance' || formData.category === 'client';

    const updatedProject: Project = {
      ...project,
      ...formData,
      clientName: isB2B ? formData.clientName : undefined,
      budget: isB2B ? formData.budget : undefined,
      paidAmount: isB2B && formData.paymentStatus === 'Parcial' ? formData.paidAmount : undefined,
      currency: isB2B ? formData.currency : undefined,
      paymentStatus: isB2B ? formData.paymentStatus : undefined,
      url: finalUrl,
      technologies,
      updatedAt: new Date().toISOString(),
    } as Project;

    try {
      await updateProject(updatedProject);
      toast.success('Cambios guardados');
    } catch (e) {
      toast.error('Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading && !project) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    );
  }

  if (!project || !formData) {
    return (
      <div className="flex justify-center items-center h-48 text-muted-foreground">
        Proyecto no encontrado.
      </div>
    );
  }

  const isB2B = formData.category === 'freelance' || formData.category === 'client';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
            <FolderKanban className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{formData.projectName}</h1>
            <div className="text-lg text-muted-foreground font-medium flex items-center gap-2 mt-1">
              {isB2B && formData.clientName ? formData.clientName : (categories.find(c => c.value === formData.category)?.label || formData.category)}
              {formData.url && (
                <a href={formData.url} target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center text-sm">
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Select value={formData.category} onValueChange={(val) => updateField('category', val)}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={formData.status} onValueChange={(val) => updateField('status', val)}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Guardar
          </Button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-primary/70" />
              Detalles del Proyecto
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-muted-foreground flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" /> Tipo</Label>
                  <Select value={formData.type} onValueChange={(val) => updateField('type', val)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                {isB2B && (
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Cliente</Label>
                    <Input 
                      value={formData.clientName || ''} 
                      onChange={(e) => updateField('clientName', e.target.value)} 
                      placeholder="Empresa SA"
                    />
                  </div>
                )}
              </div>

              {isB2B && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/50">
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Presupuesto</Label>
                    <div className="flex gap-2">
                      <Select value={formData.currency || 'USD'} onValueChange={(val) => updateField('currency', val)}>
                        <SelectTrigger className="w-[90px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input 
                        type="number"
                        value={formData.budget || ''} 
                        onChange={(e) => updateField('budget', e.target.value ? Number(e.target.value) : undefined)} 
                        placeholder="0"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Estado de Pago</Label>
                    <Select value={formData.paymentStatus || 'Pendiente'} onValueChange={(val) => updateField('paymentStatus', val)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {paymentStatuses.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.paymentStatus === 'Parcial' && (
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label className="text-muted-foreground flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Monto Cobrado</Label>
                      <Input 
                        type="number"
                        value={formData.paidAmount || ''} 
                        onChange={(e) => updateField('paidAmount', e.target.value ? Number(e.target.value) : undefined)} 
                        placeholder="Monto cobrado parcialmente"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1.5 pt-2 border-t border-border/50">
                <Label className="text-muted-foreground flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> Tecnologías</Label>
                <Input 
                  value={techInput} 
                  onChange={(e) => setTechInput(e.target.value)} 
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary/70" />
              Descripción
            </h3>
            <Textarea 
              className="w-full min-h-[100px] resize-none"
              placeholder="Descripción o alcance del proyecto..."
              value={formData.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm flex flex-col h-full min-h-[400px]">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary/70" />
            Notas
          </h3>
          
          <div className="space-y-3">
            <Textarea 
              className="w-full resize-none min-h-[100px]"
              placeholder="Anota aquí cualquier detalle importante, enlaces útiles, próximas tareas..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddNote} disabled={!newNote.trim()} size="sm" variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Nota
              </Button>
            </div>
          </div>

          <div className="mt-6 flex-1 flex flex-col gap-3 overflow-y-auto pr-2">
            {!formData.notes || formData.notes.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg p-6">
                No hay notas para este proyecto aún.
              </div>
            ) : (
              [...formData.notes].reverse().map(note => (
                <div key={note.id} className="group relative bg-accent/30 p-4 rounded-lg border border-border/50 text-sm">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(note.createdAt).toLocaleDateString()} a las {new Date(note.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {editingNoteId !== note.id && (
                        <button 
                          onClick={() => startEditingNote(note)}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {editingNoteId === note.id ? (
                    <div className="space-y-2 mt-2">
                      <Textarea 
                        className="w-full resize-none min-h-[80px] bg-background"
                        value={editingNoteContent}
                        onChange={(e) => setEditingNoteContent(e.target.value)}
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <Button onClick={() => setEditingNoteId(null)} size="sm" variant="ghost" className="h-7 px-2 text-xs">
                          <X className="w-3.5 h-3.5 mr-1" />
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveEditedNote} disabled={!editingNoteContent.trim()} size="sm" className="h-7 px-2 text-xs">
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Guardar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-foreground/90">{note.content}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
