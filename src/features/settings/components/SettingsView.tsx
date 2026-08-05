'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useUserStore } from '@/store/useUserStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserProfile } from '@/types';
import { UserCircle, Target, Briefcase, MapPin, Code2, Save, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DataManagementSection } from '@/features/data-management/components/DataManagementSection';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionHeader } from '@/components/layout/SectionHeader';

const levels = ['Trainee', 'Junior', 'Junior+', 'Semi Senior', 'Senior', 'Lead'];

export function SettingsView() {
  const { profile, updateProfile, isLoading } = useUserStore();
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: profile?.name || '',
    targetRole: profile?.targetRole || '',
    level: profile?.level || '',
    location: profile?.location || '',
    weeklyGoal: profile?.weeklyGoal || 1,
    avatar: profile?.avatar || '',
  });
  const [stackInput, setStackInput] = useState(profile?.mainStack?.join(', ') || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        targetRole: profile.targetRole || '',
        level: profile.level || '',
        location: profile.location || '',
        weeklyGoal: profile.weeklyGoal || 1,
        avatar: profile.avatar || '',
      });
      setStackInput(profile.mainStack?.join(', ') || '');
    }
  }, [profile]);

  const isDirty = useMemo(() => {
    if (!profile) return false;
    
    // Check if simple fields are different
    const fields: (keyof UserProfile)[] = ['name', 'targetRole', 'level', 'location', 'weeklyGoal', 'avatar'];
    const hasSimpleChanges = fields.some(field => formData[field] !== profile[field]);
    
    // Check if mainStack is different
    const currentStack = stackInput.split(',').map(t => t.trim()).filter(t => t.length > 0).join(',');
    const profileStack = profile.mainStack?.join(',') || '';
    const hasStackChanges = currentStack !== profileStack;
    
    return hasSimpleChanges || hasStackChanges;
  }, [formData, stackInput, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDirty) return;
    
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
    setIsSuccess(true);
    
    // Reset success state after 2.5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);
  };

  const updateField = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('avatar', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading && !profile) {
    return <div className="p-8 flex items-center justify-center">Cargando perfil...</div>;
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <PageHeader 
        title="Configuración" 
        description="Administra tu perfil y preferencias personales."
      />

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <SectionHeader 
          title="Perfil de Usuario" 
          icon={<UserCircle className="w-5 h-5" />} 
          className="mb-6"
        />
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-2">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center border shrink-0">
              {formData.avatar ? (
                <Image src={formData.avatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <UserCircle className="w-12 h-12 text-muted-foreground opacity-50" />
              )}
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <Label className="text-base font-medium">Foto de Perfil</Label>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Cambiar Imagen
                </Button>
                {formData.avatar && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => updateField('avatar', '')}
                  >
                    Eliminar
                  </Button>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                className="hidden" 
              />
              <p className="text-xs text-muted-foreground mt-1">Recomendado: 256x256px (JPG o PNG)</p>
            </div>
          </div>

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
            <Button 
              type="submit" 
              disabled={!isDirty || isSaving || isSuccess} 
              className={cn(
                "min-w-[160px] transition-all duration-300 overflow-hidden relative",
                isSuccess && "bg-emerald-600 text-white hover:bg-emerald-700 !opacity-100 disabled:opacity-100"
              )}
            >
              <AnimatePresence mode="wait">
                {isSaving ? (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 absolute"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 absolute"
                  >
                    <Check className="w-4 h-4" />
                    <span>¡Guardado!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 absolute"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Cambios</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Invisible placeholder to maintain button width correctly */}
              <div className="flex items-center gap-2 opacity-0 pointer-events-none">
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </div>
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <DataManagementSection />
      </div>
    </div>
  );
}
