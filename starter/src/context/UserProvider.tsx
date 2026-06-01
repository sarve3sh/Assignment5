import type { ReactNode } from "react";
import { UserContext, useUserState } from "@/context/UserContext";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const value = useUserState();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
