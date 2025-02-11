import type { PropsWithStylish } from "../../../types";
import type { FC,PropsWithChildren } from "react";

type CardProps = PropsWithChildren<PropsWithStylish>;

type CardMediaProps = PropsWithChildren<PropsWithStylish<{ size?: number }>>;

type CardBodyProps = PropsWithChildren<PropsWithStylish<{ offset?: number }>>;

const CardBase: FC<CardProps> = ({ style, className = "", ...props }) => (
  <div
    className={`flex flex-nowrap justify-between w-full ${className}`}
    style={style}
    {...props}
  />
);

const CardMedia: FC<CardMediaProps> = ({ size = 14, style, ...props }) => (
  <div
    style={{ width: `${size}px`, ...style }}
    {...props}
  />
);

const CardBody: FC<CardBodyProps> = ({ className = "", ...props }) => (
  <div
    className={`flex-1 ${className}`}
    {...props}
  />
);

type CardType = typeof CardBase & {
  Media: typeof CardMedia;
  Body: typeof CardBody;
};

const Card: CardType = Object.assign(CardBase, {
  Media: CardMedia,
  Body: CardBody,
});

export { Card };
