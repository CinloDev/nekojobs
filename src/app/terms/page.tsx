import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollText, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <PageContainer size="narrow" className="space-y-6">
      <PageHeader 
        title="Términos de Servicio" 
        description="Condiciones de uso para el sistema de gestión de búsqueda laboral NekoJobs." 
      />

      <Card className="border-border/60 shadow-xs">
        <CardContent className="p-6 sm:p-8 space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          
          <div className="flex items-center gap-2 text-foreground font-semibold text-lg pb-2 border-b">
            <ScrollText className="w-5 h-5 text-primary" />
            <span>1. Naturaleza del Servicio</span>
          </div>
          <p>
            <strong>NekoJobs</strong> es una plataforma de software en el navegador ("SaaS personal") diseñada para permitir a programadores, desarrolladores y profesionales gestionar sus postulaciones laborales, registrar entrevistas, medir estadísticas y llevar un diario de aprendizaje.
          </p>

          <div className="flex items-center gap-2 text-foreground font-semibold text-lg pb-2 border-b pt-4">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>2. Propiedad de Datos (Local-First)</span>
          </div>
          <p>
            A diferencia de otras plataformas web, NekoJobs opera bajo un modelo de arquitectura <strong>100% Local-first</strong>. Toda la información que ingresas (nombres de empresas, salarios esperados, notas de entrevistas y progresos) se almacena y procesa exclusivamente en la memoria de tu navegador (mediante <code>LocalStorage</code>).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground/90">
            <li>No somos dueños ni reclamamos propiedad alguna sobre tus datos ni tu historial laboral.</li>
            <li>Es tu responsabilidad realizar periódicamente exportaciones de tus datos en formato JSON (disponible en Configuración) para proteger tus copias de seguridad antes de limpiar la memoria o caché de tu navegador.</li>
          </ul>

          <div className="flex items-center gap-2 text-foreground font-semibold text-lg pb-2 border-b pt-4">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>3. Licencia de Uso</span>
          </div>
          <p>
            Se otorga a cada usuario una licencia de uso personal, gratuita y sin restricciones publicitarias invasivas para utilizar NekoJobs como su organizador de búsqueda de empleo habitual.
          </p>

          <div className="pt-4 border-t text-xs text-muted-foreground/70">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

        </CardContent>
      </Card>
    </PageContainer>
  );
}
