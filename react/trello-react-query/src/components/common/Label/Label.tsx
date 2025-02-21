import { Span } from "../Typography";
import type { FC, PropsWithChildren, ComponentProps } from "react";
import type { PropsWithStylish } from "../../../types";

export type LabelProps = ComponentProps<"label"> & PropsWithChildren<PropsWithStylish<{
  label?: string;
  required?: boolean;
}>>;

const Label: FC<LabelProps> = ({ label, children, required, ...props }) => {
  return (
    <label {...props}>
      <div>
        {label && (<Span>{label}</Span>)}
        {required && (<Span intent="danger">*</Span>)}
      </div>
      {children}
    </label>
  );
};

export { Label };
