'use client';

import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Download, Upload, AlertTriangle, Loader2 } from 'lucide-react';
import { BackupService } from '../services/BackupService';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const backupService = new BackupService();

export function DataManagementSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [fileToImport, setFileToImport] = useState<File | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const json = await backupService.exportData();
      
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const date = new Date().toISOString().split('T')[0];
      link.download = `nekojobs-backup-${date}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Backup exportado exitosamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al exportar los datos');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
        toast.error('El archivo debe ser un JSON válido');
        return;
      }
      setFileToImport(file);
    }
    // Reset input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const confirmImport = async () => {
    if (!fileToImport) return;
    
    setIsImporting(true);
    try {
      const text = await fileToImport.text();
      await backupService.importData(text);
      
      toast.success('Datos importados correctamente. Recargando...', { duration: 3000 });
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Error al importar los datos');
      setFileToImport(null);
      setIsImporting(false);
    }
  };

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Resguardo de Datos
        </CardTitle>
        <CardDescription>
          Exporta tu información para tener un backup o impórtala si cambias de navegador.
          Toda tu información vive únicamente en tu dispositivo.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/40 rounded-lg border border-border/50">
          <div>
            <h4 className="font-semibold text-sm">Exportar Backup</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Descarga un archivo JSON con todo tu historial y configuraciones.
            </p>
          </div>
          <Button onClick={handleExport} disabled={isExporting} className="w-full sm:w-auto flex-shrink-0">
            {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Exportar JSON
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/40 rounded-lg border border-border/50">
          <div>
            <h4 className="font-semibold text-sm">Importar Backup</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Restaura tu información a partir de un archivo JSON generado por NekoJobs.
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()} 
            disabled={isImporting} 
            className="w-full sm:w-auto flex-shrink-0"
          >
            <Upload className="w-4 h-4 mr-2" />
            Seleccionar JSON
          </Button>
          <input 
            type="file" 
            accept=".json,application/json" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
        </div>
      </CardContent>

      <Dialog open={!!fileToImport} onOpenChange={(open) => !open && setFileToImport(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 text-destructive rounded-full">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <DialogTitle>Advertencia de Sobrescritura</DialogTitle>
            </div>
            <DialogDescription className="pt-3">
              Estás a punto de importar el archivo <strong>{fileToImport?.name}</strong>.
              <br /><br />
              Esto <strong>reemplazará completamente</strong> tus postulaciones, metas, aprendizajes y configuración actual por los datos del archivo. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
            <Button variant="outline" onClick={() => setFileToImport(null)} className="w-full sm:w-auto" disabled={isImporting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmImport} className="w-full sm:w-auto" disabled={isImporting}>
              {isImporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'Sí, sobrescribir datos'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
