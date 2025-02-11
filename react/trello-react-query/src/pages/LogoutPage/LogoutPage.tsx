import { useEffect } from "react";
import { useLogout } from "../../hooks";
import { Logout } from "../../components";
import type { FC } from "react";

const LogoutPage: FC = () => {
  const { logout } = useLogout();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Logout/>
  );
};

export { LogoutPage };
