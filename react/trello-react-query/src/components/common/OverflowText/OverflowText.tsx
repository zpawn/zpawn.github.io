import { FC, PropsWithChildren } from "react"

const OverflowText: FC<PropsWithChildren> = () => (
  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis"/>
);

export { OverflowText };
