import type { FC } from "react";
import type { TypographyProps } from "./types";

const Span: FC<TypographyProps> = (props) => (
  <span className="text-sm text-stone-800" {...props}/>
);

export { Span };
