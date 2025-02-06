import { TRELLO_ENTITY } from "../../constants";
import { getLinkedCardsService } from "./getLinkedCardsService";
import type { CardType } from "../trello/types";

const deleteLinkedCardService = async (
  cardId: CardType["id"],
): Promise<void> => {
  const linkedCards = await getLinkedCardsService();
  const filteredCards = linkedCards.filter((cid) => cardId !== cid);

  localStorage.setItem(TRELLO_ENTITY, JSON.stringify(filteredCards));

  return Promise.resolve();
};

export { deleteLinkedCardService };
