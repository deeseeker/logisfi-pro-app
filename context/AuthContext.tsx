"use client";
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
}
// coming back to this
const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
  roles: null,
  setRoles: () => {},
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

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        roles,
        setRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };
