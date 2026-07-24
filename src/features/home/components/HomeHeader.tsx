import { useUserStore } from '@/store/useUserStore';
import { useJobStore } from '@/features/applications/store/useJobStore';
import { differenceInDays } from 'date-fns';
import { PageHeader } from '@/components/ui/PageHeader';

export function HomeHeader() {
  const { profile } = useUserStore();
  const { applications } = useJobStore();

  const daysSinceStart = profile?.startDate
    ? differenceInDays(new Date(), new Date(profile.startDate))
    : 0;

  return (
    <PageHeader
      title={
        <>
          <span className="hidden sm:inline"></span>Hola, {profile?.name || 'Invitado'}
        </>
      }
      description={
        <>
          Llevás <span className="font-semibold text-foreground">{daysSinceStart} días</span> construyendo tu próxima oportunidad.
        </>
      }
    />
  );
}
