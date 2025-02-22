import { size } from "lodash";
import { NoFound, SearchField, CardInfo } from "../common";
import type { FC } from "react";
import type { InputProps } from "../common/Input";
import type { CardType, Organization } from "../../services/trello/types";

type Props = {
  cards: CardType[],
  searchCard: string,
  onChangeSearchCard: InputProps["onChange"],
  onNavigateToViewCard: (cardId: CardType["id"]) => void,
  organizations: Organization[],
};

const Home: FC<Props> = ({
  cards,
  searchCard,
  organizations,
  onChangeSearchCard,
  onNavigateToViewCard,
}) => {
  return (
    <>
      <SearchField
        value={searchCard}
        onChange={onChangeSearchCard}
      />
      {!size(cards)
        ? (<NoFound text="No Trello cards found" />)
        : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {cards.map((card) => (
              <CardInfo
                key={card.id}
                card={card}
                organizations={organizations}
                onTitleClick={() => onNavigateToViewCard(card.id)}
              />
            ))}
          </div>
        )
      }
    </>
  );
};

export { Home };
