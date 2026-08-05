import { AnalyticsView } from "@/features/analytics/components/AnalyticsView";
import { PageContainer } from "@/components/layout/PageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estadísticas - NekoJobs",
};

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <AnalyticsView />
    </PageContainer>
  );
}
