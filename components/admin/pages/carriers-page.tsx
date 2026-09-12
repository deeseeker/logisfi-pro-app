"use client";

import * as React from "react";
import { Eye, Pencil, Plus, Trash2, Truck } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { Drawer } from "@/components/admin/ui/drawer";
import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
  Field,
} from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { CatalogueStats } from "@/components/admin/ui/catalogue-stats";
import { PageHeader } from "@/components/admin/ui/page-header";
import { CARRIERS } from "@/constants/admin/mock-data";
import { getApiErrorMessage } from "@/lib/api/errors";
import { usePagedListParams } from "@/lib/api/hooks/pagination";
import { useBanks } from "@/lib/api/hooks/shared";
import {
  useCreateVendor,
  useDeleteVendor,
  useUpdateVendor,
  useVendors,
} from "@/lib/api/hooks/vendors";
import { parsePagedMeta } from "@/lib/api/pagination";
import type { VendorMiniModel } from "@/lib/api/types/models";
import { formatDateShort } from "@/utils/helpers";

type CarrierFormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
};

const EMPTY_FORM: CarrierFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  accountName: "",
  accountNumber: "",
  bankCode: "",
};

function toForm(row?: VendorMiniModel | null): CarrierFormState {
  return {
    name: row?.name ?? "",
    email: row?.email ?? "",
    phone: row?.phone ?? "",
    address: row?.address ?? "",
    city: row?.city ?? "",
    state: row?.state ?? "",
    country: "",
    accountName: row?.vendorBankDetail?.accountName ?? "",
    accountNumber: row?.vendorBankDetail?.accountNumber ?? "",
    bankCode: row?.vendorBankDetail?.bankCode ?? "",
  };
}

const COLUMNS: DataTableColumn<VendorMiniModel>[] = [
  {
    key: "name",
    header: "Carrier",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.name ?? "Carrier"} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {row.name ?? "—"}
          </p>
          <p className="text-[11px] text-slate-400 font-figure">{row.id}</p>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    header: "Contact",
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-700 truncate">
          {row.email ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400">{row.phone ?? "—"}</p>
      </div>
    ),
  },
  {
    key: "city",
    header: "Location",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-600">
        {[row.city, row.state].filter(Boolean).join(", ") || "—"}
      </span>
    ),
  },
  {
    key: "vendorBankDetail",
    header: "Bank",
    render: (row) => (
      <div className="min-w-0">
        <p className="text-xs text-slate-700 truncate">
          {row.vendorBankDetail?.bankName ?? "—"}
        </p>
        <p className="text-[11px] text-slate-400 font-figure">
          {row.vendorBankDetail?.accountNumber ?? "—"}
        </p>
      </div>
    ),
  },
  {
    key: "createdAt",
    header: "Onboarded",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.createdAt ? formatDateShort(row.createdAt) : "—"}
      </span>
    ),
  },
];

