import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { CardType, Comment } from "./types";

const createCardCommentService = (
  cardId: CardType["id"],
  comment: Comment["data"]["text"],
) => {
  return baseRequest<Comment>({
    url: `${BASE_URL}/cards/${cardId}/actions/comments`,
    method: "POST",
    data: {
      key: API_KEY,
      token: `${getTokenService()}`,
      text: comment,
    },
  });
};

export { createCardCommentService };
