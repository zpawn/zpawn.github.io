import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";

const revokeTokenService = () => {
  return baseRequest<Comment[]>({
    url: `${BASE_URL}/tokens/${getTokenService()}`,
    method: "DELETE",
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
    },
  });
};

export { revokeTokenService };
