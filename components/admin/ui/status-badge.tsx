import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/admin";

import { TONE, toneFor } from "./tone";

export interface ToneBadgeProps {
  tone?: Tone;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** The admin pill skin over the shared shadcn `Badge`. */
export function ToneBadge({
  tone = "neutral",
  dot = true,
  className,
  children,
}: ToneBadgeProps) {
  const t = TONE[tone];
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 px-2.5 py-1 border-transparent ring-1",
        t.bg,
        t.text,
        t.ring,
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", t.dot)} />}
      {children}
    </Badge>
  );
}

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <ToneBadge tone={toneFor(status)} className={className}>
      {status}
    </ToneBadge>
  );
}
