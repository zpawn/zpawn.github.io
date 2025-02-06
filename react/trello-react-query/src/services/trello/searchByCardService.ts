import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { CardType } from "./types";

const searchByCardService = (query: string) => {
  return baseRequest<{ cards: CardType[] }>({
    url: `${BASE_URL}/search`,
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
      modelTypes: "cards",
      card_board: `${true}`,
      board_fields: "idOrganization,name,shortUrl,url",
      card_list: `${true}`,
      card_members: `${true}`,
      cards_limit: "1000",
      query,
    }
  });
};

export { searchByCardService };
