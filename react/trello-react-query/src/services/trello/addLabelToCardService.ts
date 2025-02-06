import { BASE_URL, API_KEY } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import type { CardType, Label } from "./types";

const addLabelToCardService = (
  cardId: CardType["id"],
  labelId: Label["id"],
) => {
  return baseRequest<Array<Label["id"]>>({
    url: `${BASE_URL}/cards/${cardId}/idLabels`,
    method: "POST",
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
      value: labelId,
    },
  });
};

export { addLabelToCardService };
