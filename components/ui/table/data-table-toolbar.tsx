"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { DataTableViewOptions } from "./data-table-view-options";
import { TrashIcon } from "lucide-react";
import {
  investmentStatus,
  mobilizationStatus,
  orderStatus,
  shipmentStatus,
} from "./data";

import { splitCamelCase } from "@/utils/helpers";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  filter1?: string;
  filter2?: string;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  filter1,
  filter2,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const getData = () => {
    switch (filter1) {
      case "orderStatus":
        return orderStatus;
      case "shipmentStatus":
        return shipmentStatus;

      case "investmentStatus":
        return investmentStatus;

      default:
        return [];
    }
  };
  const getData2 = () => {
    switch (filter2) {
      case "mobilizationStatus":
        return mobilizationStatus;

      default:
        return [];
    }
  };

  console.log(table.getAllColumns());

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder={`Search ${splitCamelCase(searchKey)} ...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filter1 && table?.getColumn(`${filter1}`) && (
          <DataTableFacetedFilter
            column={table?.getColumn(`${filter1}`)}
            title={
              filter1 === "investmentStatus"
                ? "Loan Status"
                : splitCamelCase(`${filter1}`)
            }
            options={getData()}
          />
        )}
        {filter2 && table?.getColumn(`${filter2}`) && (
          <DataTableFacetedFilter
            column={table?.getColumn(`${filter2}`)}
            title={splitCamelCase(`${filter2}`)}
            options={getData2()}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
