import { Icon } from "../Icon";
import { Span } from "../Typography";
import type { FC, ComponentProps } from "react";
import type { IconSize } from "../../../types";

type LinkIconProps = ComponentProps<"a"> & {
  size?: IconSize;
};

const LinkIcon: FC<LinkIconProps> = ({ size = 16, target = "_blank", ...props }) => (
  <a target={target} {...props}>
    <Span intent="secondary">
      <Icon size={size} icon="arrow-top-right-on-square" />
    </Span>
  </a>
);

export { LinkIcon };
