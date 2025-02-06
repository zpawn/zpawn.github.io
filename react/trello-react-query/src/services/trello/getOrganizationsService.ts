import { API_KEY, BASE_URL } from "../../constants";
import { baseRequest } from "../../utils";
import { getTokenService } from "../local";
import { Organization } from "./types";

const getOrganizationsService = () => {
  return baseRequest<Organization[]>({
    url: `${BASE_URL}/members/me/organizations`,
    queryParams: {
      key: API_KEY,
      token: `${getTokenService()}`,
      fields: "id,name,displayName,url",
    },
  });
};

export { getOrganizationsService };
