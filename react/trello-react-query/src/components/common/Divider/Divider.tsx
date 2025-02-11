import type { FC } from "react";
import type { PropsWithStylish } from "../../../types";

const Divider: FC<PropsWithStylish> = ({ style, className }) => (
  <hr className={`border-stone-200 ${className}`} style={style} />
);

export { Divider };
