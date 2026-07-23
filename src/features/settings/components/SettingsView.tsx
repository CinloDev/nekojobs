'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from '@/types';
import { UserCircle, Target, Briefcase, MapPin, Code2, Save } from 'lucide-react';

const levels = ['Trainee', 'Junior', 'Junior+', 'Semi Senior', 'Senior', 'Lead'];

export function SettingsView() {
  const { profile, updateProfile, isLoading } = useUserStore();
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [stackInput, setStackInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setStackInput(profile.mainStack?.join(', ') || '');
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const mainStack = stackInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    await updateProfile({
      ...formData,
      mainStack,
    });
    
    setIsSaving(false);
  };

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading && !profile) {
    return <div className="p-8 flex items-center justify-center">Cargando perfil...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Configuración</h1>
        <p className="text-muted-foreground">Administra tu perfil y preferencias personales.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-primary" />
          Perfil de Usuario
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                Nombre
              </Label>
              <Input 
                id="name" 
                value={formData.name || ''} 
                onChange={(e) => updateField('name', e.target.value)} 
                placeholder="Tu nombre completo"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetRole" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                Rol Objetivo
              </Label>
              <Input 
                id="targetRole" 
                value={formData.targetRole || ''} 
                onChange={(e) => updateField('targetRole', e.target.value)} 
                placeholder="Ej: Frontend Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                Nivel / Seniority
              </Label>
              <Select value={formData.level} onValueChange={(val) => updateField('level', val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu nivel" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                Ubicación
              </Label>
              <Input 
                id="location" 
                value={formData.location || ''} 
                onChange={(e) => updateField('location', e.target.value)} 
                placeholder="Ciudad, País o 'Remoto'"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="mainStack" className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-muted-foreground" />
                Stack Principal (separado por comas)
              </Label>
              <Input 
                id="mainStack" 
                value={stackInput} 
                onChange={(e) => setStackInput(e.target.value)} 
                placeholder="React, TypeScript, Node.js"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="weeklyGoal" className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                Meta Semanal de Postulaciones
              </Label>
              <Input 
                id="weeklyGoal" 
                type="number"
                min="1"
                value={formData.weeklyGoal || ''} 
                onChange={(e) => updateField('weeklyGoal', parseInt(e.target.value) || 1)} 
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t mt-4">
            <Button type="submit" disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" />
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
