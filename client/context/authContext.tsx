"use client";

import useUser from "@/hooks/useUser";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  children: React.ReactNode;
};

type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext) as AuthContextType;
};

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<UserType | null>(null);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
