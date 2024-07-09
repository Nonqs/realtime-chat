import axios from "axios";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import CONST from "../services/config.d";

interface UserContextType {
  user: string
  updateUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${CONST.API_CONSTANTS.BACKEND_URL}/user`,
          { withCredentials: true }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const updateUser = async () => {
    try {
      const response = await axios.get(
        `${CONST.API_CONSTANTS.BACKEND_URL}/user`,
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
