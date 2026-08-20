"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { Sheet, SheetOverlay, SheetPortal, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Tailwind width class, e.g. `w-[640px]`. */
  width?: string;
}

/**
 * Admin right-side drawer. Composed from the shared sheet's `Sheet`/
 * `SheetPortal`/`SheetOverlay`/`SheetTitle`; `SheetPrimitive.Content` is used
 * directly because `SheetContent` renders its own non-overridable dark overlay
 * and caps width at `sm:max-w-sm`.
 */
export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "w-[560px]",
}: DrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetPortal>
        <SheetOverlay className="z-[100] bg-slate-900/40 backdrop-blur-[2px]" />
        <SheetPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed inset-y-0 right-0 z-[100] h-full max-w-full bg-white shadow-2xl flex flex-col focus:outline-none",
            "transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            "data-[state=closed]:duration-300 data-[state=open]:duration-500",
            width
          )}
        >
          <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100 shrink-0">
            <div>
              <SheetTitle className="text-base font-semibold text-slate-900">
                {title}
              </SheetTitle>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            <SheetPrimitive.Close className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          </div>
          <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
          {footer && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50">
              {footer}
            </div>
          )}
        </SheetPrimitive.Content>
      </SheetPortal>
    </Sheet>
  );
}
