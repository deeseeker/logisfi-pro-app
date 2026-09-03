"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Columns3,
  Download,
  Filter,
  Grid3x3,
  List,
  MoreHorizontal,
  Search,
  Upload,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { AdminButton } from "./admin-button";
import { EmptyState } from "./empty-state";
import { Panel } from "./panel";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableFilter {
  key: string;
  label: string;
  options: string[];
}

export interface DataTableRowAction<T> {
  label: string;
  icon?: LucideIcon;
  danger?: boolean;
  onClick: (row: T) => void;
}

export interface DataTableBulkAction {
  label: string;
  icon?: LucideIcon;
  onClick: (ids: string[]) => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  searchKeys?: string[];
  rowKey?: string;
  onRowClick?: (row: T) => void;
  rowActions?: DataTableRowAction<T>[];
  filterOptions?: DataTableFilter[];
  bulkActions?: DataTableBulkAction[];
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  pageSize?: number;
}

const checkboxCls =
  "rounded border-slate-300 text-blue-800 focus:ring-blue-800/30 cursor-pointer";

function compare(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  return String(a).localeCompare(String(b));
}

function cellValue(row: object, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

export function DataTable<T extends object>({
  columns,
  data,
  searchKeys = [],
  rowKey = "id",
  onRowClick,
  rowActions,
  filterOptions = [],
  bulkActions = [],
  title,
  subtitle,
  headerAction,
  pageSize = 8,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({});
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(1);
  const [density, setDensity] = React.useState<"comfortable" | "compact">(
    "comfortable"
  );
  const [selected, setSelected] = React.useState<string[]>([]);
  const [hiddenCols, setHiddenCols] = React.useState<string[]>([]);

  const filtered = React.useMemo(() => {
    let rows = data;
    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((r) =>
        searchKeys.some((k) =>
          String(cellValue(r, k) ?? "")
            .toLowerCase()
            .includes(q)
        )
      );
    }
    Object.entries(activeFilters).forEach(([k, v]) => {
      if (v && v !== "All") {
        rows = rows.filter((r) => String(cellValue(r, k)) === v);
      }
    });
    if (sortKey) {
      rows = [...rows].sort((a, b) => {
        const result = compare(cellValue(a, sortKey), cellValue(b, sortKey));
        return sortDir === "asc" ? result : -result;
      });
    }
    return rows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query, activeFilters, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const rowH = density === "compact" ? "py-2" : "py-3.5";
  const visibleCols = columns.filter((c) => !hiddenCols.includes(c.key));

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  const toggleSelect = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAll = () =>
    setSelected((s) =>
      s.length === paged.length
        ? []
        : paged.map((r) => String(cellValue(r, rowKey)))
    );

  return (
    <Panel padded={false} className="overflow-visible">
      {(title || subtitle || headerAction) && (
        <div className="flex items-center justify-between px-5 pt-5 pb-1">
          <div>
            {title && (
              <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
            )}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction}
        </div>
      )}

      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur px-5 py-3.5 flex flex-wrap items-center gap-2.5 border-b border-slate-100">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search…"
            className="h-9 pl-9 pr-3 rounded-lg border-slate-200 text-sm focus-visible:ring-2 focus-visible:ring-blue-800/20 focus-visible:ring-offset-0 focus-visible:border-blue-800"
          />
        </div>

        {filterOptions.map((f) => {
          const value = activeFilters[f.key] ?? "All";
          const isSet = value !== "All";
          return (
            <DropdownMenu key={f.key}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "h-9 px-3 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors",
                    isSet
                      ? "border-blue-800 text-blue-900 bg-blue-50"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Filter className="w-3.5 h-3.5" />
                  {f.label}
                  {isSet ? `: ${value}` : ""}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 max-h-64 overflow-y-auto"
              >
                {["All", ...f.options].map((opt) => (
                  <DropdownMenuItem
                    key={opt}
                    onSelect={() => {
                      setActiveFilters((a) => ({ ...a, [f.key]: opt }));
                      setPage(1);
                    }}
                    className={cn(
                      "text-xs justify-between",
                      value === opt && "text-blue-800 font-semibold"
                    )}
                  >
                    {opt}
                    {value === opt && <Check className="w-3 h-3" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}

        <div className="flex-1" />

        <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => setDensity("comfortable")}
            aria-label="Comfortable rows"
            className={cn(
              "h-9 px-2.5",
              density === "comfortable"
                ? "bg-slate-100 text-slate-800"
                : "text-slate-400"
            )}
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDensity("compact")}
            aria-label="Compact rows"
            className={cn(
              "h-9 px-2.5 border-l border-slate-200",
              density === "compact" ? "bg-slate-100 text-slate-800" : "text-slate-400"
            )}
          >
            <Grid3x3 className="w-3.5 h-3.5" />
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-9 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5">
              <Columns3 className="w-3.5 h-3.5" /> Columns
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 max-h-64 overflow-y-auto">
            {columns.map((c) => (
              <DropdownMenuCheckboxItem
                key={c.key}
                checked={!hiddenCols.includes(c.key)}
                onCheckedChange={() =>
                  setHiddenCols((h) =>
                    h.includes(c.key) ? h.filter((x) => x !== c.key) : [...h, c.key]
                  )
                }
                onSelect={(e) => e.preventDefault()}
                className="text-xs"
              >
                {c.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <AdminButton variant="secondary" size="sm" icon={Upload}>
          Import
        </AdminButton>
        <AdminButton variant="secondary" size="sm" icon={Download}>
          Export
        </AdminButton>
      </div>

      {selected.length > 0 && (
        <div className="px-5 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
          <span className="text-xs font-semibold text-blue-900">
            {selected.length} selected
          </span>
          {bulkActions.map((a) => (
            <button
              key={a.label}
              onClick={() => a.onClick(selected)}
              className="text-xs font-medium text-blue-800 hover:underline flex items-center gap-1"
            >
              {a.icon && <a.icon className="w-3.5 h-3.5" />}
              {a.label}
            </button>
          ))}
          <button
            onClick={() => setSelected([])}
            className="text-xs text-slate-400 hover:text-slate-600 ml-auto"
          >
            Clear
          </button>
        </div>
      )}

      <Table className="text-sm">
        <TableHeader>
          <TableRow className="border-slate-100 bg-slate-50/60 hover:bg-slate-50/60">
            <TableHead className="w-10 h-auto pl-5 pr-0 py-3">
              <input
                type="checkbox"
                aria-label="Select all rows on this page"
                checked={selected.length === paged.length && paged.length > 0}
                onChange={toggleAll}
                className={checkboxCls}
              />
            </TableHead>
            {visibleCols.map((c) => (
              <TableHead
                key={c.key}
                onClick={() => c.sortable && toggleSort(c.key)}
                className={cn(
                  "h-auto px-3 py-3 font-semibold text-slate-500 text-[11px] uppercase tracking-wide whitespace-nowrap",
                  c.sortable && "cursor-pointer select-none hover:text-slate-800"
                )}
              >
                <span className="flex items-center gap-1">
                  {c.header}
                  {c.sortable && (
                    <ChevronsUpDown
                      className={cn(
                        "w-3 h-3",
                        sortKey === c.key ? "text-blue-800" : "text-slate-300"
                      )}
                    />
                  )}
                </span>
              </TableHead>
            ))}
            {rowActions && <TableHead className="w-10 h-auto pr-5" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paged.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={visibleCols.length + 2} className="p-0">
                <EmptyState
                  title="No records match your filters"
                  subtitle="Try adjusting your search or filter criteria."
                />
              </TableCell>
            </TableRow>
          )}
          {paged.map((row) => {
            const id = String(cellValue(row, rowKey));
            return (
              <TableRow
                key={id}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-slate-50 hover:bg-slate-50/70",
                  onRowClick && "cursor-pointer"
                )}
              >
                <TableCell
                  className="pl-5 pr-0 py-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    aria-label={`Select ${id}`}
                    checked={selected.includes(id)}
                    onChange={() => toggleSelect(id)}
                    className={checkboxCls}
                  />
                </TableCell>
                {visibleCols.map((c) => (
                  <TableCell
                    key={c.key}
                    className={cn("px-3 text-slate-700 whitespace-nowrap", rowH)}
                  >
                    {c.render ? c.render(row) : String(cellValue(row, c.key) ?? "")}
                  </TableCell>
                ))}
                {rowActions && (
                  <TableCell
                    className="pr-5 py-0 text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RowActionsMenu row={row} actions={rowActions} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
        <span className="text-xs text-slate-400">
          Showing {paged.length === 0 ? 0 : (page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous page"
            className="w-8 h-8 rounded-lg border border-slate-200 disabled:opacity-30 flex items-center justify-center hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages })
            .slice(0, 5)
            .map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium",
                  page === i + 1
                    ? "bg-blue-900 text-white"
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                {i + 1}
              </button>
            ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next page"
            className="w-8 h-8 rounded-lg border border-slate-200 disabled:opacity-30 flex items-center justify-center hover:bg-slate-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Panel>
  );
}

export function RowActionsMenu<T>({
  row,
  actions,
}: {
  row: T;
  actions: DataTableRowAction<T>[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Row actions"
          className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {actions.map((a) => (
          <DropdownMenuItem
            key={a.label}
            onSelect={() => a.onClick(row)}
            className={cn(
              "text-xs gap-2",
              a.danger ? "text-red-600 focus:text-red-600" : "text-slate-700"
            )}
          >
            {a.icon && <a.icon className="w-3.5 h-3.5" />}
            {a.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
