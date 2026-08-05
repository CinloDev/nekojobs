import { ProjectDetails } from '@/features/projects';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container max-w-5xl py-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center mb-6">
        <Link href="/projects" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          Volver a Proyectos
        </Link>
      </div>
      
      <ProjectDetails projectId={id} />
    </div>
  );
}
