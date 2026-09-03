"use client";

import * as React from "react";
import { Landmark, Settings2, Wallet } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { AdminInput, AdminSelect, Field } from "@/components/admin/ui/form-field";
import { Drawer } from "@/components/admin/ui/drawer";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SectionTabs } from "@/components/admin/ui/section-tabs";
import { StatCard } from "@/components/admin/ui/stat-card";
import { getApiErrorMessage } from "@/lib/api/errors";
import {
  useFinancingConfiguration,
  useInvestorSummary,
  useUpsertFinancingConfiguration,
} from "@/lib/api/hooks/financing";
import { useWallets } from "@/lib/api/hooks/finances";
import { useOrganizations } from "@/lib/api/hooks/organizations";
import { FinancingModel } from "@/lib/api/types/enums";
import type { OrganizationModel, WalletModel } from "@/lib/api/types/models";
import { formatNairaCompact } from "@/utils/helpers";

const ORG_COLUMNS: DataTableColumn<OrganizationModel>[] = [
  {
    key: "organizationName",
    header: "Investor",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.organizationName ?? "Org"} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {row.organizationName ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400">{row.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "agreedInterestRate",
    header: "Agreed rate",
    render: (row) => (
      <span className="tabular-nums font-figure text-slate-700">
        {row.agreedInterestRate != null ? `${row.agreedInterestRate}%` : "—"}
      </span>
    ),
  },
  {
    key: "wallet",
    header: "Available",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold text-slate-800">
        {formatNairaCompact(row.wallet?.availableLoanAmount ?? 0)}
      </span>
    ),
  },
  {
    key: "loanAmountInUse",
    header: "In use",
    render: (row) => (
      <span className="tabular-nums font-figure text-slate-700">
        {formatNairaCompact(row.wallet?.loanAmountInUse ?? 0)}
      </span>
    ),
  },
  {
    key: "interestEarned",
    header: "Interest earned",
    render: (row) => (
      <span className="tabular-nums font-figure text-emerald-700">
        {formatNairaCompact(row.wallet?.interestEarned ?? 0)}
      </span>
    ),
  },
];

const WALLET_COLUMNS: DataTableColumn<WalletModel>[] = [
  {
    key: "organization",
    header: "Organization",
    render: (row) => (
      <span className="text-xs font-medium text-slate-800">
        {row.organization?.organizationName ?? "—"}
      </span>
    ),
  },
  {
    key: "availableLoanAmount",
    header: "Available",
    render: (row) => (
      <span className="tabular-nums font-figure font-semibold">
        {formatNairaCompact(row.availableLoanAmount ?? 0)}
      </span>
    ),
  },
  {
    key: "loanAmountInUse",
    header: "In use",
    render: (row) => (
      <span className="tabular-nums font-figure">
        {formatNairaCompact(row.loanAmountInUse ?? 0)}
      </span>
    ),
  },
  {
    key: "interestEarned",
    header: "Interest",
    render: (row) => (
      <span className="tabular-nums font-figure text-emerald-700">
        {formatNairaCompact(row.interestEarned ?? 0)}
      </span>
    ),
  },
];

export function InvestorsPage() {
  const [tab, setTab] = React.useState("orgs");
  const [orgId, setOrgId] = React.useState<string | null>(null);
  const organizations = useOrganizations({ PageSize: 100 });
  const wallets = useWallets({ PageSize: 100 });
  const rows = organizations.data?.responseData ?? [];
  const walletRows = wallets.data?.responseData ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Commercial", "Investor Management"]}
        eyebrow="Commercial"
        title="Investor Management"
        subtitle="Funding organizations, wallets and financing configuration."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Investors" value={rows.length} icon={Landmark} />
        <StatCard
          label="Available book"
          value={formatNairaCompact(
            rows.reduce((sum, row) => sum + (row.wallet?.availableLoanAmount ?? 0), 0)
          )}
          icon={Wallet}
          tone="success"
        />
      </div>

      <SectionTabs
        tabs={[
          { key: "orgs", label: "Organizations", count: rows.length },
          { key: "wallets", label: "Wallets", count: walletRows.length },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === "orgs" ? (
        <DataTable
          title="Investor organizations"
          subtitle={
            organizations.isPending ? "Loading…" : `${rows.length} records`
          }
          columns={ORG_COLUMNS}
          data={rows}
          rowKey="id"
          searchKeys={["organizationName", "id"]}
          onRowClick={(row) => row.id && setOrgId(row.id)}
          rowActions={[
            {
              label: "Financing config",
              icon: Settings2,
              onClick: (row) => row.id && setOrgId(row.id),
            },
          ]}
        />
      ) : (
        <DataTable
          title="Wallets"
          subtitle={wallets.isPending ? "Loading…" : `${walletRows.length} records`}
          columns={WALLET_COLUMNS}
          data={walletRows}
          rowKey="id"
          searchKeys={["id"]}
        />
      )}

      <FinancingConfigDrawer orgId={orgId} onClose={() => setOrgId(null)} />
    </div>
  );
}

