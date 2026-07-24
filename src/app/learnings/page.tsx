import { LearningsView } from "@/features/learnings/components/LearningsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprendizajes - NekoJobs",
};

export default function LearningsPage() {
  return (
    <div className="px-4 py-8 md:p-8 h-full">
      <LearningsView />
    </div>
  );
}
