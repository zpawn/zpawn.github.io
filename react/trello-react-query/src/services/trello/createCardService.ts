import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { CardType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCardService = (data: any) => {
  return baseRequest<CardType>({
    url: `${BASE_URL}/cards`,
    method: "POST",
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
    },
    data,
  });
};

export { createCardService };
