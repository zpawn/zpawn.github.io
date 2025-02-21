import { TextField } from "./TextField";
import type { FC } from "react";
import type { TextFieldProps } from "./TextField";

const SearchField: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      name="search"
      leftIcon="magnifying-glass"
      rightIcon="xmark"
      {...props}
    />
  );
};

export { SearchField };
