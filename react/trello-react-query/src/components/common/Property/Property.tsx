import { isValidElement } from "react";
import { P } from "../Typography";
import type { FC, ReactNode } from "react";

export interface PropertyProps {
  label?: ReactNode,
  text?: ReactNode,
  mb?: boolean,
}

const Property: FC<PropertyProps> = ({ text, label, mb = true }: PropertyProps) => {
  const cls = [(mb ? "mb-2" : "mb-0")];
  let textBlock;

  if ((typeof text === "string" && Boolean(text)) || typeof text === "number") {
    textBlock = (<P mb={false}>{text}</P>);
  } else if (isValidElement(text)) {
    textBlock = text;
  }

  return (
    <div className={cls.join(" ")}>
      {label && <P mb={false} size="xs" intent="secondary">{label}</P>}
      {textBlock ? textBlock : (<P mb={false}>-</P>)}
    </div>
  );
};

export { Property };
