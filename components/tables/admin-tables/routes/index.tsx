import { DataTable } from "@/components/ui/data-table";
import { columns } from "./column";
import { IResponse, IRoutes } from "@/types/admin";
import { useEffect, useState } from "react";
import { getAllRoutes } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeletonLoader } from "@/components/skeleton";

export default function RoutesTable() {
  const { data, isPending } = useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });
  const dataSource = data?.responseData ?? [];

  return (
    <div className="py-10">
      {isPending ? (
        <DataTableSkeletonLoader />
      ) : (
        <DataTable searchKey="origin" columns={columns} data={dataSource} />
      )}
    </div>
  );
}
