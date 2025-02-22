import type { FC, PropsWithChildren } from "react";
import type { PropsWithStylish } from "../../../types";

type ContainerProps = PropsWithChildren<PropsWithStylish>;

const AppContainer: FC<ContainerProps> = ({ className = "", ...props }) => (
  <div
    className={`max-w-7xl mx-auto min-h-8 p-4 ${className}`}
    {...props}
  />
);

export { AppContainer };
