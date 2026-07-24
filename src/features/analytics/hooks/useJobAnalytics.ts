import { useMemo } from 'react';
import { useJobStore } from '@/features/applications/store/useJobStore';

export function useJobAnalytics() {
  const { applications } = useJobStore();

  const analytics = useMemo(() => {
    // 1. OVERVIEW
    const overview = {
      total: applications.length,
      applied: applications.filter(a => a.status !== 'Guardada').length,
      interviews: applications.filter(a => a.status.includes('Entrevista') || a.status === 'Prueba técnica' || a.status === 'Contactado').length,
      offers: applications.filter(a => a.status === 'Oferta' || a.status === 'Contratado').length,
      rejections: applications.filter(a => a.status === 'Rechazada' || a.status === 'Ghosting').length,
    };

    // 2. PIPELINE (Agrupación de estados)
    const inProgressStatuses = ['Contactado', 'Entrevista RRHH', 'Entrevista técnica', 'Prueba técnica', 'Entrevista Final'];
    const resultStatuses = ['Oferta', 'Contratado', 'Rechazada', 'Ghosting'];

    const pipeline = {
      saved: applications.filter(a => a.status === 'Guardada').length,
      applied: applications.filter(a => a.status === 'Aplicada').length,
      inProgress: applications.filter(a => inProgressStatuses.includes(a.status)).length,
      result: applications.filter(a => resultStatuses.includes(a.status)).length,
    };

    // 3. PERFORMANCE
    // Tasa de respuesta = (En Progreso + Resultados) / Total Aplicadas
    const respondedCount = pipeline.inProgress + pipeline.result;
    const responseRate = overview.applied > 0 ? (respondedCount / overview.applied) * 100 : 0;

    // Tasa de entrevistas = En progreso (que son entrevistas) / Total Aplicadas
    // Aquí usamos el overview.interviews (que abarca todo el proceso de entrevista)
    const interviewRate = overview.applied > 0 ? (overview.interviews / overview.applied) * 100 : 0;

    // Tasa de conversión a oferta = Ofertas / Total Entrevistas
    const conversionRate = overview.interviews > 0 ? (overview.offers / overview.interviews) * 100 : 0;

    const performance = {
      responseRate: Math.round(responseRate),
      interviewRate: Math.round(interviewRate),
      conversionRate: Math.round(conversionRate),
    };

    // 4. SOURCES
    const sourceMap = new Map<string, number>();
    applications.forEach(app => {
      const current = sourceMap.get(app.source) || 0;
      sourceMap.set(app.source, current + 1);
    });

    const sources = Array.from(sourceMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: applications.length > 0 ? Math.round((count / applications.length) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count); // Ordenar de mayor a menor

    // 5. TIMELINE
    const now = new Date().getTime();
    const msInDay = 24 * 60 * 60 * 1000;
    
    let last7DaysCount = 0;
    let last30DaysCount = 0;

    applications.forEach(app => {
      // Usar appliedAt o updatedAt según queramos ver actividad. Para timeline de postulaciones, appliedAt es ideal.
      const appDate = new Date(app.appliedAt).getTime();
      const diffDays = (now - appDate) / msInDay;

      if (diffDays <= 7) last7DaysCount++;
      if (diffDays <= 30) last30DaysCount++;
    });

    // Calcular promedios simples (ej. si hay apps en los últimos 30 días, sacamos un promedio semanal)
    // Para no complicarlo con la fecha de la primera postulación, usamos los últimos 30 días como base.
    const weeklyAverage = Math.round((last30DaysCount / 4) * 10) / 10; 
    const monthlyAverage = last30DaysCount; 

    const timeline = {
      last7Days: last7DaysCount,
      last30Days: last30DaysCount,
      weeklyAverage,
      monthlyAverage,
    };

    return {
      overview,
      pipeline,
      performance,
      sources,
      timeline,
      hasData: applications.length > 0
    };
  }, [applications]);

  return analytics;
}
