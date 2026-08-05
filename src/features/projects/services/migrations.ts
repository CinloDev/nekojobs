import { Project, ProjectCategory, ProjectStatus } from '@/types';

// Utility to normalize old Spanish statuses to new English snake_case statuses
const mapLegacyStatus = (oldStatus?: string): ProjectStatus => {
  switch (oldStatus) {
    case 'Prospecto': return 'prospect';
    case 'Propuesta Enviada': return 'proposal_sent';
    case 'Negociando': return 'negotiating';
    case 'Activo': return 'in_progress';
    case 'En Revisión': return 'in_review';
    case 'Completado': return 'completed';
    case 'Cancelado': return 'cancelled';
    default: return 'in_progress';
  }
};

export const migrateProject = (projectData: any): Project => {
  // If category is missing, default it based on the existence of a clientName
  let category = projectData.category as ProjectCategory;
  if (!category) {
    // If it has a clientName, assume it was a freelance project from the older version
    if (projectData.clientName && projectData.clientName.trim().length > 0) {
      category = 'freelance';
    } else {
      category = 'personal';
    }
  }

  // Normalize status
  let status = projectData.status;
  // If it's a legacy uppercase/spaced status, migrate it
  if (typeof status === 'string' && (status.includes(' ') || status[0] === status[0].toUpperCase())) {
    status = mapLegacyStatus(status);
  }

  // Ensure notes is an array
  let notes = projectData.notes;
  if (typeof notes === 'string' && notes.trim() !== '') {
    notes = [
      {
        id: crypto.randomUUID(),
        content: notes,
        createdAt: new Date().toISOString()
      }
    ];
  } else if (!Array.isArray(notes)) {
    notes = [];
  }

  return {
    ...projectData,
    category,
    status,
    notes,
    // Ensure arrays are initialized if missing
    technologies: projectData.technologies || [],
  };
};
