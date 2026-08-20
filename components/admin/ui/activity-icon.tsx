import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Info,
  Receipt,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { AdminActivityItem, Tone } from "@/types/admin";

import { TONE } from "./tone";

const ICONS: Record<AdminActivityItem["icon"], LucideIcon> = {
  check: CheckCircle2,
  money: CircleDollarSign,
  alert: AlertTriangle,
  invoice: Receipt,
  truck: Truck,
};

export function ActivityIcon({
  tone = "info",
  icon,
}: {
  tone?: Tone;
  icon: AdminActivityItem["icon"];
}) {
  const Icon = ICONS[icon] ?? Info;
  const t = TONE[tone];
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
        t.bg,
        t.text
      )}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
}
