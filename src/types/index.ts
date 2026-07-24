export type ApplicationStatus =
  | 'Guardada'
  | 'Aplicada'
  | 'Contactado'
  | 'Entrevista RRHH'
  | 'Entrevista técnica'
  | 'Prueba técnica'
  | 'Entrevista Final'
  | 'Oferta'
  | 'Contratado'
  | 'Rechazada'
  | 'Ghosting';

export type ApplicationSource =
  | 'LinkedIn'
  | 'Workana'
  | 'Indeed'
  | 'Computrabajo'
  | 'Referido'
  | 'Página empresa'
  | 'Otro';

export type Seniority = 'Junior' | 'Junior+' | 'Semi Senior' | 'Senior';
export type Modality = 'Remoto' | 'Híbrido' | 'Presencial';

export interface Application {
  id: string;
  company: string;
  position: string;
  status: ApplicationStatus;
  source: ApplicationSource;
  appliedAt: string;
  updatedAt: string;
  technologies: string[];
  notes?: string;
  salary?: string;
  url?: string;
  modality?: Modality;
  seniority?: Seniority;
  location?: string;
  recruiter?: string;
  contact?: string;
}

export interface UserProfile {
  name: string;
  targetRole: string;
  level: string;
  location?: string;
  mainStack: string[];
  avatar?: string;
  theme?: 'light' | 'dark' | 'system';
  createdAt: string;
  startDate: string;
  weeklyGoal: number;
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  industry?: string;
  notes?: string;
  createdAt: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  date: string;
  type: 'HR' | 'Technical' | 'Cultural' | 'Take-home Challenge';
  interviewers?: string[];
  notes?: string;
  feedback?: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export type LearningCategory = 'Technical' | 'Interview' | 'CV' | 'Soft Skills' | 'Process' | 'Other';

export interface Learning {
  id: string;
  title: string;
  description: string;
  category: LearningCategory;
  relatedApplicationId?: string;
  tags: string[];
  createdAt: string;
}

export type GoalType = 'Applications' | 'Interviews' | 'Learnings';
export type GoalPeriod = 'Weekly' | 'Monthly';

export interface Goal {
  id: string;
  title: string;
  type: GoalType;
  targetValue: number;
  currentValue: number;
  period: GoalPeriod;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Failed';
}
