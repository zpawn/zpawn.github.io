import { FC, ComponentProps } from "react";

const Link: FC<ComponentProps<"a">> = ({ className, target = "_blank", ...props }) => (
  <a
    target={target}
    className={`${className ? className : ""} text-blue-500 no-underline hover:underline`}
    {...props}
  />
);

export { Link };
