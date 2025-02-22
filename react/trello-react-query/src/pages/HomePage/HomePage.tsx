import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import { useSetTitle, useSetBadgeCount } from "../../hooks";
import { useHome } from "./hooks";
import { Home } from "../../components";
import { PageLoading } from "../../components/common";
import type { FC, ChangeEvent } from "react";
import type { CardType } from "../../services/trello/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [searchCard, setSearchCard] = useState<string>("");
  const { cards, organizations, isLoading } = useHome(searchCard);

  const onChangeSearchCard = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCard(e.target.value);
  };

  useSetTitle("Trello Cards");

  useSetBadgeCount(cards);

  const onNavigateToViewCard = useCallback((cardId: CardType["id"]) => {
    navigate(`${routes.CARD}/${cardId}`);
  }, [navigate]);

  if (isLoading) {
    return (
      <PageLoading/>
    );
  }

  return (
    <Home
      cards={cards}
      searchCard={searchCard}
      organizations={organizations}
      onChangeSearchCard={onChangeSearchCard}
      onNavigateToViewCard={onNavigateToViewCard}
    />
  );
};

export { HomePage };
