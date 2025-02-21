import { Fragment } from "react";
import { size } from "lodash";
import { NoFound, Container, Divider, SearchField, CardInfo } from "../common";
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
    <Container>
      <SearchField
        value={searchCard}
        onChange={onChangeSearchCard}
      />
      <Divider className="mb-4"/>
      {!size(cards)
        ? (<NoFound text="No Trello cards found" />)
        : cards.map((card) => (
          <Fragment key={card.id}>
            <CardInfo
              card={card}
              organizations={organizations}
              onTitleClick={() => onNavigateToViewCard(card.id)}
            />
            <Divider style={{ marginBottom: 9 }}/>
          </Fragment>
        ))
      }
    </Container>
  );
};

export { Home };
