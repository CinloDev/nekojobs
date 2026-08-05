'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Interview } from '@/types';
import { useInterviewStore } from '../store/useInterviewStore';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock, Users, FileText, Loader2, MessageSquare } from 'lucide-react';

interface InterviewFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId: string;
  interviewToEdit?: Interview | null;
}

const interviewTypes = ['RRHH', 'Técnica', 'Cultural', 'Prueba Técnica'];
const interviewStatuses = ['Agendada', 'Completada', 'Cancelada'];

const defaultState: Partial<Interview> = {
  type: 'RRHH',
  status: 'Agendada',
  notes: '',
  feedback: '',
  interviewers: [],
};

export function InterviewFormModal({ open, onOpenChange, applicationId, interviewToEdit }: InterviewFormModalProps) {
  const { addInterview, updateInterview } = useInterviewStore();
  const [formData, setFormData] = useState<Partial<Interview>>(defaultState);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState('09');
  const [minute, setMinute] = useState('00');
  const [interviewersStr, setInterviewersStr] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (interviewToEdit) {
        setFormData(interviewToEdit);
        const dateObj = new Date(interviewToEdit.date);
        setDate(dateObj);
        setHour(dateObj.getHours().toString().padStart(2, '0'));
        setMinute(dateObj.getMinutes().toString().padStart(2, '0'));
        setInterviewersStr(interviewToEdit.interviewers?.join(', ') || '');
      } else {
        setFormData(defaultState);
        setDate(new Date());
        setHour('09');
        setMinute('00');
        setInterviewersStr('');
      }
      setIsSaving(false);
    }
  }, [open, interviewToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error('La fecha es obligatoria.');
      return;
    }

    setIsSaving(true);
    
    // Combine date and time
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(hour, 10));
    dateTime.setMinutes(parseInt(minute, 10));
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    
    const interviewers = interviewersStr.split(',').map(i => i.trim()).filter(i => i.length > 0);

    const dataToSave = {
      ...formData,
      applicationId,
      date: dateTime.toISOString(),
      interviewers,
    } as Interview;

    try {
      if (interviewToEdit) {
        await updateInterview({ ...dataToSave, id: interviewToEdit.id });
        toast.success('Entrevista actualizada');
      } else {
        await addInterview({ ...dataToSave, id: crypto.randomUUID() });
        toast.success('Entrevista agendada');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error('Hubo un error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof Interview, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary ring-1 ring-primary/20">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl text-primary">
                {interviewToEdit ? 'Editar Entrevista' : 'Agendar Entrevista'}
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Registra los detalles de la entrevista para esta postulación.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 flex flex-col">
              <Label className="flex items-center gap-2 text-muted-foreground"><CalendarIcon className="w-4 h-4" /> Fecha *</Label>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-border/50",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP", { locale: es }) : <span>Elige una fecha</span>}
                    </Button>
                  }
                />
                <PopoverContent className="w-auto p-0 z-[100]" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1.5 flex flex-col">
              <Label className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4" /> Hora *</Label>
              <div className="flex gap-2">
                <Select value={hour} onValueChange={(val) => setHour(val || '09')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="HH" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-h-48">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <SelectItem key={`h-${i}`} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xl font-bold flex items-center mb-1 text-muted-foreground">:</div>
                <Select value={minute} onValueChange={(val) => setMinute(val || '00')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-h-48">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SelectItem key={`m-${i*5}`} value={(i*5).toString().padStart(2, '0')}>
                        {(i*5).toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-muted-foreground">Tipo *</Label>
              <Select value={formData.type} onValueChange={(val) => updateField('type', val)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {interviewTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground">Estado *</Label>
              <Select value={formData.status} onValueChange={(val) => updateField('status', val)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {interviewStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 text-muted-foreground"><Users className="w-4 h-4" /> Entrevistadores</Label>
            <Input placeholder="Ej: John Doe, Jane Smith" value={interviewersStr} onChange={(e) => setInterviewersStr(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 text-muted-foreground"><FileText className="w-4 h-4" /> Notas previas</Label>
            <Textarea placeholder="Temas a preparar..." className="resize-none" value={formData.notes || ''} onChange={(e) => updateField('notes', e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="flex items-center gap-2 text-muted-foreground"><MessageSquare className="w-4 h-4" /> Feedback posterior</Label>
            <Textarea placeholder="¿Cómo te fue?" className="resize-none" value={formData.feedback || ''} onChange={(e) => updateField('feedback', e.target.value)} />
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>Cancelar</Button>
            <Button type="submit" disabled={isSaving} className="min-w-[120px]">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Guardar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
