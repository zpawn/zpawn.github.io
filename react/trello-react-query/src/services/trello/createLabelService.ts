import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import type { Label } from "./types";
import type { Dict } from "../../types";

const createLabelService = (label: Pick<Label, "name"|"color"|"idBoard">) => {
  return baseRequest<Label>({
    url: `${BASE_URL}/labels`,
    method: "POST",
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
    },
    data: label as Dict<string>,
  });
};

export { createLabelService };
