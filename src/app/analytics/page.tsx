import { AnalyticsView } from "@/features/analytics/components/AnalyticsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estadísticas - NekoJobs",
};

export default function AnalyticsPage() {
  return (
    <div className="px-4 py-8 md:p-8 h-full">
      <AnalyticsView />
    </div>
  );
}
