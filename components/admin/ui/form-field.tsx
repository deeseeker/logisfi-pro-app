"use client";

import * as React from "react";
import { AlertCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface FieldProps {
  label: React.ReactNode;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  required,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("mb-4", className)}>
      <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
      {error && (
        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Shared control skin for the admin forms. */
const controlCls =
  "w-full h-10 px-3 rounded-lg border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-800/20 focus-visible:ring-offset-0 focus-visible:border-blue-800";

export function AdminInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return <Input className={cn(controlCls, className)} {...props} />;
}

export function AdminTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      className={cn(controlCls, "h-24 min-h-0 py-2.5 resize-none", className)}
      {...props}
    />
  );
}

const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")";

/**
 * A styled native `<select>`. `components/ui/select.tsx` is Radix-based and
 * cannot accept `<option>` children or `multiple`, which every admin form
 * relies on, so the control skin is applied to the native element instead.
 */
export function AdminSelect({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        controlCls,
        "appearance-none bg-no-repeat bg-[right_0.75rem_center] pr-9 focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800",
        props.multiple && "h-auto min-h-24 bg-none py-2 pr-3",
        className
      )}
      style={{ backgroundImage: props.multiple ? undefined : CHEVRON, ...style }}
      {...props}
    >
      {children}
    </select>
  );
}
