'use client';

import { useEffect } from 'react';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Briefcase, MessageSquare, Code, CheckCircle, SearchCode } from 'lucide-react';

export function Overview() {
  const { applications, loadApplications, loadDemoData, isLoading } = useJobStore();

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  if (isLoading) return <div className="p-8">Cargando...</div>;

  if (applications.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-8 mt-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground mt-2">Bienvenido a tu tablero de búsqueda laboral.</p>
        </div>
        <EmptyState onAction={() => alert('Función de agregar próxima a implementarse en el MVP v2')} />
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">¿Querés ver cómo se ve la app con datos?</p>
          <Button variant="outline" onClick={loadDemoData}>
            <SearchCode className="mr-2 h-4 w-4" />
            Cargar datos de demo
          </Button>
        </div>
      </div>
    );
  }

  const totalApps = applications.length;
  const interviews = applications.filter(a => a.status.includes('Entrevista')).length;
  const technicals = applications.filter(a => a.status === 'Prueba técnica').length;
  const offers = applications.filter(a => a.status === 'Oferta').length;

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <p className="text-muted-foreground mt-2">
            Hola 👋 Aquí tienes el resumen de tu búsqueda laboral.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Postulaciones</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApps}</div>
            <p className="text-xs text-muted-foreground">+4 desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entrevistas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviews}</div>
            <p className="text-xs text-muted-foreground">En proceso activo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Técnicas</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicals}</div>
            <p className="text-xs text-muted-foreground">Pruebas enviadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ofertas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{offers}</div>
            <p className="text-xs text-muted-foreground">¡Felicidades!</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.slice(0, 5).map(app => (
              <div key={app.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{app.company}</p>
                  <p className="text-sm text-muted-foreground">{app.position}</p>
                </div>
                <div className="text-sm text-right">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                    {app.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
