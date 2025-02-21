import { match } from "ts-pattern";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { PropsWithStylish } from "../../../types";

export type TypographyProps = ComponentProps<"span">
  & PropsWithChildren<PropsWithStylish<{
    intent?: "base"|"secondary"|"danger"|"warning"|"info"
  }>>;

const Span: FC<TypographyProps> = ({ intent, className, ...props }) => {
  const clsIntent = match(intent)
      .with("secondary", () => "text-secondary")
      .with("danger", () => "text-red-500")
      .with("warning", () => "text-amber-500")
      .with("info", () => "text-blue-500")
      .otherwise(() => "text-stone-800");

  const cls = [
    className,
    "text-sm",
    clsIntent,
  ];

  return (
    <span className={cls.join(" ")} {...props}/>
  );
};

export { Span };
