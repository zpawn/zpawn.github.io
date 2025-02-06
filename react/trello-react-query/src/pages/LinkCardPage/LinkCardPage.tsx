import { FC, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    useSetTitle,
    useAsyncError,
} from "../../hooks";
import { getFilteredCards } from "../../utils";
import { setLinkedCardsService } from "../../services/local";
import { getOption } from "../../utils";
import { useSearch } from "./hooks";
import { LinkCard } from "../../components";
import type { Option } from "../../types";
import type { Board, CardType } from "../../services/trello/types";

const LinkCardPage: FC = () => {
    const navigate = useNavigate();
    const { asyncErrorHandler } = useAsyncError();
    const [selectedCards, setSelectedCards] = useState<Array<CardType["id"]>>([]);
    const [selectedBoard, setSelectedBoard] = useState<Option<"any"|Board["id"]>>(getOption("any", "Any"));
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

    const onSelectBoard = (option: Option<CardType["id"]>) => {
        setSelectedBoard(option);
    };

    const onLinkCard = () => {
      setLinkedCardsService(selectedCards)
        .then(() => navigate("/home"))
        .catch(asyncErrorHandler);
    };

    const onNavigateToCreateCard = useCallback(() => navigate("/create_card"), [navigate]);

    const onNavigateToHome = useCallback(() => navigate("/home"), [navigate]);

    useSetTitle("Link Cards");

    // useDeskproElements(({ clearElements, registerElement }) => {
    //     clearElements();
    //     registerElement("trelloRefreshButton", { type: "refresh_button" });
    //     registerElement("trelloHomeButton", {
    //         type: "home_button",
    //         payload: { type: "changePage", path: "/home" }
    //     });
    //     registerElement("trelloMenu", {
    //         type: "menu",
    //         items: [{
    //             title: "Log Out",
    //             payload: {
    //                 type: "logout",
    //             },
    //         }],
    //     });
    // });

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
