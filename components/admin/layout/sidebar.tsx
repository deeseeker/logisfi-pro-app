"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Zap } from "lucide-react";

import { ADMIN_NAV } from "@/constants/admin/nav";
import { cn } from "@/lib/utils";

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-blue-950 flex flex-col shrink-0 transition-all duration-300",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
          <Zap className="size-[18px] text-white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white font-semibold text-[15px] tracking-tight leading-none">
              LogisfiPro
            </p>
            <p className="text-blue-300/70 text-[10px] mt-1 tracking-wide uppercase">
              The Haulage Hub
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {ADMIN_NAV.map((sec) => (
          <div key={sec.section} className="mb-5">
            {!collapsed && (
              <p className="px-3 text-[10px] font-semibold text-blue-400/60 uppercase tracking-wider mb-1.5">
                {sec.section}
              </p>
            )}
            {sec.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5 transition-colors relative",
                    active
                      ? "bg-white/10 text-white"
                      : "text-blue-200/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-emerald-400 rounded-full" />
                  )}
                  <item.icon
                    className="size-[18px] shrink-0"
                    strokeWidth={1.9}
                  />
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">
                      {item.label}
                    </span>
                  )}
                  {!collapsed && item.badge ? (
                    <span className="text-[10px] font-semibold bg-white/10 text-blue-200 rounded-full px-1.5 py-0.5">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-200/70 hover:bg-white/5 hover:text-white text-sm"
        >
          <ChevronLeft
            className={cn(
              "size-[18px] transition-transform",
              collapsed && "rotate-180",
            )}
          />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}
