"use client";

import {
  Download,
  FileBarChart,
  Landmark,
  Play,
  Receipt,
  ShieldAlert,
} from "lucide-react";

import { showErrorAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { PageHeader } from "@/components/admin/ui/page-header";
import { Panel } from "@/components/admin/ui/panel";
import { StatCard } from "@/components/admin/ui/stat-card";
import { ToneBadge } from "@/components/admin/ui/status-badge";
import { downloadBlob } from "@/lib/download";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useAuditReport,
  useCollectionsReport,
  useCreditExposureReport,
  usePortfolioReport,
} from "@/lib/api/hooks/reports";

export function ReportsPage() {
  const portfolio = usePortfolioReport({
    onSuccess: (blob) => downloadBlob(blob, "portfolio-report.pdf"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const exposure = useCreditExposureReport({
    onSuccess: (blob) => downloadBlob(blob, "credit-exposure-report.pdf"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const collections = useCollectionsReport({
    onSuccess: (blob) => downloadBlob(blob, "collections-report.pdf"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });
  const audit = useAuditReport({
    onSuccess: (blob) => downloadBlob(blob, "audit-report.pdf"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const cards = [
    {
      key: "portfolio",
      title: "Portfolio",
      description: "Funded, repaid and exposure by period.",
      icon: Landmark,
      run: () => portfolio.mutate({ params: { period: "Last90Days" } }),
      pending: portfolio.isPending,
    },
    {
      key: "exposure",
      title: "Credit exposure",
      description: "Exposure by shipper, carrier or route.",
      icon: FileBarChart,
      run: () => exposure.mutate({ params: { format: "Pdf" } }),
      pending: exposure.isPending,
    },
    {
      key: "collections",
      title: "Collections",
      description: "Due, overdue and collection performance.",
      icon: Receipt,
      run: () => collections.mutate({ params: { period: "Last90Days" } }),
      pending: collections.isPending,
    },
    {
      key: "audit",
      title: "Audit trail",
      description: "Disbursements, recoveries and entity-change history.",
      icon: ShieldAlert,
      run: () => audit.mutate({ params: { period: "Last90Days" } }),
      pending: audit.isPending,
    },
  ] as const;

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Intelligence", "Reports"]}
        eyebrow="Intelligence"
        title="Reports"
        subtitle="Download live portfolio, credit, collections and audit packs from the API."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Available reports" value={cards.length} icon={FileBarChart} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Panel key={card.key} hover className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                <card.icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <ToneBadge tone="info" dot={false}>
                Live
              </ToneBadge>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">{card.title}</h3>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed flex-1">
              {card.description}
            </p>
            <AdminButton
              variant="primary"
              size="sm"
              icon={card.pending ? Download : Play}
              className="mt-4"
              onClick={card.run}
              disabled={card.pending}
            >
              {card.pending ? "Generating…" : "Generate"}
            </AdminButton>
          </Panel>
        ))}
      </div>
    </div>
  );
}
