import { Icon } from "../Icon";
import { Span } from "../Typography";
import type { FC } from "react";
import type { InputProps } from "./types";

const Input: FC<InputProps> = ({
  name,
  leftIcon,
  rightIcon,
  type = "text",
  placeholder = "Enter value",
  ...props
}) => {
  const iconLeft = leftIcon && <Icon icon={leftIcon} className="text-stone-600/60"/>;
  const iconRight = rightIcon && <Icon icon={rightIcon} className="text-stone-600/60"/>

  return (
    <div className="field w-full relative">
      {iconLeft && <Span className="icon icon-left">{iconLeft}</Span>}
      <input
        id={name}
        name={name}
        type={type}
        className="field-input"
        placeholder={placeholder}
        {...props}
        />
      {iconRight && <Span className="icon icon-right">{iconRight}</Span>}
    </div>
  );
};

export { Input };
