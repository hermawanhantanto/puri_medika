import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

interface IUser {
  email: string;
  token: string;
  role: string;
}

interface IContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<null | IUser>>;
}

const INITIAL_STATE = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    if (userLogin) {
      setUser(JSON.parse(userLogin));
    }
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
