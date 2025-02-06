import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { Board, Labels } from "./types";

const getLabelsOnBoardService = (boardId: Board["id"]) => {
  return baseRequest<Labels>({
    url: `${BASE_URL}/boards/${boardId}/labels`,
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
    },
  });
};

export { getLabelsOnBoardService };
