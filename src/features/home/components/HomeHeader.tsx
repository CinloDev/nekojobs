import { useUserStore } from '@/store/useUserStore';

export function HomeHeader() {
  const { config } = useUserStore();

  const daysSinceStart = config.startDate 
    ? Math.floor((new Date().getTime() - new Date(config.startDate).getTime()) / (1000 * 3600 * 24))
    : 0;

  return (
    <div className="flex items-center justify-between space-y-2 mb-6">
      <div>
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
          <span className="hidden sm:inline">👋 </span>Buenos días, {config.name || 'Usuario'}
        </h2>
        <p className="text-muted-foreground mt-2">
          Llevás <span className="font-semibold text-foreground">{daysSinceStart} días</span> construyendo tu próxima oportunidad.
        </p>
      </div>
    </div>
  );
}
