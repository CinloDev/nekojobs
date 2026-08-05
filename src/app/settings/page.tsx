import { SettingsView } from '@/features/settings/components/SettingsView';
import { PageContainer } from '@/components/layout/PageContainer';

export default function SettingsPage() {
  return (
    <PageContainer size="narrow">
      <SettingsView />
    </PageContainer>
  );
}
