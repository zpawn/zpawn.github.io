import { useCheckIsAuth } from "./hooks";
import { PageLoading } from "../../components/common";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useCheckIsAuth();

  return (
    <PageLoading/>
  );
};

export { LoadingAppPage };
