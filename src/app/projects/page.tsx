import { ProjectView } from '@/features/projects/components/ProjectView';
import { PageContainer } from '@/components/layout/PageContainer';

export const metadata = {
  title: 'Proyectos Freelance | NekoJobs',
  description: 'Gestiona tus proyectos freelance y clientes',
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <ProjectView />
    </PageContainer>
  );
}
