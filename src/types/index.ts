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
  
  // Extra fields that could be useful
  modality?: Modality;
  seniority?: Seniority;
  location?: string;
  recruiter?: string;
  contact?: string;
}
