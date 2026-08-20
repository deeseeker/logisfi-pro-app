"use client";

import { useOrganizations } from "@/lib/api/hooks/organizations";
import { useRoutes } from "@/lib/api/hooks/routes";
import { useTruckSizes } from "@/lib/api/hooks/shared";
import { useShippers as useShippersQuery } from "@/lib/api/hooks/shippers";
import { useUser } from "@/lib/api/hooks/users";
import { useVendors as useVendorsQuery } from "@/lib/api/hooks/vendors";
import { useEffect, useState } from "react";

function useRole() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const roles = localStorage.getItem("user");

    if (roles !== null) {
      const role = JSON.parse(roles);
      setRole(role);
    }
  }, []);
  return role;
}

export default useRole;

export function useProfile() {
  const query = useUser();
  return { ...query, data: query.data?.responseData };
}

/** Organization list. Distinct from `useOrganization(id)` in `@/lib/api/hooks/organizations`. */
export function useOrganization() {
  return useOrganizations();
}

export { useRoutes };

export function useShippers() {
  const query = useShippersQuery();
  return { ...query, data: query.data?.responseData ?? [] };
}

export function useVendors() {
  const query = useVendorsQuery();
  return { ...query, data: query.data?.responseData ?? [] };
}

export function useGetTruckSize() {
  const query = useTruckSizes();
  return { ...query, data: query.data?.responseData ?? [] };
}
