"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const SIZES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: keyof typeof SIZES;
}

/**
 * Admin modal shell. Composed from the shared dialog's `Dialog`/`DialogPortal`/
 * `DialogOverlay`/`DialogTitle`; `DialogPrimitive.Content` is used directly
 * because `DialogContent` renders its own non-overridable dark overlay and the
 * admin design calls for a lighter, blurred scrim.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogPortal>
        <DialogOverlay className="z-[100] bg-slate-900/40 backdrop-blur-[2px]" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-1/2 top-1/2 z-[100] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
            "bg-white rounded-2xl shadow-2xl flex flex-col max-h-[88vh] animate-modalin focus:outline-none",
            SIZES[size]
          )}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <DialogTitle className="text-base font-semibold text-slate-900">
              {title}
            </DialogTitle>
            <DialogPrimitive.Close className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400">
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
          <div className="px-6 py-5 overflow-y-auto">{children}</div>
          {footer && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
