import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: ReactNode;
  icon?: ReactNode;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({ title, icon, description, className, children }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6", className)}>
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {children && (
        <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
          {children}
        </div>
      )}
    </div>
  );
}
