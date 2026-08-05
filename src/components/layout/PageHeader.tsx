import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8", className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && (
        <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
          {children}
        </div>
      )}
    </div>
  );
}
