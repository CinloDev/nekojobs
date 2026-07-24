import { Application, Goal, Learning } from '@/types';

const now = new Date();

export const mockApplications: Application[] = [
  {
    id: 'demo-app-1',
    company: 'Mercado Libre',
    position: 'Frontend Developer',
    status: 'Entrevista técnica',
    source: 'LinkedIn',
    appliedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    modality: 'Remoto',
    seniority: 'Semi Senior',
    notes: 'Hablar de performance y optimización en Next.js',
  },
  {
    id: 'demo-app-2',
    company: 'Google',
    position: 'Software Engineer',
    status: 'Guardada',
    source: 'Página empresa',
    appliedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    technologies: ['React', 'TypeScript', 'Node.js'],
    modality: 'Híbrido',
    seniority: 'Senior',
    notes: 'Requiere relocation. Investigar beneficios.',
  },
  {
    id: 'demo-app-3',
    company: 'Globant',
    position: 'React Developer',
    status: 'Oferta',
    source: 'Referido',
    appliedAt: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    technologies: ['React', 'Redux', 'Jest'],
    modality: 'Remoto',
    seniority: 'Semi Senior',
    salary: 'USD 3500',
  },
  {
    id: 'demo-app-4',
    company: 'Startup X',
    position: 'Fullstack Developer',
    status: 'Rechazada',
    source: 'Workana',
    appliedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    technologies: ['Next.js', 'Supabase', 'Tailwind'],
    modality: 'Remoto',
    notes: 'No les alcanzó el budget para la posición.',
  },
  {
    id: 'demo-app-5',
    company: 'YPF',
    position: 'Frontend Engineer',
    status: 'Aplicada',
    source: 'LinkedIn',
    appliedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    technologies: ['React', 'Angular'],
    modality: 'Híbrido',
    location: 'Buenos Aires',
  }
];

export const mockGoals: Goal[] = [
  {
    id: 'demo-goal-1',
    title: 'Postulaciones Semanales',
    type: 'Applications',
    targetValue: 10,
    currentValue: 3,
    period: 'Weekly',
    startDate: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Active',
  },
  {
    id: 'demo-goal-2',
    title: 'Conseguir Entrevistas',
    type: 'Interviews',
    targetValue: 3,
    currentValue: 1,
    period: 'Monthly',
    startDate: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Active',
  },
];

export const mockLearnings: Learning[] = [
  {
    id: 'demo-learning-1',
    title: 'Preguntas teóricas sobre React Hooks',
    description: 'En la entrevista de Globant me preguntaron en detalle sobre el ciclo de vida con useEffect y las dependencias.',
    category: 'Interview',
    createdAt: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    relatedApplicationId: 'demo-app-3',
    tags: ['React', 'Hooks', 'Interview'],
  },
  {
    id: 'demo-learning-2',
    title: 'Mejorar el CV para ATS',
    description: 'Un recruiter me recomendó quitar columnas múltiples del CV porque los sistemas ATS no lo leen bien.',
    category: 'CV',
    createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['CV', 'ATS'],
  },
  {
    id: 'demo-learning-3',
    title: 'Arquitectura Hexagonal en JS',
    description: 'En la prueba técnica fallé por no separar la lógica de negocio de los repositorios de datos.',
    category: 'Technical',
    createdAt: new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    relatedApplicationId: 'demo-app-4',
    tags: ['Architecture', 'JavaScript'],
  }
];
