import { ApplicationsView } from '@/features/applications/components/ApplicationsView';

export default function ApplicationsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Postulaciones</h1>
        <p className="text-muted-foreground">Gestiona y haz seguimiento de todas tus aplicaciones laborales.</p>
      </div>
      <ApplicationsView />
    </div>
  );
}
