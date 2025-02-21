import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetTitle, useSetBadgeCount, useLinkedCards } from "../../hooks";
import { useHomeDeps } from "./hooks";
import { getFilteredCards } from "../../utils";
import { Home } from "../../components";
import { Spinner } from "../../components/common";
import type { FC, ChangeEventHandler } from "react";
import type { CardType } from "../../services/trello/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [searchCard, setSearchCard] = useState<string>("");
  const { cards, isLoading } = useLinkedCards();
  const { organizations } = useHomeDeps()

  const onChangeSearchCard: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSearchCard(e.target.value);
  }, []);

  useSetTitle("Trello Cards");

  useSetBadgeCount(cards);

  const onNavigateToViewCard = useCallback((cardId: CardType["id"]) => {
    navigate(`/view_card/${cardId}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <Spinner size="md"/>
    );
  }

  return (
    <Home
      searchCard={searchCard}
      organizations={organizations}
      onChangeSearchCard={onChangeSearchCard}
      onNavigateToViewCard={onNavigateToViewCard}
      cards={getFilteredCards(cards, { query: searchCard })}
    />
  );
};

export { HomePage };
