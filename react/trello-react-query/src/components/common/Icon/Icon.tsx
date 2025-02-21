import { Icons } from "./icons";
import type { FC } from "react";
import type { PropsWithStylish } from "../../../types";

export type IconProps = PropsWithStylish<{
  icon: keyof typeof Icons;
  size?: number;
}>;

const Icon: FC<IconProps> = ({ icon, size = 20, className = "", ...props }) => {
  const IconComponent = Icons[icon];

  if (!IconComponent) {
    return (
      <>{icon}</>
    );
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={`inline-block ${className}`}
      {...props}
    />
  );
};

export { Icon };
