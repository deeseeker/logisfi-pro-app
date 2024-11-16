import { useEffect, useState } from "react";

function useRole() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const roles = localStorage.getItem("roles");

    if (roles !== null) {
      const role = JSON.parse(roles);
      setRole(role);
    }
  }, []);
  return role;
}

export default useRole;
