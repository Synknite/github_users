import React, { createContext, useState } from "react";
import { User } from "../lib/types";

interface UserContextProps {
  users: User[];
  addUsers: (user: User | User[]) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUsers = (user: User | User[]) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      ...(Array.isArray(user) ? user : [user]),
    ]);
  };

  const value = React.useMemo(() => ({ users, addUsers }), [users]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
