"use client";

import * as React from "react";
import { Building2, Eye, Pencil, Plus, Trash2 } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { AvatarInitials } from "@/components/admin/ui/avatar-initials";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { Drawer } from "@/components/admin/ui/drawer";
import {
  AdminInput,
  AdminTextarea,
  Field,
} from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { CatalogueStats } from "@/components/admin/ui/catalogue-stats";
import { PageHeader } from "@/components/admin/ui/page-header";
import { SHIPPERS } from "@/constants/admin/mock-data";
import { getApiErrorMessage } from "@/lib/api/errors";
import { usePagedListParams } from "@/lib/api/hooks/pagination";
import {
  useCreateShipper,
  useDeleteShipper,
  useShippers,
  useUpdateShipper,
} from "@/lib/api/hooks/shippers";
import { parsePagedMeta } from "@/lib/api/pagination";
import type { ShipperMiniModel } from "@/lib/api/types/models";
import { formatDateShort } from "@/utils/helpers";

type ShipperFormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

const EMPTY_FORM: ShipperFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
};

function toForm(row?: ShipperMiniModel | null): ShipperFormState {
  return {
    name: row?.name ?? "",
    email: row?.email ?? "",
    phone: row?.phone ?? "",
    address: row?.address ?? "",
    city: row?.city ?? "",
    state: row?.state ?? "",
    country: row?.country ?? "",
  };
}

const COLUMNS: DataTableColumn<ShipperMiniModel>[] = [
  {
    key: "name",
    header: "Shipper",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.name ?? "Shipper"} size="sm" />
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
        {[row.city, row.state, row.country].filter(Boolean).join(", ") || "—"}
      </span>
    ),
  },
  {
    key: "address",
    header: "Address",
    render: (row) => (
      <span className="text-xs text-slate-600 truncate max-w-[220px] block">
        {row.address ?? "—"}
      </span>
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

export function ShippersPage() {
  const paging = usePagedListParams();
  const list = useShippers(paging.params);
  const rows = list.data?.responseData ?? [];
  const meta = parsePagedMeta(list.data?.metaData, {
    page: paging.page,
    pageSize: paging.pageSize,
    itemCount: rows.length,
  });
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<ShipperMiniModel | null>(null);
  const [viewing, setViewing] = React.useState<ShipperMiniModel | null>(null);

  const remove = useDeleteShipper({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Shippers"]}
        title="Shippers"
        subtitle="Cargo owners whose freight is financed and hauled on the platform."
        action={
          <AdminButton
            variant="primary"
            icon={Plus}
            size="sm"
            className="rounded-full"
            onClick={() => setCreateOpen(true)}
          >
            Add Shipper
          </AdminButton>
        }
      />

      <CatalogueStats
        totalLabel="Total Shippers"
        totalIcon={Building2}
        rows={SHIPPERS}
      />

      <DataTable
        title="Shippers"
        subtitle={list.isPending ? "Loading…" : `${meta.totalCount} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["name", "email", "phone", "city", "state", "id"]}
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
              if (!row.id || !window.confirm("Delete this shipper?")) {
                return;
              }
              remove.mutate({ shipperId: row.id });
            },
          },
        ]}
      />

      <ShipperFormModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <ShipperFormDrawer
        shipper={editing}
        mode="edit"
        onClose={() => setEditing(null)}
      />
      <ShipperFormDrawer
        shipper={viewing}
        mode="view"
        onClose={() => setViewing(null)}
      />
    </div>
  );
}

function ShipperFields({
  form,
  setForm,
  readOnly = false,
}: {
  form: ShipperFormState;
  setForm: React.Dispatch<React.SetStateAction<ShipperFormState>>;
  readOnly?: boolean;
}) {
  const set =
    (key: keyof ShipperFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <Field label="Name" required className="md:col-span-2">
        <AdminInput
          value={form.name}
          onChange={set("name")}
          disabled={readOnly}
          placeholder="Shipper legal name"
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
      <Field label="Country" className="md:col-span-2">
        <AdminInput
          value={form.country}
          onChange={set("country")}
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

function ShipperFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = React.useState(EMPTY_FORM);
  React.useEffect(() => {
    if (open) setForm(EMPTY_FORM);
  }, [open]);

  const create = useCreateShipper({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Shipper created");
      onClose();
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add shipper"
      size="lg"
      footer={
        <>
          <AdminButton variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="primary"
            size="sm"
            disabled={!form.name.trim() || create.isPending}
            onClick={() =>
              create.mutate({
                body: {
                  name: form.name.trim() || null,
                  email: form.email.trim() || null,
                  phone: form.phone.trim() || null,
                  address: form.address.trim() || null,
                  city: form.city.trim() || null,
                  state: form.state.trim() || null,
                },
              })
            }
          >
            {create.isPending ? "Saving…" : "Create shipper"}
          </AdminButton>
        </>
      }
    >
      <ShipperFields form={form} setForm={setForm} />
    </Modal>
  );
}

function ShipperFormDrawer({
  shipper,
  mode,
  onClose,
}: {
  shipper: ShipperMiniModel | null;
  mode: "edit" | "view";
  onClose: () => void;
}) {
  const [form, setForm] = React.useState(EMPTY_FORM);
  React.useEffect(() => {
    setForm(toForm(shipper));
  }, [shipper]);

  const update = useUpdateShipper({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Shipper updated");
      onClose();
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  const readOnly = mode === "view";

  return (
    <Drawer
      open={Boolean(shipper)}
      onClose={onClose}
      title={mode === "view" ? "Shipper details" : "Edit shipper"}
      subtitle={shipper?.id}
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
              disabled={!shipper?.id || !form.name.trim() || update.isPending}
              onClick={() => {
                if (!shipper?.id) return;
                update.mutate({
                  body: {
                    id: shipper.id,
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
      <ShipperFields form={form} setForm={setForm} readOnly={readOnly} />
    </Drawer>
  );
}
