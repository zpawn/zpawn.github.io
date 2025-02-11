import type { FC, ComponentProps } from "react";
import type { ButtonCommonProps } from "./types";

type AnchorButtonProps =
  & ComponentProps<"a">
  & ButtonCommonProps & {
    disabled?: boolean;
  };

export const AnchorButton: FC<AnchorButtonProps> = ({
  text,
  href = "#",
  intent = "primary",
  loading,
  disabled,
  active,
  ...props
}) => {
  const cls = [
    "btn",
    `btn-${intent}`,
    ((disabled || loading) ? "disabled" : ""),
    (active ? "active" : ""),
  ];
  return (
    <a
      className={cls.join(" ")}
      {...((disabled || loading) ? {} : { href })}
      {...props}
    >
      {!loading ? text : "Loading..."}
    </a>
  );
};
