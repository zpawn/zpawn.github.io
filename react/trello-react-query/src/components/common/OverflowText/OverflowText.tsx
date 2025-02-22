import { FC, PropsWithChildren } from "react"

const OverflowText: FC<PropsWithChildren> = (props) => (
  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis" {...props}/>
);

export { OverflowText };
