# NekoJobs 🐱💼
![Version](https://img.shields.io/badge/version-v1.0.0--beta-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> **El sistema operativo para tu búsqueda laboral.**

NekoJobs es una aplicación web (SaaS personal) diseñada para que los desarrolladores y profesionales puedan organizar, analizar y hacer seguimiento de sus procesos de selección, sin depender de hojas de cálculo desordenadas.

<img src="./public/nekojobs.svg" alt="NekoJobs Preview" width="200" />

## ✨ Características Principales

*   **Pipeline Visual (Kanban-style):** Sigue el estado de tus postulaciones desde que las guardas hasta la oferta final o el rechazo.
*   **Analíticas en Tiempo Real:** Descubre tu tasa de respuesta, efectividad por canal (LinkedIn, Referidos, Web) y métricas de desempeño.
*   **Gestión de Metas:** Define objetivos (ej. "Enviar 10 postulaciones por semana") y observa tu progreso automático.
*   **Diario de Aprendizaje:** Anota las preguntas técnicas que fallaste o el feedback que recibiste en entrevistas para no cometer el mismo error dos veces.
*   **Modo Demo:** Prueba toda la aplicación con un click cargando datos simulados realistas ("Portfolio Ready").

## 🔒 Arquitectura Local-first

NekoJobs está construido bajo la filosofía **Local-first**. Esto significa que:

1.  **Tus datos son tuyos:** Toda la información que ingresas (postulaciones, salarios, notas) se guarda **exclusivamente en tu navegador** (`LocalStorage`).
2.  **Sin servidores ni cuentas:** No hay un backend husmeando en tus procesos, ni necesitas crear un usuario con contraseña.
3.  **Backups Seguros:** Puedes exportar toda tu base de datos en formato `.json` con un solo click e importarla en otro dispositivo si cambias de PC.
4.  **Cero Latencia:** Al no depender de la red, la interfaz responde instantáneamente.

*En el futuro, ofreceremos sincronización opcional a la nube para quienes deseen respaldar su información entre dispositivos, pero la filosofía local-first siempre será el modo por defecto.*

## 🛠️ Stack Tecnológico

NekoJobs fue creado con las herramientas más modernas del ecosistema Frontend:

*   **Framework:** Next.js (App Router)
*   **Lenguaje:** TypeScript (Strict Mode)
*   **Estilos:** Tailwind CSS + shadcn/ui
*   **Manejo de Estado:** Zustand (con middleware persist para LocalStorage)
*   **Iconos:** Lucide React
*   **Componentes Animados:** Framer Motion

## 🚀 Instalación y Desarrollo Local

NekoJobs utiliza `pnpm` como gestor de paquetes exclusivo.

1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    pnpm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    pnpm dev
    ```
4.  Abre `http://localhost:3000` en tu navegador.

## 📁 Estructura del Proyecto (Feature-Sliced)

El proyecto utiliza un acercamiento de *Feature-Sliced Design* para máxima mantenibilidad:

*   `src/features/applications`: Gestión del Pipeline y CRM de postulaciones.
*   `src/features/analytics`: Motor de cálculo derivado (`useMemo`) y visualizaciones.
*   `src/features/goals`: Subsistema de metas.
*   `src/features/learnings`: Diario de aprendizaje.
*   `src/features/data-management`: Servicio centralizado para importación/exportación JSON.
*   `src/features/onboarding`: Modal de bienvenida y gestor de primer uso.
*   `src/features/settings`: Preferencias y perfil del usuario.

## 📝 Roadmap

*   [x] MVP de Pipeline.
*   [x] Autocorrección de URLs y validaciones.
*   [x] Integración de Metas y Aprendizajes.
*   [x] Panel de Estadísticas (Analytics).
*   [x] Data Management (Import/Export JSON).
*   [x] Onboarding interactivo.
*   [x] Modo Oscuro 100% pulido.
*   [x] Personalización de Perfil (Avatar y preferencias).
*   [ ] Integración Opcional Cloud (BaaS) para Sync.
*   [ ] Oportunidades Freelance (Soporte Multi-tipo).
