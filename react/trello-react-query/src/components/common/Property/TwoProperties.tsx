import { Property } from "./Property";
import { PropertyRow } from "./PropertyRow";
import type { FC } from "react";
import type { PropertyProps } from "./Property";

export type Props = {
  mb?: boolean;
  leftLabel?: PropertyProps["label"];
  leftText?: PropertyProps["text"];
  rightLabel?: PropertyProps["label"];
  rightText?: PropertyProps["text"];
};

const TwoProperties: FC<Props> = ({
  leftLabel,
  leftText,
  rightLabel,
  rightText,
  mb = true,
}) => (
  <PropertyRow mb={mb}>
    <Property
      mb={false}
      label={leftLabel}
      text={leftText}
    />
    <Property
      mb={false}
      label={rightLabel}
      text={rightText}
    />
  </PropertyRow>
);

export { TwoProperties };
