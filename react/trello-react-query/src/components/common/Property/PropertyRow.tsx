import { match } from "ts-pattern";
import type { FC, PropsWithChildren } from "react";
import type { PropsWithStylish } from "../../../types";

export type PropertyProps = PropsWithStylish<PropsWithChildren>;

type RowProps = PropertyProps & {
  count: number,
  mb?: boolean;
};

const Row: FC<RowProps> = ({ mb, count, ...props }) => {
  const clsGrid = match(count)
    .with(2, () => "grid-cols-2")
    .with(3, () => "grid-cols-3")
    .with(4, () => "grid-cols-4")
    .with(5, () => "grid-cols-5")
    .with(6, () => "grid-cols-6")
    .otherwise(() => "auto-cols-auto");

  const cls = [
    "grid",
    "w-full",
    (mb ? "mb-2" : "mb-0"),
    clsGrid,
  ];
  return (
    <div
      className={cls.join(" ")}
      {...props}
    />
  );
};

const ItemContainer: FC<PropertyProps> = (props) => (
  <div
    className="px-2 first:pl-0 last:pr-0 not-first:border-l not-first:border-l-stone-200"
    {...props}
  />
);

const Item: FC<PropertyProps> = (props) => (
  <div
    className="overflow-hidden whitespace-pre-wrap overflow-ellipsis break-words"
    {...props}
  />
);

export const PropertyRow: FC<PropertyProps & { mb?: boolean }> = ({
  style,
  children,
  mb = true,
}) => {
  const filteredChildren = !Array.isArray(children) ? children : children.filter(Boolean);

  return (!Array.isArray(filteredChildren))
    ? (<div style={style}>{filteredChildren}</div>)
    : (
      <Row count={filteredChildren.length} mb={mb} style={style}>
        {filteredChildren.map((child, idx) => (
          <ItemContainer key={idx}>
            <Item>{child}</Item>
          </ItemContainer>
        ))}
      </Row>
    );
};
