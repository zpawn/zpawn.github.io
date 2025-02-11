import type { FC, ComponentProps } from "react";
import type { ButtonCommonProps } from "./types";

type ButtonProps =
  & ComponentProps<"button">
  & ButtonCommonProps;

const Button: FC<ButtonProps> = ({
  text,
  type = "button",
  intent = "primary",
  disabled = false,
  loading = false,
  ...props
}) => {
  return (
    <>
      <button
        className={`btn btn-${intent}`}
        type={type}
        disabled={disabled || loading}
        {...props}
        >
        {!loading ? text : "Loading..."}
      </button>
    </>
  );
};

export { Button };
