import type { FC } from "react";
import type { PropsWithStylish } from "../../../types";

const Divider: FC<PropsWithStylish> = ({ className, ...props }) => (
  <hr
    className={`border-stone-200 ${className ? className : ""}`}
    {...props}
  />
);

export { Divider };
