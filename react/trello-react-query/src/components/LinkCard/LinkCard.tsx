import { noop } from "lodash";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@deskpro/deskpro-ui";
import {
  Cards,
  Button,
  Container,
  InputSearch,
  SingleSelect,
  LoadingSpinner,
  TwoButtonGroup,
  HorizontalDivider,
} from "../common";
import type { FC, ChangeEvent } from "react";
import type { Option } from "../../types";
import type {
    Board,
    CardType,
    Organization,
} from "../../services/trello/types";

type Props = {
    searchCard: string,
    onClearSearch: () => void,
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void,
    onNavigateToCreateCard: () => void,
    cards: CardType[],
    selectedBoard: Option<"any"|Board["id"]>,
    onSelectBoard: (o: Option<"any"|Board["id"]>) => void,
    boardOptions: Record<"any"|Board["id"], Option>,
    onNavigateToHome: () => void,
    selectedCards: Array<CardType["id"]>,
    onLinkCard: () => void,
    onChangeSelectedCard: (cardId: CardType["id"]) => void,
    loading: boolean,
    organizations: Organization[],
};

const LinkCard: FC<Props> = ({
    cards,
    searchCard,
    onClearSearch,
    onChangeSearch,
    onNavigateToCreateCard,
    selectedBoard,
    onSelectBoard,
    boardOptions,
    onNavigateToHome,
    selectedCards,
    onLinkCard,
    onChangeSelectedCard,
    loading,
    organizations,
}) => {
    return (
        <Container>
            <TwoButtonGroup
                selected="one"
                oneIcon={faSearch}
                oneLabel="Find Card"
                oneOnClick={noop}
                twoIcon={faPlus}
                twoLabel="Create Card"
                twoOnClick={onNavigateToCreateCard}
            />
            <InputSearch
                value={searchCard}
                onClear={onClearSearch}
                onChange={onChangeSearch}
            />

            {(cards && cards.length > 0) && (
                <SingleSelect
                    label="Board"
                    value={selectedBoard}
                    onChange={onSelectBoard}
                    options={Object.values(boardOptions)}
                />
            )}

            <Stack justify="space-between" style={{ paddingBottom: "4px" }}>
                <Button
                    disabled={selectedCards.length === 0}
                    text="Link Cards"
                    onClick={onLinkCard}
                />
                <Button
                    text="Cancel"
                    onClick={onNavigateToHome}
                    intent="secondary"
                />
            </Stack>

            <HorizontalDivider style={{ marginBottom: "10px" }} />

            {loading
                ? (<LoadingSpinner/>)
                : (
                    <Cards
                        cards={cards}
                        organizations={organizations}
                        selectedCards={selectedCards}
                        onChange={onChangeSelectedCard}
                    />
                )}
        </Container>
    );
};

export { LinkCard };
