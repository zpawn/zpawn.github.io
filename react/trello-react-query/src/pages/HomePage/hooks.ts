import { useQuery } from "@tanstack/react-query";
import { useLinkedCards } from "../../hooks";
import { getOrganizationsService } from "../../services/trello";
import { QueryKey } from "../../query";
import { getFilteredCards } from "../../utils";
import type { CardType, Organization } from "../../services/trello/types";

type UseHomeDeps = (q: string) => {
  isLoading: boolean,
  cards: CardType[],
  organizations: Organization[],
};

const useHome: UseHomeDeps = (searchQuery) => {
  const cards = useLinkedCards();

  const organizations = useQuery({
    queryKey: [QueryKey.ORGANIZATIONS],
    queryFn: getOrganizationsService,
  });

  return {
    isLoading: [cards, organizations].some(({ isLoading }) => isLoading),
    cards: getFilteredCards(cards.cards, { query: searchQuery }),
    organizations: organizations.data || [],
  };
};

export { useHome };
