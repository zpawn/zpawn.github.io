import { match } from "ts-pattern";
import type { FC, PropsWithChildren, ComponentProps } from "react";
import type { Size, PropsWithStylish } from "../../../types";

export type TypographyProps = ComponentProps<"p">
  & PropsWithChildren<PropsWithStylish<{
    intent?: "base"|"secondary"|"danger"|"warning"|"info";
    size?: Size;
    mb?: false;
  }>>;

const P: FC<TypographyProps> = ({ intent, className = "", size = "sm", mb = true, ...props }) => {
  const clsSize = match(size)
    .with("xs", () => "text-xs")
    .with("sm", () => "text-sm")
    .with("md", () => "text-base")
    .with("lg", () => "text-lg")
    .with("xl", () => "text-xl")
    .with("2xl", () => "text-2xl")
    .otherwise(() => "text-sm");
  const clsIntent = match(intent)
    .with("secondary", () => "text-secondary")
    .with("danger", () => "text-danger")
    .with("warning", () => "text-warning")
    .with("info", () => "text-info")
    .otherwise(() => "text-base");

  const cls = [
    className,
    (mb ? "mb-2" : "mb-0"),
    clsSize,
    clsIntent,
  ];

  return (
    <p className={cls.join(" ")} {...props}/>
  );
};

export { P };
