import { Icons } from "./icons";
import type { FC } from "react";

export type IconProps = {
  icon: keyof typeof Icons;
};

const Icon: FC<IconProps> = ({ icon, ...props }) => {
  const IconComponent = Icons[icon];

  if (!IconComponent) {
    return (
      <>{icon}</>
    );
  }

  return (
    <IconComponent className="w-[20px] h-[20px]" {...props}/>
  );
};

export { Icon };
