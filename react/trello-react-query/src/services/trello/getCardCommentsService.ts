import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { CardType, Comment } from "./types";

const getCardCommentsService = (cardId: CardType["id"]) => {
  return baseRequest<Comment[]>({
    url: `${BASE_URL}/cards/${cardId}/actions`,
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
      filter: "commentCard",
    },
  });
};

export { getCardCommentsService };
