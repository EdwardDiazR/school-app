import React, { useState, createContext, useEffect, useContext } from "react";
import * as _authService from "@/services/authService";

export type AuthContextType = {
  authState: AuthState | null;
};

export interface User {
  id: number;
  userName: string;
  role: UserRoles;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export enum UserRoles {
  Tutor = "Tutor",
  Admin = "Admin",
  Teacher = "Teacher",
}
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    _authService.login({ isBiometric: true, password: "", username: "Adrian" });
    setAuthState({
      isAuthenticated: true,
      user: { id: 1, role: UserRoles.Tutor, userName: "Adrian" },
    });

    console.log(authState?.user);
  }, []);
  return (
    <AuthContext.Provider value={{ authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
