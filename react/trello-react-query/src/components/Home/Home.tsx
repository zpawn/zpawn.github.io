import { Fragment } from "react";
import size from "lodash/size";
import { CardInfo, NoFound, InputSearch, Container, Divider } from "../common";
import type { FC } from "react";
import type { Props as SearchProps } from "../common/InputSearch";
import type { CardType, Organization } from "../../services/trello/types";

type Props = {
    cards: CardType[],
    searchCard: string,
    onChangeSearchCard: SearchProps["onChange"],
    onClearSearchCard: () => void,
    onNavigateToViewCard: (cardId: CardType["id"]) => void,
    organizations: Organization[],
};

const Home: FC<Props> = ({
    cards,
    searchCard,
    organizations,
    onClearSearchCard,
    onChangeSearchCard,
    onNavigateToViewCard,
}) => {
    return (
        <Container>
            <InputSearch
                value={searchCard}
                onClear={onClearSearchCard}
                onChange={onChangeSearchCard}
            />
            <Divider style={{ marginBottom: "9px" }}/>
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
