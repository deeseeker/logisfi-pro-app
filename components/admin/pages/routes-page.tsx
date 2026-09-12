"use client";

import * as React from "react";
import { Pencil, Plus, Route as RouteIcon, Trash2 } from "lucide-react";

import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { AdminButton } from "@/components/admin/ui/admin-button";
import { DataTable, type DataTableColumn } from "@/components/admin/ui/data-table";
import { Drawer } from "@/components/admin/ui/drawer";
import { AdminInput, Field } from "@/components/admin/ui/form-field";
import { Modal } from "@/components/admin/ui/modal";
import { CatalogueStats } from "@/components/admin/ui/catalogue-stats";
import { PageHeader } from "@/components/admin/ui/page-header";
import { ROUTES } from "@/constants/admin/mock-data";
import { getApiErrorMessage } from "@/lib/api/errors";
import { usePagedListParams } from "@/lib/api/hooks/pagination";
import {
  useCreateRoute,
  useDeleteRoute,
  useRoutes,
  useUpdateRoute,
} from "@/lib/api/hooks/routes";
import { parsePagedMeta } from "@/lib/api/pagination";
import type { RouteMiniModel } from "@/lib/api/types/models";
import { formatDateShort } from "@/utils/helpers";

type RouteFormState = {
  origin: string;
  destination: string;
};

const EMPTY_FORM: RouteFormState = {
  origin: "",
  destination: "",
};

const COLUMNS: DataTableColumn<RouteMiniModel>[] = [
  {
    key: "origin",
    header: "Route",
    sortable: true,
    render: (row) => (
      <span className="text-xs font-semibold text-slate-800">
        {row.origin ?? "—"}
        <span className="text-slate-300 font-normal mx-1.5">→</span>
        {row.destination ?? "—"}
      </span>
    ),
  },
  {
    key: "destination",
    header: "Destination",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-600">{row.destination ?? "—"}</span>
    ),
  },
  {
    key: "id",
    header: "ID",
    render: (row) => (
      <span className="text-[11px] text-slate-400 font-figure">{row.id}</span>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    sortable: true,
    render: (row) => (
      <span className="text-xs text-slate-500 font-figure">
        {row.createdAt ? formatDateShort(row.createdAt) : "—"}
      </span>
    ),
  },
];

export function RoutesPage() {
  const paging = usePagedListParams();
  const list = useRoutes(paging.params);
  const rows = list.data?.responseData ?? [];
  const meta = parsePagedMeta(list.data?.metaData, {
    page: paging.page,
    pageSize: paging.pageSize,
    itemCount: rows.length,
  });
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<RouteMiniModel | null>(null);

  const remove = useDeleteRoute({
    onSuccess: (response) => showSuccessAlert(response.responseMessage),
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumb={["Master Data", "Routes"]}
        title="Routes"
        subtitle="Origin-destination lanes used when creating shipments."
        action={
          <AdminButton
            variant="primary"
            icon={Plus}
            size="sm"
            className="rounded-full"
            onClick={() => setCreateOpen(true)}
          >
            Add Route
          </AdminButton>
        }
      />

      <CatalogueStats
        totalLabel="Total Routes"
        totalIcon={RouteIcon}
        rows={ROUTES}
      />

      <DataTable
        title="Routes"
        subtitle={list.isPending ? "Loading…" : `${meta.totalCount} records`}
        columns={COLUMNS}
        data={rows}
        rowKey="id"
        searchKeys={["origin", "destination", "id"]}
        serverPagination={{
          page: paging.page,
          pageSize: paging.pageSize,
          totalCount: meta.totalCount,
          onPageChange: paging.setPage,
          search: paging.search,
          onSearchChange: paging.setSearch,
        }}
        rowActions={[
          { label: "Edit", icon: Pencil, onClick: (row) => setEditing(row) },
          {
            label: "Delete",
            icon: Trash2,
            danger: true,
            onClick: (row) => {
              if (!row.id || !window.confirm("Delete this route?")) {
                return;
              }
              remove.mutate({ routeId: row.id });
            },
          },
        ]}
      />

      <RouteCreateModal open={createOpen} onClose={() => setCreateOpen(false)} />
      <RouteEditDrawer route={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

function RouteFields({
  form,
  setForm,
}: {
  form: RouteFormState;
  setForm: React.Dispatch<React.SetStateAction<RouteFormState>>;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-4">
      <Field label="Origin" required>
        <AdminInput
          value={form.origin}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, origin: event.target.value }))
          }
          placeholder="e.g. Apapa"
        />
      </Field>
      <Field label="Destination" required>
        <AdminInput
          value={form.destination}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, destination: event.target.value }))
          }
          placeholder="e.g. Kano"
        />
      </Field>
    </div>
  );
}

function RouteCreateModal({
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

  const create = useCreateRoute({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Route created");
      onClose();
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add route"
      footer={
        <>
          <AdminButton variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="primary"
            size="sm"
            disabled={
              !form.origin.trim() ||
              !form.destination.trim() ||
              create.isPending
            }
            onClick={() =>
              create.mutate({
                body: {
                  origin: form.origin.trim() || null,
                  destination: form.destination.trim() || null,
                },
              })
            }
          >
            {create.isPending ? "Saving…" : "Create route"}
          </AdminButton>
        </>
      }
    >
      <RouteFields form={form} setForm={setForm} />
    </Modal>
  );
}

function RouteEditDrawer({
  route,
  onClose,
}: {
  route: RouteMiniModel | null;
  onClose: () => void;
}) {
  const [form, setForm] = React.useState(EMPTY_FORM);
  React.useEffect(() => {
    setForm({
      origin: route?.origin ?? "",
      destination: route?.destination ?? "",
    });
  }, [route]);

  const update = useUpdateRoute({
    onSuccess: (response) => {
      showSuccessAlert(response.responseMessage ?? "Route updated");
      onClose();
    },
    onError: (error) => showErrorAlert(getApiErrorMessage(error)),
  });

  return (
    <Drawer
      open={Boolean(route)}
      onClose={onClose}
      title="Edit route"
      subtitle={route?.id}
      footer={
        <>
          <AdminButton variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="primary"
            size="sm"
            disabled={
              !route?.id ||
              !form.origin.trim() ||
              !form.destination.trim() ||
              update.isPending
            }
            onClick={() => {
              if (!route?.id) return;
              update.mutate({
                body: {
                  id: route.id,
                  origin: form.origin.trim() || null,
                  destination: form.destination.trim() || null,
                },
              });
            }}
          >
            {update.isPending ? "Saving…" : "Save changes"}
          </AdminButton>
        </>
      }
    >
      <RouteFields form={form} setForm={setForm} />
    </Drawer>
  );
}
