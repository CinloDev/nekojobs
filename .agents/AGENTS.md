# NekoJobs - Guía para Agentes de IA

Este documento contiene las reglas, contexto y arquitectura indispensables para trabajar en el proyecto **NekoJobs**. **DEBES** leer y seguir estas directrices antes de proponer cambios o escribir código.

## 1. Contexto del Producto
- **NekoJobs** es una aplicación web (SaaS) orientada a ayudar a los desarrolladores a organizar y analizar su búsqueda laboral (postulaciones, entrevistas, ofertas, rechazos, aprendizajes).
- El diseño debe sentirse premium, profesional y moderno, fuertemente inspirado en **Linear y Vercel**.

## 2. Stack Tecnológico
- **Framework:** Next.js (App Router).
- **Lenguaje:** TypeScript estricto.
- **Estilos:** Tailwind CSS (v4) + shadcn/ui.
- **Estado Global:** Zustand.
- **Package Manager:** **SIEMPRE USA `pnpm`. NUNCA uses `npm` ni `yarn`.**

## 3. Arquitectura y Estructura (Feature-Sliced Design)
El código está organizado por *features*. **No** agrupes todo en una carpeta genérica `components/`.
- `src/features/[feature_name]/`: Cada feature (ej. `applications`, `dashboard`, `onboarding`) debe contener sus propios `components`, `store`, `services` y `types`.
- `src/components/`: Solo para componentes UI puramente genéricos (ej. shadcn, Sidebar).
- `src/types/`: Tipos globales transversales a todo el proyecto (ej. modelo `Application`).

## 4. Persistencia de Datos y Backend (Repository Pattern)
- **Actualmente NO hay base de datos real.** Los datos persisten en el cliente usando `LocalStorage`.
- **Regla Crítica:** La UI o los stores (Zustand) **NUNCA** deben interactuar directamente con `LocalStorage`. Siempre deben consumir interfaces en la capa `services/` (ej. `ApplicationRepository`). 
- Ya existe una implementación `LocalApplicationRepository`. Esto se hace así para que en el futuro la migración a Supabase no rompa la UI.
- **Manejo de Fechas:** Las fechas deben persistirse y enviarse siempre como **ISO strings** (ej. `appliedAt: string`) para evitar bugs de serialización en JSON. Convertir a objeto `Date` solo al momento de renderizar o calcular.

## 5. Decisiones de Diseño y UI
- **Light Mode Default:** La aplicación prioriza un tema claro con tonos blancos, grises, bordes muy suaves y un **acento color violeta** (`violet-600` equivalente).
- Evitar interfaces saturadas de color; priorizar limpieza visual, micro-animaciones (Framer Motion) y jerarquía clara.

## 6. Funcionalidad de "Modo Demo"
- Existe data simulada en `src/lib/mock-data.ts`. La función `loadDemoData` en Zustand sirve para popular el dashboard y hacerlo "Portfolio Ready". Nunca mezcles directamente esta mock-data con la data persistida sin el consentimiento del usuario.
