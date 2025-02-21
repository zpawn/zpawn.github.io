import { TrelloLink } from "../TrelloLink";
import type { FC, ReactNode } from "react";

type Props = {
  title: string|ReactNode;
  onClick?: () => void;
  externalLink?: string;
  mb?: boolean;
};

const Title: FC<Props> = ({
  title,
  onClick,
  externalLink,
  mb = true,
}) => (
  <div className={`flex items-start flex-nowrap gap-2 ${mb ? "mb-2" : "mb-0"}`}>
    <h1 onClick={onClick} className="grow">{title}</h1>
    {externalLink && <TrelloLink href={externalLink} />}
  </div>
);

export { Title };
