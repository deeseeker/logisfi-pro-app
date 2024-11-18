"use client";
import { getProfile } from "@/app/api/services";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: any;
  user: any;
  setUser: any;
  roles: string[] | null;
  setRoles: Dispatch<SetStateAction<string[] | null>>;
  profile: any;
}
// coming back to this
const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
  roles: null,
  setRoles: () => {},
  profile: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState<string[] | null>(["Admin"]);
  const [token, setToken] = useState<string | null>(() => {
    const storedToken =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token")
        : null;
    return storedToken ? storedToken : null;
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      try {
        const parsedRoles = JSON.parse(storedRoles) as string[]; // Parse the JSON string
        setRoles(parsedRoles);
      } catch (error) {
        console.error("Failed to parse roles from localStorage", error);
        setRoles(null);
      }
    }
  }, []);
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: !!token,
  });

  console.log("Profile in context:", profile);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        roles,
        setRoles,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
