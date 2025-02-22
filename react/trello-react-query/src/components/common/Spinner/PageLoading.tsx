import { Spinner } from "./Spinner";
import type { FC } from "react";

const PageLoading: FC = () => (
  <div className="h-30 w-full flex items-center justify-center">
    <Spinner size="md"/>
  </div>
);

export { PageLoading };
