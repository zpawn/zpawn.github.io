import { Input } from "../Input";
import { Label } from "../Label";
import type { FC } from "react";
import type { InputProps } from "../Input";
import type { LabelProps } from "../Label";

export type TextFieldProps =
  & InputProps
  & Pick<LabelProps, "label"|"required">;

const TextField: FC<TextFieldProps> = ({ name, label, required, ...props }) => {
  return (
    <Label className="mb-4" htmlFor={name} label={label} required={required}>
      <Input name={name} {...props} />
    </Label>
  );
};

export { TextField };
