import { TRELLO_ENTITY } from "../../constants";

const getLinkedCardsService = (): Promise<string[]> => {
  let linkedCards: string[] = [];

  try {
    linkedCards = JSON.parse(localStorage.getItem(TRELLO_ENTITY) || "[]");
  } catch (e) {
    //..
  }

  return Promise.resolve(linkedCards);
};

export { getLinkedCardsService };
