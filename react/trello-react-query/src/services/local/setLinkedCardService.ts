import { TRELLO_ENTITY } from "../../constants";
import { getLinkedCardsService } from "./getLinkedCardsService";

const setLinkedCardService = async (cardId: string): Promise<void> => {
  const linkedCards = await getLinkedCardsService();

  if (!linkedCards.includes(cardId)) {
    linkedCards.push(cardId);
  }

  localStorage.setItem(TRELLO_ENTITY, JSON.stringify(linkedCards));

  return Promise.resolve();
};

export { setLinkedCardService };
