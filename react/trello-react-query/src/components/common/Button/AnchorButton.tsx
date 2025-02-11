// import { appearance } from "./styles";
import type { FC, ComponentProps } from "react";
import type { ButtonCommonProps } from "./types";

type AnchorButtonProps =
  & ComponentProps<"a">
  & ButtonCommonProps & {
    disabled?: boolean,
  };

export const AnchorButton: FC<AnchorButtonProps> = ({
  text,
  href = "#",
  intent = "primary",
  disabled = false,
  loading = false,
  ...props
}) => {
  // const cls = {
  //   common: [
  //     ...appearance.common,
  //     ...(disabled ? ["cursor-not-allowed"] : ["cursor-pointer"]),
  //   ],
  //   primary: [
  //     ...appearance.primary,
  //     ...(disabled ? ["bg-stone-700"] : ["bg-stone-800"]),
  //   ],
  //   secondary: [
  //     ...appearance.secondary,
  //     ...(disabled ? ["bg-stone-200"] : ["bg-transparent"]),
  //   ],
  //   minimal: [
  //     ...appearance.minimal,
  //   ],
  // };

  // const classes = [
  //   ...cls.common,
  //   ...cls[intent],
  // ];

  return (
    <a
      className={`btn btn-${intent} ${(disabled || loading) ? "disabled" : ""}`}
      {...((disabled || loading) ? {} : { href })}
      {...props}
    >
      {!loading ? text : "Loading..."}
    </a>
  );
};
