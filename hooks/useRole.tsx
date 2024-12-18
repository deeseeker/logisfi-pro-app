import {
  getAllOrganizations,
  getAllRoutes,
  getAllShippers,
  getAllVendors,
  getProfile,
} from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
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

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

export const useOrganization = () =>
  useQuery({
    queryKey: ["organization"],
    queryFn: getAllOrganizations,
  });

export const useRoutes = () =>
  useQuery({
    queryKey: ["routes"],
    queryFn: getAllRoutes,
  });

export const useShippers = () =>
  useQuery({
    queryKey: ["shippers"],
    queryFn: getAllShippers,
  });

export const useVendors = () =>
  useQuery({
    queryKey: ["vendors"],
    queryFn: getAllVendors,
  });
