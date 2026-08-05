'use client';

import { useState, useEffect } from 'react';
import { useInterviewStore } from '../store/useInterviewStore';
import { Interview } from '@/types';
import { Button } from '@/components/ui/button';
import { InterviewFormModal } from './InterviewFormModal';
import { Calendar as CalendarIcon, Clock, Users, FileText, CheckCircle2, MessageSquare, Plus, Edit, Trash2 } from 'lucide-react';

export function InterviewsSection({ applicationId }: { applicationId: string }) {
  const { interviews, loadInterviewsByApplication, deleteInterview } = useInterviewStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  useEffect(() => {
    loadInterviewsByApplication(applicationId);
  }, [applicationId, loadInterviewsByApplication]);

  const handleEdit = (interview: Interview) => {
    setEditingInterview(interview);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingInterview(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta entrevista?')) {
      await deleteInterview(id);
    }
  };

  // Sort chronologically
  const sortedInterviews = [...interviews].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-4 bg-surface p-6 rounded-xl border border-border-default shadow-sm mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary/70" />
          Proceso de Entrevistas
        </h3>
        <Button size="sm" onClick={handleAddNew}>
          <Plus className="w-4 h-4 mr-2" /> Agregar
        </Button>
      </div>

      {sortedInterviews.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-border-default rounded-xl bg-muted/20">
          <CalendarIcon className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground text-sm">No hay entrevistas agendadas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedInterviews.map((interview) => {
            const d = new Date(interview.date);
            const dateStr = d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
            const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            
            return (
              <div key={interview.id} className="relative pl-6 border-l-2 border-primary/20 pb-4 last:pb-0">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-surface" />
                
                <div className="bg-muted/30 p-4 rounded-xl border border-border-default">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-flex items-center rounded-sm bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mb-2">
                        {interview.type}
                      </span>
                      <div className="flex items-center gap-4 text-sm font-medium text-foreground mb-1">
                        <span className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" /> {dateStr}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-muted-foreground" /> {timeStr}</span>
                      </div>
                      
                      {interview.status === 'Completada' && (
                        <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completada
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(interview)}>
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-destructive" onClick={() => handleDelete(interview.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {interview.interviewers && interview.interviewers.length > 0 && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>{interview.interviewers.join(', ')}</div>
                    </div>
                  )}

                  {interview.notes && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                      <div className="italic">{interview.notes}</div>
                    </div>
                  )}

                  {interview.feedback && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground bg-surface p-2 rounded-md border border-border-default">
                      <MessageSquare className="w-4 h-4 shrink-0 mt-0.5 text-primary/70" />
                      <div>{interview.feedback}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <InterviewFormModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        applicationId={applicationId} 
        interviewToEdit={editingInterview} 
      />
    </div>
  );
}
