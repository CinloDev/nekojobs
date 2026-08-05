import { GoalsView } from "@/features/goals/components/GoalsView";
import { PageContainer } from "@/components/layout/PageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metas - NekoJobs",
};

export default function GoalsPage() {
  return (
    <PageContainer>
      <GoalsView />
    </PageContainer>
  );
}
