import { Icon } from "../Icon";
import type { FC, ComponentProps } from "react";

type TrelloLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

const TrelloLink: FC<TrelloLinkProps> = (props) => {
  return (
    <a className="trello-link" {...props}>
        <Icon className="logo bg-white rounded-xs" size={12} icon="trello"/>
        <Icon className="external-icon" size={14} icon="arrow-top-right-on-square" />
    </a>
  );
};

export { TrelloLink }
