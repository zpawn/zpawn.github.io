import { Input } from "./Input";
import type { FC } from "react";
import type { InputProps } from "./types";

const InputSearch: FC<InputProps> = (props) => (
  <Input
    leftIcon="magnifying-glass"
    rightIcon="xmark"
    {...props}
  />
);

export { InputSearch };
