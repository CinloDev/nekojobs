import { LearningsView } from "@/features/learnings/components/LearningsView";
import { PageContainer } from "@/components/layout/PageContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprendizajes - NekoJobs",
};

export default function LearningsPage() {
  return (
    <PageContainer>
      <LearningsView />
    </PageContainer>
  );
}
