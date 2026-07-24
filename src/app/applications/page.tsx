import { ApplicationsView } from '@/features/applications/components/ApplicationsView';
import { PageHeader } from '@/components/ui/PageHeader';

export default function ApplicationsPage() {
  return (
    <div className="px-4 py-8 md:p-8 max-w-6xl mx-auto flex flex-col h-full">
      <PageHeader 
        title="Postulaciones" 
        description="Gestiona y haz seguimiento de todas tus aplicaciones laborales." 
      />
      <ApplicationsView />
    </div>
  );
}