function FinancingConfigDrawer({
  orgId,
  onClose,
}: {
  orgId: string | null;
  onClose: () => void;
}) {
  const config = useFinancingConfiguration(orgId ?? "", {
    enabled: Boolean(orgId),
  });
  const summary = useInvestorSummary(orgId ?? "", { enabled: Boolean(orgId) });
  const current = config.data?.responseData;
  const card = summary.data?.responseData;
  const [model, setModel] = React.useState<FinancingModel>("InterestBased");
  const [interestRate, setInterestRate] = React.useState("0");
  const [maxFundingPercent, setMaxFundingPercent] = React.useState("85");
  const [fundingLimit, setFundingLimit] = React.useState("0");
  const [exposureLimit, setExposureLimit] = React.useState("0");

  React.useEffect(() => {
    setModel(current?.model ?? "InterestBased");
    setInterestRate(String(current?.interestRate ?? 0));
    setMaxFundingPercent(String(current?.maxFundingPercent ?? 85));
    setFundingLimit(String(current?.fundingLimit ?? 0));
    setExposureLimit(String(current?.exposureLimit ?? 0));
  }, [current]);

  const upsert = useUpsertFinancingConfiguration({
    onSuccess: (response) =>
      showSuccessAlert(response.responseMessage ?? "Configuration saved"),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <Drawer
      open={Boolean(orgId)}
      onClose={onClose}
      title={card?.organizationName ?? "Financing configuration"}
      subtitle={orgId ?? undefined}
      footer={
        <AdminButton
          variant="primary"
          disabled={!orgId || upsert.isPending}
          onClick={() => {
            if (!orgId) {
              return;
            }
            upsert.mutate({
              orgId,
              body: {
                organizationId: orgId,
                effectiveFrom: new Date().toISOString(),
                model,
                interestRate: Number(interestRate),
                maxFundingPercent: Number(maxFundingPercent),
                fundingLimit: Number(fundingLimit),
                exposureLimit: Number(exposureLimit),
                isActive: true,
              },
            });
          }}
        >
          {upsert.isPending ? "Saving…" : "Save configuration"}
        </AdminButton>
      }
    >
      <div className="grid grid-cols-2 gap-3 text-sm mb-5">
        <div>
          <p className="text-[11px] text-slate-400 uppercase">Available</p>
          <p className="font-semibold font-figure">
            {formatNairaCompact(card?.availableLoanAmount ?? 0)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 uppercase">Exposure</p>
          <p className="font-semibold font-figure">
            {formatNairaCompact(card?.currentExposure ?? 0)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 uppercase">Utilization</p>
          <p className="font-semibold font-figure">
            {card?.fundingUtilizationPercent ?? 0}%
          </p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 uppercase">Active loads</p>
          <p className="font-semibold font-figure">
            {card?.activeShipmentCount ?? 0}
          </p>
        </div>
      </div>
      <Field label="Model">
        <AdminSelect
          value={model}
          onChange={(event) => setModel(event.target.value as FinancingModel)}
        >
          {Object.values(FinancingModel).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </AdminSelect>
      </Field>
      <Field label="Interest rate">
        <AdminInput
          type="number"
          value={interestRate}
          onChange={(event) => setInterestRate(event.target.value)}
        />
      </Field>
      <Field label="Max funding %">
        <AdminInput
          type="number"
          value={maxFundingPercent}
          onChange={(event) => setMaxFundingPercent(event.target.value)}
        />
      </Field>
      <Field label="Funding limit">
        <AdminInput
          type="number"
          value={fundingLimit}
          onChange={(event) => setFundingLimit(event.target.value)}
        />
      </Field>
      <Field label="Exposure limit">
        <AdminInput
          type="number"
          value={exposureLimit}
          onChange={(event) => setExposureLimit(event.target.value)}
        />
      </Field>
    </Drawer>
  );
}
