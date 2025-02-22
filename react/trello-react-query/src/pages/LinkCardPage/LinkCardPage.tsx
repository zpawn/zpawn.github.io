import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { useSetTitle, useAsyncError } from "../../hooks";
import { getFilteredCards } from "../../utils";
import { setLinkedCardsService } from "../../services/local";
import { getOption } from "../../utils";
import { useSearch } from "./hooks";
import { LinkCard } from "../../components";
import type { Board, CardType } from "../../services/trello/types";

const LinkCardPage: FC = () => {
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();
    const [selectedCards, setSelectedCards] = useState<Array<CardType["id"]>>([]);
    const [selectedBoard, setSelectedBoard] = useState<"any"|Board["id"]>(getOption("any"));
    const {
        cards,
        loading,
        searchCard,
        boardOptions,
        organizations,
        onClearSearch,
        onChangeSearch,
    } = useSearch();

    const onChangeSelectedCard = (cardId: CardType["id"]) => {
        let newSelectedCards = [...selectedCards];
        if (selectedCards.includes(cardId)) {
            newSelectedCards = selectedCards.filter((selectedCardId) => selectedCardId !== cardId);
        } else {
            newSelectedCards.push(cardId);
        }
        setSelectedCards(newSelectedCards);
    };

    const onSelectBoard = (option: CardType["id"]) => {
        setSelectedBoard(option);
    };

    const onLinkCard = () => {
      setLinkedCardsService(selectedCards)
        .then(() => navigate(routes.HOME))
        .catch(asyncErrorHandler);
    };

    const onNavigateToCreateCard = useCallback(() => navigate(routes.CREATE_CARD), [navigate]);

    const onNavigateToHome = useCallback(() => navigate(routes.HOME), [navigate]);

    useSetTitle("Link Cards");

    return (
        <LinkCard
            organizations={organizations}
            loading={loading}
            searchCard={searchCard}
            onClearSearch={onClearSearch}
            onChangeSearch={onChangeSearch}
            onNavigateToCreateCard={onNavigateToCreateCard}
            cards={getFilteredCards(cards, { boardId: selectedBoard?.value })}
            selectedBoard={selectedBoard}
            onSelectBoard={onSelectBoard}
            boardOptions={boardOptions}
            selectedCards={selectedCards}
            onLinkCard={onLinkCard}
            onNavigateToHome={onNavigateToHome}
            onChangeSelectedCard={onChangeSelectedCard}
        />
    );
};

export { LinkCardPage };
