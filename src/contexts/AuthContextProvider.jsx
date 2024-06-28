import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState("");
  const currentPersist = JSON.parse(localStorage.getItem("persist"));
  const [persist, setPersist] = useState(currentPersist || false);

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};
