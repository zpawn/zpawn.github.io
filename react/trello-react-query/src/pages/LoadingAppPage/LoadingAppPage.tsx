import { useCheckIsAuth } from "./hooks";
import { Spinner } from "../../components/common";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useCheckIsAuth();

  return (
    <Spinner/>
  );
};

export { LoadingAppPage };
