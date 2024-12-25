"use client";

import { Members, OrganizationId } from "@/types/admin";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Members>[] = [
  {
    header: "Name",

    cell: ({ row }) => {
      return (
        <span>{row.original.firstName + " " + row.original.lastName}</span>
      );
    },
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },

  {
    accessorKey: "position",
    header: "Position",
  },
];
