import { ProjectView } from '@/features/projects/components/ProjectView';

export const metadata = {
  title: 'Proyectos Freelance | NekoJobs',
  description: 'Gestiona tus proyectos freelance y clientes',
};

export default function ProjectsPage() {
  return (
    <div className="p-6 md:p-8 flex-1 w-full max-w-7xl mx-auto">
      <ProjectView />
    </div>
  );
}
