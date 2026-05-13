import { useState, createContext } from "react";

export const AuthContext = createContext();

const AuthContextComp = ({ children }) => {
  let [user, setuser] = useState(1);
  return (
    <>
      <AuthContext.Provider value={{ user, setuser }}>
        {children}
      </AuthContext.Provider>{" "}
    </>
  );
};

export default AuthContextComp;
