"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The admin console's button skin, layered over the shared shadcn `Button`
 * (which keeps focus rings, disabled handling and `asChild`). shadcn's own
 * `variant="ghost"` is passed as a neutral base so nothing it sets survives
 * into these variants — hover text colours are declared explicitly for that
 * reason.
 */
const adminButtonVariants = cva(
  "rounded-lg font-medium transition-all duration-150 disabled:opacity-40 whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-900 text-white hover:bg-blue-800 hover:text-white active:bg-blue-950 shadow-sm shadow-blue-900/20",
        accent:
          "bg-emerald-600 text-white hover:bg-emerald-500 hover:text-white shadow-sm shadow-emerald-600/20",
        secondary:
          "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 shadow-sm",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-600",
        danger:
          "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-600",
        dangerSolid: "bg-red-600 text-white hover:bg-red-500 hover:text-white shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5 [&_svg]:size-3.5",
        md: "h-9 px-4 text-sm gap-2 [&_svg]:size-4",
        lg: "h-11 px-5 text-sm gap-2 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface AdminButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant" | "size">,
    VariantProps<typeof adminButtonVariants> {
  icon?: LucideIcon;
  full?: boolean;
}

export function AdminButton({
  variant,
  size,
  icon: Icon,
  full,
  className,
  children,
  type = "button",
  ...props
}: AdminButtonProps) {
  return (
    <Button
      type={type}
      variant="ghost"
      className={cn(adminButtonVariants({ variant, size }), full && "w-full", className)}
      {...props}
    >
      {Icon && <Icon strokeWidth={2.25} />}
      {children}
    </Button>
  );
}

export interface IconButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "variant" | "size"> {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

export function IconButton({
  icon: Icon,
  label,
  active = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      className={cn(
        "size-9 rounded-lg [&_svg]:size-[18px]",
        active
          ? "bg-blue-50 text-blue-800 hover:bg-blue-50 hover:text-blue-800"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800",
        className
      )}
      {...props}
    >
      <Icon strokeWidth={2} />
    </Button>
  );
}
