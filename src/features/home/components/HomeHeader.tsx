import { useUserStore } from '@/store/useUserStore';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { differenceInDays } from 'date-fns';

export function HomeHeader() {
  const { profile } = useUserStore();
  const { applications } = useJobStore();

  const daysSinceStart = profile?.startDate 
    ? differenceInDays(new Date(), new Date(profile.startDate))
    : 0;

  return (
    <div className="flex items-center justify-between space-y-2 mb-8">
      <div>
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
          <span className="hidden sm:inline">👋 </span>Buenos días, {profile?.name || 'Invitado'}
        </h2>
        <p className="text-muted-foreground mt-2">
          Llevás <span className="font-semibold text-foreground">{daysSinceStart} días</span> construyendo tu próxima oportunidad.
        </p>
      </div>
    </div>
  );
}
