import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export function AdminBreadcrumb({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <Breadcrumb className={cn("mb-1", className)}>
      <BreadcrumbList className="gap-1.5 sm:gap-1.5 text-xs text-slate-400">
        {items.map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && (
              <BreadcrumbSeparator className="[&>svg]:w-3 [&>svg]:h-3 text-slate-400" />
            )}
            <BreadcrumbItem>
              {i === items.length - 1 ? (
                <BreadcrumbPage className="text-slate-500 font-medium">
                  {item}
                </BreadcrumbPage>
              ) : (
                <span>{item}</span>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumb?: string[];
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
      <div>
        {breadcrumb && <AdminBreadcrumb items={breadcrumb} />}
        {eyebrow && (
          <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1 max-w-2xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
