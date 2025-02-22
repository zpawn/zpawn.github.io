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
}) => {
  const titleCls = [
    "grow",
    ...(onClick ? ["cursor-pointer", "hover:underline"] : [""]),
  ];

  return (
    <div className={`flex items-start flex-nowrap gap-2 ${mb ? "mb-2" : "mb-0"}`}>
      <h1 onClick={onClick} className={titleCls.join(" ")}>{title}</h1>
      {externalLink && <TrelloLink href={externalLink} />}
    </div>
  );
};

export { Title };
