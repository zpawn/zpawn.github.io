import { Property } from "./Property";
import { PropertyRow } from "./PropertyRow";
import type { FC } from "react";
import type { PropertyProps } from "./Property";

export type Props = {
  marginBottom?: number,
  leftLabel?: PropertyProps["label"],
  leftText?: PropertyProps["text"],
  rightLabel?: PropertyProps["label"],
  rightText?: PropertyProps["text"],
};

const TwoProperties: FC<Props> = ({
  leftLabel,
  leftText,
  rightLabel,
  rightText,
  marginBottom = 10,
}) => (
  <PropertyRow marginBottom={marginBottom}>
    <Property
      marginBottom={0}
      label={leftLabel}
      text={leftText}
    />
    <Property
      marginBottom={0}
      label={rightLabel}
      text={rightText}
    />
  </PropertyRow>
);

export { TwoProperties };
