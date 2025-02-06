import { TRELLO_ENTITY } from "../../constants";
import { getLinkedCardsService } from "./getLinkedCardsService";

const setLinkedCardsService = async (cardIds: string[]): Promise<void> => {
  const linkedCards = await getLinkedCardsService();
  const newCards = [...linkedCards];

  cardIds.forEach((cardId) => {
    if (!newCards.includes(cardId)) {
      newCards.push(cardId);
    }
  });

  localStorage.setItem(TRELLO_ENTITY, JSON.stringify(newCards));

  return Promise.resolve();
};

export { setLinkedCardsService };
