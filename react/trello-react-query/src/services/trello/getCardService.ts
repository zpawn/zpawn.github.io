import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { CardType } from "./types";

const getCardService = (cardId: CardType["id"]) => {
  return baseRequest<CardType>({
    url: `${BASE_URL}/cards/${cardId}`,
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
      members: `${true}`,
      board: `${true}`,
      list: `${true}`,
      checklists: "all",
      fields: "all",
    },
  });
};

export { getCardService };
