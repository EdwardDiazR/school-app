import React, { useState, createContext } from "react";

export interface LoggedUser {
  id: number;
  userName: string;
}
export type AuthContextType = {
  user: LoggedUser;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoggedUser>({ id: 1, userName: "Edward" });
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default { AuthProvider, AuthContext };
