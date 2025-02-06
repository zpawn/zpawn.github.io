import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import type { CardType, Label } from "./types";

const removeLabelFromCardService = (
  cardId: CardType["id"],
  labelId: Label["id"],
) => {
  return baseRequest<void>({
    url: `${BASE_URL}/cards/${cardId}/idLabels/${labelId}`,
    method: "DELETE",
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
    },
  });
};

export { removeLabelFromCardService };
