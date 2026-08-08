'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  membershipStatus?: string;
};

type UserAuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const UserAuthContext = createContext<UserAuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      console.error('Failed to logout', err);
    }
  };

  return (
    <UserAuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export const useUserAuth = () => useContext(UserAuthContext);
