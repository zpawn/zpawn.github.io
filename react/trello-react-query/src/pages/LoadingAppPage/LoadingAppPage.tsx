import { useCheckIsAuth } from "./hooks";
import { LoadingSpinner } from "../../components/common";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useCheckIsAuth();

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
