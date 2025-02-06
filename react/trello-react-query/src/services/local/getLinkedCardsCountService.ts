import { getLinkedCardsService } from "./getLinkedCardsService";

const getLinkedCardsCountService = async (): Promise<number> => {
  const linkedCards = await getLinkedCardsService();

  return linkedCards.length;
};

export { getLinkedCardsCountService };
