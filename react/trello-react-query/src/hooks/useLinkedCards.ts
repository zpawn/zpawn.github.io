import { size } from "lodash";
import { useQuery, useQueries } from "@tanstack/react-query";
import { getLinkedCardsService } from "../services/local";
import { getCardService } from "../services/trello";
import { QueryKey } from "../query";
import type { CardType } from "../services/trello/types";

type UseLinkedCards = () => {
  isLoading: boolean;
  cards: CardType[];
};

const useLinkedCards: UseLinkedCards = () => {
  const linkedIds = useQuery({
    queryKey: [QueryKey.LINKED_CARDS],
    queryFn: getLinkedCardsService,
  });

  const cards = useQueries({
    queries: (linkedIds?.data || []).map((cardId) => ({
      queryKey: [QueryKey.CARD, cardId],
      queryFn: () => getCardService(cardId),
      enabled: Boolean(size(linkedIds)),
      useErrorBoundary: false,
    })),
  });

  return {
    isLoading: [linkedIds, ...cards].some(({ isLoading }) => isLoading),
    cards: (cards.map(({ data }) => data).filter(Boolean) as CardType[]) || [],
  };
};

export { useLinkedCards };
