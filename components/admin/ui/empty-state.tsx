import * as React from "react";
import { FileSearch, type LucideIcon } from "lucide-react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = FileSearch,
  title,
  subtitle,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      {subtitle && <p className="text-xs text-slate-500 mt-1.5 max-w-sm">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
