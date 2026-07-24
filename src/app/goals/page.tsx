import { GoalsView } from "@/features/goals/components/GoalsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metas - NekoJobs",
};

export default function GoalsPage() {
  return (
    <div className="px-4 py-8 md:p-8 h-full">
      <GoalsView />
    </div>
  );
}
