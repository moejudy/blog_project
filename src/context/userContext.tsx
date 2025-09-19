import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error ("userUser must be used within a UserProvider")
  }

  return context;
};
