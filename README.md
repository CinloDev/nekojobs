# NekoJobs

NekoJobs es un sistema de seguimiento profesional para desarrolladores en búsqueda laboral. 
Transforma una búsqueda laboral desordenada en un proceso estructurado y medible.

## Features
- **Kanban Board & List View**: Organización visual de las postulaciones (Guardadas, Aplicadas, Entrevistas, Ofertas, etc.).
- **Métricas & Analytics (Proximamente)**: Análisis de datos para saber qué tecnologías y plataformas generan más entrevistas.
- **Learnings**: Un espacio para documentar qué se aprendió de los rechazos o entrevistas, fomentando el crecimiento profesional.
- **Objetivos Semanales**: Configuración de metas de aplicaciones para mantener la consistencia.
- **Privacy First**: Los datos se guardan inicialmente en LocalStorage para garantizar la privacidad total, con un camino preparado para sincronización en la nube.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Architecture
NekoJobs sigue un enfoque de diseño estructurado por *Features* (Feature-Sliced Design):
- `src/features/*`: Contiene componentes, hooks, estado (store), servicios y tipos específicos para cada funcionalidad (ej. `applications`, `dashboard`, `onboarding`).
- `src/components/`: Componentes genéricos y de UI base (shadcn).
- `src/lib/`: Utilidades comunes.
- `src/types/`: Definiciones de tipos globales y modelos base.

La persistencia de datos utiliza el patrón **Repository**, lo que permite cambiar la base de datos (de LocalStorage a Supabase/PostgreSQL) sin modificar la capa de UI.

## Getting Started

1. Clona el repositorio.
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Roadmap
- [x] MVP Inicial (LocalStorage)
- [ ] Backend y Autenticación con Supabase (v2)
- [ ] Sincronización Multi-dispositivo (v2)
- [ ] IA Analizador de Ofertas (v3)
