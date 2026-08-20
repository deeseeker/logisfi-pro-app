import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  type CellData,
  type Column as TanstackColumn,
  type ColumnDef as TanstackColumnDef,
  type ReactTable as TanstackReactTable,
  type Row as TanstackRow,
  type RowData,
} from "@tanstack/react-table";

/**
 * v9 requires features to be registered explicitly. Every table in the app
 * shares this one registry so that a `ColumnDef` declared in any column file
 * is assignable to any of the shared DataTable wrappers.
 */
export const tableFeatureSet = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnFacetingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
});

export type TableFeatureSet = typeof tableFeatureSet;

/**
 * v9 threads the feature set through every public type as the first generic
 * parameter. These aliases pin it to `tableFeatureSet` so call sites keep the
 * v8-style `ColumnDef<Order>` shape.
 */
export type ColumnDef<
  TData extends RowData,
  TValue extends CellData = CellData,
> = TanstackColumnDef<TableFeatureSet, TData, TValue>;

export type Column<TData extends RowData, TValue = unknown> = TanstackColumn<
  TableFeatureSet,
  TData,
  TValue
>;

export type Row<TData extends RowData> = TanstackRow<TableFeatureSet, TData>;

/**
 * The instance returned by `useTable`. Unlike the core `Table` type it exposes
 * `table.state`, which replaced v8's `table.getState()`.
 */
export type ReactTable<TData extends RowData> = TanstackReactTable<
  TableFeatureSet,
  TData
>;
