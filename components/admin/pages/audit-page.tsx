"use client";

import {
  Activity,
  AlertTriangle,
  Download,
  Eye,
  Filter,
  ShieldAlert,
  ShieldCheck,
  User,
} from "lucide-react";

import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel, PanelHeader } from "@/components/admin/ui/panel";
import { StatCard } from "@/components/admin/ui/stat-card";
import { ToneBadge } from "@/components/admin/ui/status-badge";
import { ALERTS, AUDIT_LOG } from "@/constants/admin/mock-data";
import { cn } from "@/lib/utils";
import type { AdminAuditEvent, Tone } from "@/types/admin";
import { formatDateTime } from "@/utils/helpers";

const SEVERITY_TONE: Record<AdminAuditEvent["severity"], Tone> = {
  info: "info",
  warning: "warning",
  critical: "error",
};

const COLUMNS: DataTableColumn<AdminAuditEvent>[] = [
  {
    key: "id",
    header: "Event",
    sortable: true,
    render: (r) => (
      <span className="text-xs font-semibold text-slate-800 font-figure">{r.id}</span>
    ),
  },
  {
    key: "actor",
    header: "Actor",
    sortable: true,
    render: (r) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={r.actor} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">{r.actor}</p>
          <p className="text-[11px] text-slate-400">{r.role}</p>
        </div>
      </div>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (r) => (
      <span className="text-xs text-slate-700 whitespace-normal">{r.action}</span>
    ),
  },
  {
    key: "entity",
    header: "Entity",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-600 font-figure">{r.entity}</span>
    ),
  },
  {
    key: "time",
    header: "Timestamp",
    sortable: true,
    render: (r) => (
      <span className="text-xs text-slate-500 font-figure">{formatDateTime(r.time)}</span>
    ),
  },
  {
    key: "severity",
    header: "Severity",
    sortable: true,
    render: (r) => (
      <ToneBadge tone={SEVERITY_TONE[r.severity]}>
        {r.severity.charAt(0).toUpperCase() + r.severity.slice(1)}
      </ToneBadge>
    ),
  },
];

export function AuditPage() {
  const critical = AUDIT_LOG.filter((a) => a.severity === "critical").length;
  const warnings = AUDIT_LOG.filter((a) => a.severity === "warning").length;
  const systemEvents = AUDIT_LOG.filter((a) => a.actor === "System").length;
  const actors = new Set(AUDIT_LOG.map((a) => a.actor)).size;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Audit Centre"]}
        eyebrow="Intelligence"
        title="Audit Centre"
        subtitle="Immutable trail of every privileged action and automated control decision across the console."
        action={
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" icon={Filter} size="sm">
              Advanced filter
            </AdminButton>
            <AdminButton variant="primary" icon={Download} size="sm">
              Export trail
            </AdminButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Logged Events" value={AUDIT_LOG.length} icon={Activity} />
        <StatCard
          label="Critical"
          value={critical}
          icon={ShieldAlert}
          tone={critical > 0 ? "error" : "success"}
        />
        <StatCard
          label="Warnings"
          value={warnings}
          icon={AlertTriangle}
          tone={warnings > 0 ? "warning" : "success"}
        />
        <StatCard label="Distinct Actors" value={actors} icon={User} tone="info" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader
            icon={ShieldAlert}
            title="Open Control Alerts"
            subtitle="Automated checks currently requiring attention"
          />
          <div className="space-y-2.5">
            {ALERTS.map((a) => (
              <div
                key={a.title}
                className={cn(
                  "rounded-lg p-3 border flex items-start gap-2.5",
                  a.level === "critical"
                    ? "bg-red-50/70 border-red-100"
                    : "bg-amber-50/70 border-amber-100"
                )}
              >
                <a.icon
                  className={cn(
                    "w-4 h-4 mt-0.5 shrink-0",
                    a.level === "critical" ? "text-red-600" : "text-amber-600"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-slate-800">{a.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{a.detail}</p>
                </div>
                <ToneBadge
                  tone={a.level === "critical" ? "error" : "warning"}
                  className="shrink-0"
                >
                  {a.level === "critical" ? "Critical" : "Warning"}
                </ToneBadge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            icon={ShieldCheck}
            title="Control Coverage"
            subtitle="Automated vs. manual activity"
          />
          <div className="space-y-4 mt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-600">Automated (System)</span>
                <span className="font-semibold text-slate-800 font-figure">
                  {systemEvents}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-800"
                  style={{ width: `${(systemEvents / AUDIT_LOG.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-600">Manual (Administrators)</span>
                <span className="font-semibold text-slate-800 font-figure">
                  {AUDIT_LOG.length - systemEvents}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${((AUDIT_LOG.length - systemEvents) / AUDIT_LOG.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-5 leading-relaxed">
            Every entry is append-only and retained for seven years in line with CBN
            record-keeping guidance.
          </p>
        </Panel>
      </div>

      <DataTable
        title="Audit Trail"
        subtitle={`${AUDIT_LOG.length} events`}
        columns={COLUMNS}
        data={AUDIT_LOG}
        rowKey="id"
        pageSize={10}
        searchKeys={["id", "actor", "role", "action", "entity"]}
        filterOptions={[
          {
            key: "severity",
            label: "Severity",
            options: ["info", "warning", "critical"],
          },
          {
            key: "role",
            label: "Role",
            options: [
              "Ops Admin",
              "Finance Admin",
              "Super Admin",
              "Fraud Engine",
              "Scheduler",
            ],
          },
        ]}
        rowActions={[
          { label: "View detail", icon: Eye, onClick: () => {} },
          { label: "Export event", icon: Download, onClick: () => {} },
        ]}
      />
    </div>
  );
}
