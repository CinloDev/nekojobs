import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ServerOff, ShieldAlert, EyeOff } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <PageContainer size="narrow" className="space-y-6">
      <PageHeader 
        title="Política de Privacidad" 
        description="Nuestras garantías innegociables sobre el manejo, resguardo y protección de tus datos profesionales." 
      />

      <Card className="border-border/60 shadow-xs">
        <CardContent className="p-6 sm:p-8 space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
          
          <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <Lock className="w-6 h-6 flex-shrink-0" />
            <div className="text-sm">
              <strong className="font-bold">Resumen de privacidad:</strong> NekoJobs no tiene servidores externos ni almacena en la nube ninguno de tus registros laborales. Lo que escribes en esta app nunca abandona tu dispositivo.
            </div>
          </div>

          <div className="flex items-center gap-2 text-foreground font-semibold text-lg pb-2 border-b">
            <ServerOff className="w-5 h-5 text-primary" />
            <span>1. Cero Recolección de Datos de Usuario</span>
          </div>
          <p>
            Cuando utilizas NekoJobs, <strong>no enviamos tus postulaciones, nombres, notas ni fotos de perfil a ningún servidor backend, base de datos de terceros o servicio en la nube</strong>. Tampoco requerimos crear una cuenta, correo electrónico o contraseña.
          </p>

          <div className="flex items-center gap-2 text-foreground font-semibold text-lg pb-2 border-b pt-4">
            <EyeOff className="w-5 h-5 text-primary" />
            <span>2. Sin Rastreo ni Analíticas Invasivas</span>
          </div>
          <p>
            Creemos que una búsqueda de trabajo es uno de los procesos profesionales más íntimos de tu carrera. No utilizamos trackers publicitarios ni compartimos tu estado de búsqueda laboral con empleadores, reclutadores o agencias externas.
          </p>

          <div className="flex items-center gap-2 text-foreground font-semibold text-lg pb-2 border-b pt-4">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <span>3. Control Total del Usuario</span>
          </div>
          <p>
            Tienes control absoluto sobre la información persistida:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground/90">
            <li><strong>Eliminación inmediata:</strong> Puedes borrar cualquier registro de aplicación, meta o aprendizaje en cualquier momento, y desaparecerá sin dejar rastro de tu navegador.</li>
            <li><strong>Portabilidad total:</strong> Puedes usar nuestro módulo de Resguardo de Datos en la Configuración para descargar un backup JSON o migrarlo entre diferentes computadoras a tu elección.</li>
          </ul>

          <div className="pt-4 border-t text-xs text-muted-foreground/70">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

        </CardContent>
      </Card>
    </PageContainer>
  );
}
