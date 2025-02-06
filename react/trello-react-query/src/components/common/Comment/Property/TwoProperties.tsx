import { Property } from "./Property";
import { PropertyRow } from "./PropertyRow";
import type { FC } from "react";
import type { PropertyProps } from "./Property";

export type Props = {
  marginBottom?: number,
  leftLabel?: PropertyProps["label"],
  leftText?: PropertyProps["text"],
  leftCopyText?: PropertyProps["copyText"],
  rightLabel?: PropertyProps["label"],
  rightText?: PropertyProps["text"],
  rightCopyText?: PropertyProps["copyText"],
};

const TwoProperties: FC<Props> = ({
  leftLabel,
  leftText,
  leftCopyText,
  rightLabel,
  rightText,
  rightCopyText,
  marginBottom = 10,
}) => (
  <PropertyRow marginBottom={marginBottom}>
    <Property
      marginBottom={0}
      label={leftLabel}
      text={leftText}
      copyText={leftCopyText}
    />
    <Property
      marginBottom={0}
      label={rightLabel}
      text={rightText}
      copyText={rightCopyText}
    />
  </PropertyRow>
);

export { TwoProperties };