export function CarriersPage() {
  const paging = usePagedListParams();
  const list = useVendors(paging.params);
  const rows = list.data?.responseData ?? [];
  const meta = parsePagedMeta(list.data?.metaData, {
    page: paging.page,
    pageSize: paging.pageSize,
    itemCount: rows.length,
  });
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<VendorMiniModel | null>(null);
  const [viewing, setViewing] = React.useState<VendorMiniModel | null>(null);

  const remove = useDeleteVendor({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Carriers"]}
        title="Carriers"
        subtitle="Haulage partners (vendors) that move financed freight."
        action={
          <AdminButton
            variant="primary"
            icon={Plus}
            size="sm"
            className="rounded-full"
            onClick={() => setCreateOpen(true)}
          >
            Add Carrier
          </AdminButton>
        }
      />

      <CatalogueStats
        totalLabel="Total Carriers"
        totalIcon={Truck}
        rows={CARRIERS}
      />

      <DataTable
        title="Carriers"
        subtitle={list.isPending ? "Loading…" : `${meta.totalCount} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["name", "email", "phone", "city", "id"]}
        serverPagination={{
          page: paging.page,
          pageSize: paging.pageSize,
          totalCount: meta.totalCount,
          onPageChange: paging.setPage,
          search: paging.search,
          onSearchChange: paging.setSearch,
        }}
        rowActions={[
          { label: "View", icon: Eye, onClick: (row) => setViewing(row) },
          { label: "Edit", icon: Pencil, onClick: (row) => setEditing(row) },
          {
            label: "Delete",
            icon: Trash2,
            danger: true,
            onClick: (row) => {
              if (!row.id || !window.confirm("Delete this carrier?")) {
                return;
              }
              remove.mutate({ vendorId: row.id });
            },
          },
        ]}
      />

      <CarrierCreateModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <CarrierFormDrawer
        vendor={editing}
        mode="edit"
        onClose={() => setEditing(null)}
      />
      <CarrierFormDrawer
        vendor={viewing}
        mode="view"
        onClose={() => setViewing(null)}
      />
    </div>
  );
}

function CarrierContactFields({
  form,
  setForm,
  readOnly = false,
}: {
  form: CarrierFormState;
  setForm: React.Dispatch<React.SetStateAction<CarrierFormState>>;
  readOnly?: boolean;
}) {
  const set =
    (key: keyof CarrierFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <Field label="Name" required className="md:col-span-2">
        <AdminInput
          value={form.name}
          onChange={set("name")}
          disabled={readOnly}
          placeholder="Carrier / vendor name"
        />
      </Field>
      <Field label="Email">
        <AdminInput
          type="email"
          value={form.email}
          onChange={set("email")}
          disabled={readOnly}
        />
      </Field>
      <Field label="Phone">
        <AdminInput
          value={form.phone}
          onChange={set("phone")}
          disabled={readOnly}
        />
      </Field>
      <Field label="City">
        <AdminInput
          value={form.city}
          onChange={set("city")}
          disabled={readOnly}
        />
      </Field>
      <Field label="State">
        <AdminInput
          value={form.state}
          onChange={set("state")}
          disabled={readOnly}
        />
      </Field>
      <Field label="Address" className="md:col-span-2">
        <AdminTextarea
          value={form.address}
          onChange={set("address")}
          disabled={readOnly}
        />
      </Field>
    </div>
  );
}

function CarrierCreateModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = React.useState(EMPTY_FORM);
  const banks = useBanks({ PageSize: 200 }, { enabled: open });
  const bankRows = banks.data?.responseData ?? [];

  React.useEffect(() => {
    if (open) setForm(EMPTY_FORM);
  }, [open]);

  const create = useCreateVendor({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Carrier created");
      onClose();
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const canSave =
    form.name.trim() &&
    form.accountName.trim() &&
    form.accountNumber.trim() &&
    form.bankCode;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add carrier"
      size="lg"
      footer={
        <>
          <AdminButton variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="primary"
            size="sm"
            disabled={!canSave || create.isPending}
            onClick={() =>
              create.mutate({
                body: {
                  name: form.name.trim() || null,
                  email: form.email.trim() || null,
                  phone: form.phone.trim() || null,
                  address: form.address.trim() || null,
                  city: form.city.trim() || null,
                  state: form.state.trim() || null,
                  vendorBankDetail: {
                    accountName: form.accountName.trim() || null,
                    accountNumber: form.accountNumber.trim() || null,
                    bankCode: form.bankCode || null,
                  },
                },
              })
            }
          >
            {create.isPending ? "Saving…" : "Create carrier"}
          </AdminButton>
        </>
      }
    >
      <CarrierContactFields form={form} setForm={setForm} />
      <p className="text-xs font-semibold text-slate-700 mt-2 mb-3">
        Bank details
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Field label="Account name" required>
          <AdminInput
            value={form.accountName}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, accountName: event.target.value }))
            }
          />
        </Field>
        <Field label="Account number" required>
          <AdminInput
            value={form.accountNumber}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                accountNumber: event.target.value,
              }))
            }
          />
        </Field>
        <Field label="Bank" required className="md:col-span-2">
          <AdminSelect
            value={form.bankCode}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, bankCode: event.target.value }))
            }
          >
            <option value="">
              {banks.isPending ? "Loading banks…" : "Select bank"}
            </option>
            {bankRows.map((bank) => (
              <option key={bank.code ?? bank.name} value={bank.code ?? ""}>
                {bank.name}
              </option>
            ))}
          </AdminSelect>
        </Field>
      </div>
    </Modal>
  );
}

function CarrierFormDrawer({
  vendor,
  mode,
  onClose,
}: {
  vendor: VendorMiniModel | null;
  mode: "edit" | "view";
  onClose: () => void;
}) {
  const [form, setForm] = React.useState(EMPTY_FORM);
  React.useEffect(() => {
    setForm(toForm(vendor));
  }, [vendor]);

  const update = useUpdateVendor({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Carrier updated");
      onClose();
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const readOnly = mode === "view";

  return (
    <Drawer
      open={Boolean(vendor)}
      onClose={onClose}
      title={mode === "view" ? "Carrier details" : "Edit carrier"}
      subtitle={vendor?.id}
      footer={
        readOnly ? (
          <AdminButton variant="primary" size="sm" onClick={onClose}>
            Close
          </AdminButton>
        ) : (
          <>
            <AdminButton variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </AdminButton>
            <AdminButton
              variant="primary"
              size="sm"
              disabled={!vendor?.id || !form.name.trim() || update.isPending}
              onClick={() => {
                if (!vendor?.id) return;
                update.mutate({
                  body: {
                    id: vendor.id,
                    name: form.name.trim() || null,
                    email: form.email.trim() || null,
                    phone: form.phone.trim() || null,
                    address: form.address.trim() || null,
                    city: form.city.trim() || null,
                    state: form.state.trim() || null,
                    country: form.country.trim() || null,
                  },
                });
              }}
            >
              {update.isPending ? "Saving…" : "Save changes"}
            </AdminButton>
          </>
        )
      }
    >
      <CarrierContactFields form={form} setForm={setForm} readOnly={readOnly} />
      {(vendor?.vendorBankDetail || mode === "view") && (
        <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm">
          <p className="text-[11px] font-semibold uppercase text-slate-400 mb-2">
            Bank on file
          </p>
          <p className="font-medium text-slate-800">
            {vendor?.vendorBankDetail?.bankName ?? "—"}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {vendor?.vendorBankDetail?.accountName ?? "—"} ·{" "}
            {vendor?.vendorBankDetail?.accountNumber ?? "—"}
          </p>
        </div>
      )}
    </Drawer>
  );
}
