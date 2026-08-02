import { Home, Briefcase, FolderKanban, BarChart2, Target, BookOpen, Settings } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
  badge?: string | null;
}

export const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home, disabled: false, badge: null },
  { name: 'Postulaciones', href: '/applications', icon: Briefcase, disabled: false, badge: null },
  { name: 'Proyectos Freelance', href: '/projects', icon: FolderKanban, disabled: false, badge: null },
  { name: 'Estadísticas', href: '/analytics', icon: BarChart2, disabled: false, badge: null },
  { name: 'Metas', href: '/goals', icon: Target, disabled: false, badge: null },
  { name: 'Aprendizajes', href: '/learnings', icon: BookOpen, disabled: false, badge: null },
  { name: 'Configuración', href: '/settings', icon: Settings, disabled: false, badge: null },
];
