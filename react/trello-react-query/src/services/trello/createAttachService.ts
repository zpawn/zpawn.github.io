import { BASE_URL, API_KEY } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { CardType } from "./types";

const createAttachService = async (
    cardId: CardType["id"],
    data: FormData,
) => {
  return baseRequest({
    url: `${BASE_URL}/cards/${cardId}/attachments`,
    method: "POST",
    data,
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
      setCover: `${false}`,
    }
  });
};

export { createAttachService };
