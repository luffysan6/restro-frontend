import { useEffect } from "react";
import authStore from "../store/authStore";

const Protector = ({ children }) => {
  const { isAuth, checkAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isAuth) {
    return <>{children}</>;
  }
  return window.location.replace("/");
};

export default Protector;
