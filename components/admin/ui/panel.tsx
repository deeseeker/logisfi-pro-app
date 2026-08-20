import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PanelProps extends React.ComponentProps<typeof Card> {
  padded?: boolean;
  hover?: boolean;
}

/** The admin console's card skin over the shared shadcn `Card`. */
export function Panel({
  className,
  padded = true,
  hover = false,
  ...props
}: PanelProps) {
  return (
    <Card
      className={cn(
        "bg-white rounded-xl border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        hover && "transition-shadow hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)]",
        padded && "p-5",
        className
      )}
      {...props}
    />
  );
}

export interface PanelHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function PanelHeader({
  title,
  subtitle,
  action,
  icon: Icon,
  className,
}: PanelHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between mb-4", className)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
            <Icon className="size-[18px]" strokeWidth={2} />
          </div>
        )}
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">
            {title}
          </h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
