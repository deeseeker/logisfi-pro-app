import { CheckCircle2, Clock, Plus, type LucideIcon } from "lucide-react";

import { StatCard } from "@/components/admin/ui/stat-card";

export function isApiRecordId(id?: string | null) {
  return Boolean(
    id &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id
      )
  );
}

export function catalogueCounts(rows: { status: string }[]) {
  return {
    total: rows.length,
    active: rows.filter((row) => row.status === "Active").length,
    pending: rows.filter(
      (row) =>
        row.status === "Under Review" || row.status === "Pending Review"
    ).length,
  };
}

export function CatalogueStats({
  totalLabel,
  totalIcon,
  rows,
  addedThisMonth = 2,
}: {
  totalLabel: string;
  totalIcon: LucideIcon;
  rows: { status: string }[];
  addedThisMonth?: number;
}) {
  const { total, active, pending } = catalogueCounts(rows);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard label={totalLabel} value={total} icon={totalIcon} />
      <StatCard
        label="Active"
        value={active}
        icon={CheckCircle2}
        tone="success"
      />
      <StatCard
        label="Pending Review"
        value={pending}
        icon={Clock}
        tone="warning"
      />
      <StatCard label="Added This Month" value={addedThisMonth} icon={Plus} />
    </div>
  );
}
