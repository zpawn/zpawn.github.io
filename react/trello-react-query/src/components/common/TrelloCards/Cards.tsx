import { FC } from "react";
import { NoFound } from "../NoFound";
import { CardInfo } from "./CardInfo";
import type { CardType, Organization } from "../../../services/trello/types";

type Props = {
  cards: CardType[],
  organizations: Organization[],
};

const Cards: FC<Props> = ({ cards, organizations }) => {
  if (!Array.isArray(cards)) {
    return (<NoFound />);
  }

  if (cards.length === 0) {
    return (<NoFound text="No Trello cards found" />);
  }

  return (
    <>
      {cards.map((card) => (
        <CardInfo
          key={card.id}
          card={card}
          organizations={organizations}
        />
      ))}
    </>
  );
}

export { Cards };
