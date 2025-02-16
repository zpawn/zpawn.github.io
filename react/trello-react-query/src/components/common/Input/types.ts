import type { IconProps } from "../Icon";
import type { ChangeEvent, ComponentProps } from "react";

export type Event = ChangeEvent<HTMLInputElement>;

export type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: boolean;
  leftIcon?: IconProps["icon"];
  rightIcon?: IconProps["icon"];
  onChange: (e: Event) => void|Event|Event["target"]["value"];
};
