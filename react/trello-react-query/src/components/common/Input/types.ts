import type { IconProps } from "../Icon";
import type { ChangeEvent, ComponentProps } from "react";

export type Event = ChangeEvent<HTMLInputElement>;

export type InputProps = ComponentProps<"input"> & {
  error?: boolean;
  leftIcon?: IconProps["icon"];
  rightIcon?: IconProps["icon"];
};
