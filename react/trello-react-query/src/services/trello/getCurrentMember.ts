import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { Member } from "./types";
import { TrelloError } from "./TrelloError";

const getCurrentMemberService = () => {
  return baseRequest<Member & TrelloError>({
    url:  `${BASE_URL}/members/me`,
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
      boards: "all",
      board_lists: "all",
      organizations: "all",
    },
  });
};

export { getCurrentMemberService };
