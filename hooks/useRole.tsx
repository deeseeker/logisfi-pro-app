import { getProfile } from "@/app/api/services";
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
