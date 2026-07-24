# 🏗️ Arquitectura: Evolución del Modelo `Application` (Freelance vs Job)

## 🎯 Objetivo
Preparar el modelo de datos actual (`Application`) para soportar múltiples tipos de oportunidades laborales (Ej: `job` tradicional y `freelance`) en el futuro, garantizando **100% de retrocompatibilidad** con el MVP (Sprint 2) y requiriendo refactorizaciones mínimas.

---

## 🛠️ Evolución del Modelo de Datos

Para no romper la aplicación, la estrategia es **no eliminar ni renombrar campos existentes**, sino introducir un campo discriminador (`type`) y aprovechar los campos actuales dándoles un significado semántico distinto en la UI según el tipo. Además, se añaden campos opcionales exclusivos para freelance.

### 1. El Nuevo Campo Discriminador
Se agrega un campo `type?: 'job' | 'freelance'`.
*Si el campo `type` es `undefined`, el sistema asume por defecto que es un `'job'`.* Esto garantiza que toda la data que ya esté guardada en el LocalStorage de los usuarios siga funcionando sin migraciones forzosas.

### 2. Mapeo Semántico (Reutilización de campos requeridos)
En lugar de crear `clientName` y `projectTitle` paralelos, reutilizaremos los campos:
- `company` ➔ Se renderiza como **Empresa** (job) o **Cliente** (freelance).
- `position` ➔ Se renderiza como **Posición** (job) o **Proyecto** (freelance).
- `salary` ➔ Se renderiza como **Salario** (job) o **Presupuesto / Rate** (freelance).

### 3. Ampliación de Estados (Status)
```typescript
export type JobStatus = 'Guardada' | 'Aplicada' | 'Contactado' | 'Entrevista RRHH' | 'Entrevista técnica' | 'Prueba técnica' | 'Entrevista Final' | 'Oferta' | 'Contratado' | 'Rechazada' | 'Ghosting';

export type FreelanceStatus = 'Propuesta enviada' | 'Respuesta del cliente' | 'Negociación' | 'Adjudicado' | 'En progreso' | 'Finalizado' | 'Rechazado';

export type ApplicationStatus = JobStatus | FreelanceStatus;
```

### 4. Campos Exclusivos (Opcionales)
- `budgetType?: 'Fijo' | 'Por hora'`
- `estimatedDuration?: string`
- `platformFee?: number`

### El Modelo Final Resultante (`types/index.ts`)
```typescript
export type OpportunityType = 'job' | 'freelance';

export interface Application {
  id: string;
  type?: OpportunityType; // Por defecto 'job' si no existe
  
  // --- Campos Base (Reutilizados) ---
  company: string;   
  position: string;  
  status: ApplicationStatus; 
  source: ApplicationSource; 
  appliedAt: string;
  updatedAt: string;
  technologies: string[];
  url?: string;
  notes?: string;
  salary?: string;   
  
  // --- Específicos de Job ---
  modality?: Modality;
  seniority?: Seniority;
  location?: string;
  recruiter?: string;
  contact?: string;

  // --- Específicos de Freelance ---
  budgetType?: 'Fijo' | 'Por hora';
  duration?: string;
  platformFee?: number;
}
```

---

## 🧩 Partes del Sistema Afectadas

1. **`ApplicationCard.tsx`**: Cambiará los labels e íconos (ej. ícono de edificio vs usuario) según `app.type`.
2. **`ApplicationFormModal.tsx`**: Toggle "Trabajo Fijo" | "Freelance" al inicio, ocultando campos irrelevantes.
3. **`ApplicationsView.tsx`**: Filtro rápido "Todo / Trabajos / Freelance".
4. **Dashboard**: Widgets separados o combinados semánticamente.

## ✅ Compatibilidad Asegurada
1. **Sin migraciones:** Base de datos LocalStorage intacta.
2. **Repositorio intacto:** `LocalApplicationRepository` guarda y lee JSON sin problemas.
3. **TypeScript feliz:** Los componentes actuales seguirán funcionando al asumir que `type` undefined es 'job'.
