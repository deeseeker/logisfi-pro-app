import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/helpers";

const SIZES = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-11 h-11 text-sm",
} as const;

const PALETTE = [
  "bg-blue-100 text-blue-800",
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-800",
  "bg-violet-100 text-violet-800",
  "bg-cyan-100 text-cyan-800",
  "bg-rose-100 text-rose-800",
];

export interface AvatarInitialsProps {
  name: string;
  size?: keyof typeof SIZES;
  /** Overrides the name-derived palette entry, e.g. "bg-white/10 text-white". */
  color?: string;
  className?: string;
}

export function AvatarInitials({
  name,
  size = "md",
  color,
  className,
}: AvatarInitialsProps) {
  const swatch = color ?? PALETTE[name ? name.charCodeAt(0) % PALETTE.length : 0];
  return (
    <Avatar className={cn("font-semibold", SIZES[size], swatch, className)}>
      <AvatarFallback className="bg-transparent text-inherit text-[inherit] font-semibold">
        {getInitials(name || "?")}
      </AvatarFallback>
    </Avatar>
  );
}
