import type { FC, PropsWithChildren } from "react";
import type { PropsWithStylish } from "../../../types";

type ContainerProps = PropsWithChildren<PropsWithStylish>;

const Container: FC<ContainerProps> = ({ children, style, className }) => (
  <div
    className={`m-2 min-h-8 ${className ? className : ""}`}
    style={style}
  >
    {children}
  </div>
);

export { Container };
