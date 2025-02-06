import { PROXY_URL } from "../../constants";
import { baseRequest } from "../../utils";

const getTokenInProxyService = (state: string) => {
  return baseRequest<{ token: string }>({
    url: `${PROXY_URL}/auth/get-token`,
    queryParams: { state },
  });
};

export { getTokenInProxyService };
