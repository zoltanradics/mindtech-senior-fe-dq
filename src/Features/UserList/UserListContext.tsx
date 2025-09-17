import { createContext, useContext, useEffect, useState } from "react";

import type { User, UserDto } from "./User";

// Define type for UserListContext
interface UserListContextInterface {
  users: UserDto[];
  loading: boolean;
  error: boolean;
  getUsers: () => User[];
  fetchUsers: () => Promise<void>;
};

// Create the context
const UserListContext = createContext<UserListContextInterface | null>(null);

// Define a provider to handle fetching users
export function UserListProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  
  async function fetchUsers() {    
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (response.ok) {
        const userData: UserDto[] = await response.json();
        setUsers(userData);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error: unknown) {
      setError(true);

      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
     fetchUsers();
  }, []);

  function getUsers(): User[] {
    return users.map(user => ({
      name: user.name,
      email: user.email,
      username: user.username,
      company: user.company.name
    }));
  }

  return (<UserListContext.Provider value={{ users, loading, error, getUsers, fetchUsers }}>{children}</UserListContext.Provider>)
}

// Export custom context
export function useUserList() {
  const ctx = useContext(UserListContext);

  if (!ctx) {
    throw new Error("useUser must be used within <UserListProvider>");
  }

  return ctx;
}