"use client";

import type { LucideIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface SectionTab {
  key: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

/**
 * Underlined tab strip over the shared shadcn `Tabs`. Used purely as a
 * segmented control — panels are rendered by the caller, not `TabsContent`.
 */
export function SectionTabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: SectionTab[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <Tabs value={active} onValueChange={onChange} className={className}>
      <TabsList className="h-auto p-0 bg-transparent rounded-none justify-start gap-1 border-b border-slate-200 w-full overflow-x-auto">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <TabsTrigger
              key={t.key}
              value={t.key}
              className={cn(
                "relative rounded-none bg-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap shadow-none transition-colors",
                "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-900",
                isActive ? "text-blue-900" : "text-slate-500 hover:text-slate-800"
              )}
            >
              <span className="flex items-center gap-1.5">
                {t.icon && <t.icon className="w-3.5 h-3.5" />}
                {t.label}
                {t.count !== undefined && (
                  <span
                    className={cn(
                      "ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold",
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {t.count}
                  </span>
                )}
              </span>
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-900 rounded-full" />
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
