import { ProjectDetails } from '@/features/projects';
import { PageContainer } from '@/components/layout/PageContainer';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PageContainer>
      <div className="flex items-center mb-6">
        <Link href="/projects" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors text-sm font-medium">
          <ChevronLeft className="w-4 h-4" />
          Volver a Proyectos
        </Link>
      </div>
      
      <ProjectDetails projectId={id} />
    </PageContainer>
  );
}
