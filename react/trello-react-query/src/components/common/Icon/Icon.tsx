import { Icons } from "./icons";
import type { FC } from "react";

type IconProps = {
  icon: string;
};

const Icon: FC<IconProps> = ({ icon, ...props }) => {
  const IconComponent = Icons[icon];

  if (!IconComponent) {
    return (
      <>{icon}</>
    );
  }

  return (
    <IconComponent {...props}/>
  );
};

export { Icon };
