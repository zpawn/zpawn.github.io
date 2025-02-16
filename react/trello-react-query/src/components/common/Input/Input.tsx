import { useCallback } from "react";
import { match } from "ts-pattern";
import { Icon } from "../Icon";
import { Span } from "../Typography";
import type { FC } from "react";
import type { Event, InputProps } from "./types";

const Input: FC<InputProps> = ({
  label,
  onChange,
  leftIcon,
  rightIcon,
  type = "text",
  placeholder = "Enter value",
  ...props
}) => {
  const iconLeft = leftIcon && <Icon icon={leftIcon}/>
  const iconRight = rightIcon && <Icon icon={rightIcon}/>

  const handleChange: InputProps["onChange"] = useCallback((e: Event) => {
    if (!onChange) {
      return;
    }

    const value = match(type)
      .with("input", () => e.target.value)
      .otherwise(e);

    onChange(value);
  }, [type, onChange]);

  return (
    <label className="field">
      {label && <Span>{label}</Span>}
      <div className="w-full relative">
        {iconLeft && <Span className="icon icon-left">{iconLeft}</Span>}
        <input
          type={type}
          className="field-input"
          placeholder={placeholder}
          onChange={handleChange}
          {...props}
          />
        {iconRight && <Span className="icon icon-right">{iconRight}</Span>}
      </div>
    </label>
  );
};

export { Input };
