import { routes } from "../../constants";
import {
  Cards,
  Button,
  Divider,
  SearchField,
  PageLoading,
  // SingleSelect,
  TwoButtonGroup,
} from "../common";
import type { FC, ChangeEvent } from "react";
import type {
  Board,
  CardType,
  Organization,
} from "../../services/trello/types";

type Props = {
  searchCard: string,
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void,
  onNavigateToCreateCard: () => void,
  cards: CardType[],
  selectedBoard: [], // Option<"any"|Board["id"]>,
  onSelectBoard: (o: string/*Option<"any"|Board["id"]>*/) => void,
  boardOptions: Record<"any" | Board["id"], string/*Option*/>,
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
  onChangeSearch,
  // onNavigateToCreateCard,
  // selectedBoard,
  // onSelectBoard,
  // boardOptions,
  onNavigateToHome,
  selectedCards,
  onLinkCard,
  onChangeSelectedCard,
  loading,
  organizations,
}) => {
  return (
    <>
      <TwoButtonGroup
        oneTitle="Find Card"
        onePath={routes.LINK_CARD}
        twoTitle="Create Card"
        twoPath={routes.CREATE_CARD}
      />
      <SearchField
        value={searchCard}
        onChange={onChangeSearch}
      />

      {/* {(cards && cards.length > 0) && (
        <SingleSelect
            label="Board"
            value={selectedBoard}
            onChange={onSelectBoard}
            options={Object.values(boardOptions)}
        />
      )} */}

      <div className="flex justify-between">
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
      </div>

      <Divider style={{ marginBottom: "10px" }} />

      {loading
        ? (<PageLoading />)
        : (
          <Cards
            cards={cards}
            organizations={organizations}
            selectedCards={selectedCards}
            onChange={onChangeSelectedCard}
          />
        )}
    </>
  );
};

export { LinkCard };
